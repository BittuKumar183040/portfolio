import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';

export interface InteractiveImageProps {
  /** URL/import of the .svg file to render. */
  src: string;
  className?: string;
  /** Line color while the page is in light mode. */
  lightColor?: string;
  /** Line color while the page is in dark mode. */
  darkColor?: string;
  /** Stroke width in CSS pixels — constant regardless of zoom/DPR. */
  lineWidth?: number;
  /** Sampling density per sub-path before simplification. */
  precision?: number;
  /** How long each strand takes to fly into place, in seconds. */
  formDuration?: number;
  /** How long, in seconds, strand start times are staggered across. */
  staggerSpread?: number;
  /** World-space radius the cursor disturbs nearby lines within. */
  cursorRadius?: number;
  /** Strength of the cursor's push. Set to 0 to disable the effect entirely. */
  cursorStrength?: number;
  /** Soft glow that follows the cursor as a hover cue. */
  hoverGlow?: boolean;
  /** Caps devicePixelRatio for rendering — lower is faster on retina/4K. */
  maxPixelRatio?: number;
  /** Point-simplification tolerance as a fraction of the image's size.
   *  Higher = fewer points = faster, but coarser curves. */
  simplifyTolerance?: number;
  /** Fires once every strand has finished flying in. */
  onFormed?: () => void;
}

interface Box2D {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface Strand {
  line: Line2;
  material: LineMaterial;
  target: Float32Array;
  start: Float32Array;
  current: Float32Array;
  box: Box2D;
  delay: number;
  pointCount: number;
  /** Whether this strand currently needs per-point updates (forming, being
   *  pushed by the cursor, or settling back to rest). */
  active: boolean;
}

function easeOutExpo(x: number): number {
  return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function aabbCircleIntersects(
  box: Box2D,
  mx: number,
  my: number,
  r: number,
): boolean {
  const cx = Math.max(box.minX, Math.min(mx, box.maxX));
  const cy = Math.max(box.minY, Math.min(my, box.maxY));
  const dx = mx - cx;
  const dy = my - cy;
  return dx * dx + dy * dy <= r * r;
}

function writeStrandPositions(strand: Strand): void {
  const geometry = strand.line.geometry as LineGeometry;
  const attr = geometry.attributes
    .instanceStart as THREE.InterleavedBufferAttribute;
  const buffer = attr.data as THREE.InterleavedBuffer;
  const arr = buffer.array as Float32Array;
  const flat = strand.current;
  const segmentCount = strand.pointCount - 1;

  for (let i = 0; i < segmentCount; i++) {
    const srcA = i * 3;
    const srcB = srcA + 3;
    const dst = i * 6;
    arr[dst] = flat[srcA];
    arr[dst + 1] = flat[srcA + 1];
    arr[dst + 2] = flat[srcA + 2];
    arr[dst + 3] = flat[srcB];
    arr[dst + 4] = flat[srcB + 1];
    arr[dst + 5] = flat[srcB + 2];
  }
  buffer.needsUpdate = true;
}

/** Ramer–Douglas–Peucker simplification — thins out near-collinear runs of
 *  points so a smooth curve doesn't cost more per frame than it needs to. */
function simplifyPoints(
  points: THREE.Vector2[],
  tolerance: number,
): THREE.Vector2[] {
  if (points.length < 3 || tolerance <= 0) return points;
  const sqTol = tolerance * tolerance;

  function sqSegDist(
    p: THREE.Vector2,
    a: THREE.Vector2,
    b: THREE.Vector2,
  ): number {
    let x = a.x;
    let y = a.y;
    let dx = b.x - x;
    let dy = b.y - y;
    if (dx !== 0 || dy !== 0) {
      const t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        x = b.x;
        y = b.y;
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }
    dx = p.x - x;
    dy = p.y - y;
    return dx * dx + dy * dy;
  }

  function simplifyRec(pts: THREE.Vector2[]): THREE.Vector2[] {
    let maxDist = 0;
    let index = 0;
    for (let i = 1; i < pts.length - 1; i++) {
      const d = sqSegDist(pts[i], pts[0], pts[pts.length - 1]);
      if (d > maxDist) {
        maxDist = d;
        index = i;
      }
    }
    if (maxDist > sqTol) {
      const left = simplifyRec(pts.slice(0, index + 1));
      const right = simplifyRec(pts.slice(index));
      return left.slice(0, -1).concat(right);
    }
    return [pts[0], pts[pts.length - 1]];
  }

  return simplifyRec(points);
}

function createGlowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.3)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** Tracks whether the page is currently in dark mode — supports both a
 *  `dark` class on <html> (Tailwind's class strategy) and, absent that,
 *  the OS-level prefers-color-scheme. */
function useIsDarkMode(): boolean {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    const root = document.documentElement;
    if (root.classList.contains('dark')) return true;
    if (root.classList.contains('light')) return false;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      if (root.classList.contains('dark')) return setIsDark(true);
      if (root.classList.contains('light')) return setIsDark(false);
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    };

    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', update);

    return () => {
      observer.disconnect();
      mq.removeEventListener('change', update);
    };
  }, []);

  return isDark;
}

export default function InteractiveImage({
  src,
  className,
  lightColor = '#dc2626',
  darkColor = '#000000',
  lineWidth = 1.4,
  precision = 6,
  formDuration = 1.6,
  staggerSpread = 0.6,
  cursorRadius = 0.2,
  cursorStrength = 0.05,
  hoverGlow = true,
  maxPixelRatio = 1.5,
  simplifyTolerance = 0.0015,
  onFormed,
}: InteractiveImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const strandsRef = useRef<Strand[]>([]);
  const isDark = useIsDarkMode();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let raf = 0;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const cursorOn = cursorStrength > 0 && !prefersReducedMotion;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, maxPixelRatio),
    );
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);
    camera.position.z = 5;

    let contentHalfWidth = 1;
    let contentHalfHeight = 1;
    const FIT_PADDING = 1.15;

    function fitCamera() {
      const rect = container!.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      renderer.setSize(w, h, false);

      const containerAspect = w / h;
      const contentAspect = contentHalfWidth / contentHalfHeight;

      let viewHalfW: number;
      let viewHalfH: number;
      if (containerAspect > contentAspect) {
        viewHalfH = contentHalfHeight * FIT_PADDING;
        viewHalfW = viewHalfH * containerAspect;
      } else {
        viewHalfW = contentHalfWidth * FIT_PADDING;
        viewHalfH = viewHalfW / containerAspect;
      }

      camera.left = -viewHalfW;
      camera.right = viewHalfW;
      camera.top = viewHalfH;
      camera.bottom = -viewHalfH;
      camera.updateProjectionMatrix();

      strandsRef.current.forEach((s) => s.material.resolution.set(w, h));
    }

    // --- Cursor tracking (world-space, on the z=0 plane) ----------------
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouse = new THREE.Vector2(0, 100);
    const mouseTarget = new THREE.Vector2(0, 100);
    const hitPoint = new THREE.Vector3();
    let hovering = false;

    function updateMouseFromEvent(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(plane, hitPoint)) {
        mouseTarget.set(hitPoint.x, hitPoint.y);
      }
    }
    function handlePointerEnter() {
      hovering = true;
    }
    function handlePointerLeave() {
      hovering = false;
      mouseTarget.set(0, 100);
    }

    if (cursorOn) {
      container.addEventListener('pointermove', updateMouseFromEvent);
      container.addEventListener('pointerenter', handlePointerEnter);
      container.addEventListener('pointerleave', handlePointerLeave);
      container.style.cursor = 'pointer';
    }

    // --- Hover glow sprite (the "cursor pointer" affordance) ------------
    let glowSprite: THREE.Sprite | null = null;
    let glowTexture: THREE.CanvasTexture | null = null;
    if (cursorOn && hoverGlow) {
      glowTexture = createGlowTexture();
      const glowMaterial = new THREE.SpriteMaterial({
        map: glowTexture,
        color: new THREE.Color(isDark ? darkColor : lightColor),
        transparent: true,
        opacity: 0,
        depthTest: false,
        blending: THREE.AdditiveBlending,
      });
      glowSprite = new THREE.Sprite(glowMaterial);
      glowSprite.renderOrder = 10;
      scene.add(glowSprite);
    }

    // --- Load the SVG, build one Line2 strand per sub-path --------------
    let formStartTime: number | null = null;
    let formed = false;
    const clock = new THREE.Clock();

    async function build() {
      const res = await fetch(src);
      const text = await res.text();
      if (disposed) return;

      const loader = new SVGLoader();
      const svgData = loader.parse(text);

      const divisions = Math.max(8, precision * 8);
      const rawStrands: THREE.Vector2[][] = [];

      // First pass: sample + simplify each sub-path independently so the
      // RDP tolerance can be scaled relative to the SVG's own size.
      let rawMinX = Infinity;
      let rawMaxX = -Infinity;
      let rawMinY = Infinity;
      let rawMaxY = -Infinity;
      const sampled: THREE.Vector2[][] = [];
      svgData.paths.forEach((path) => {
        path.subPaths.forEach((subPath) => {
          const pts = subPath.getPoints(divisions);
          if (pts.length < 2) return;
          sampled.push(pts);
          pts.forEach((p) => {
            rawMinX = Math.min(rawMinX, p.x);
            rawMaxX = Math.max(rawMaxX, p.x);
            rawMinY = Math.min(rawMinY, p.y);
            rawMaxY = Math.max(rawMaxY, p.y);
          });
        });
      });
      if (sampled.length === 0) return;

      const rawSpan = Math.max(rawMaxX - rawMinX, rawMaxY - rawMinY, 1e-3);
      const tolerance = simplifyTolerance * rawSpan;
      sampled.forEach((pts) => {
        const simplified = tolerance > 0 ? simplifyPoints(pts, tolerance) : pts;
        if (simplified.length >= 2) rawStrands.push(simplified);
      });

      // Bounding box across the (possibly simplified) points, svg space (y-down).
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      rawStrands.forEach((pts) =>
        pts.forEach((p) => {
          minX = Math.min(minX, p.x);
          maxX = Math.max(maxX, p.x);
          minY = Math.min(minY, p.y);
          maxY = Math.max(maxY, p.y);
        }),
      );

      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const spanX = Math.max(maxX - minX, 1e-3);
      const spanY = Math.max(maxY - minY, 1e-3);
      // Normalize the longest side to 2 world units so the geometry stays
      // pixel-precise and proportional regardless of the source SVG's units.
      const scale = 2 / Math.max(spanX, spanY);

      contentHalfWidth = (spanX * scale) / 2;
      contentHalfHeight = (spanY * scale) / 2;

      const color = new THREE.Color(isDark ? darkColor : lightColor);

      const strands: Strand[] = rawStrands.map((pts) => {
        const target = new Float32Array(pts.length * 3);
        let bMinX = Infinity;
        let bMaxX = -Infinity;
        let bMinY = Infinity;
        let bMaxY = -Infinity;
        pts.forEach((p, j) => {
          const x = (p.x - cx) * scale;
          const y = -(p.y - cy) * scale; // svg y-down -> three y-up
          target[j * 3] = x;
          target[j * 3 + 1] = y;
          target[j * 3 + 2] = 0;
          bMinX = Math.min(bMinX, x);
          bMaxX = Math.max(bMaxX, x);
          bMinY = Math.min(bMinY, y);
          bMaxY = Math.max(bMaxY, y);
        });

        const start = new Float32Array(target.length);
        if (prefersReducedMotion) {
          start.set(target);
        } else {
          // Each strand flies in from its own random direction/distance.
          const angle = Math.random() * Math.PI * 2;
          const dist = 3 + Math.random() * 3;
          const dx = Math.cos(angle) * dist;
          const dy = Math.sin(angle) * dist;
          for (let j = 0; j < pts.length; j++) {
            start[j * 3] = target[j * 3] + dx;
            start[j * 3 + 1] = target[j * 3 + 1] + dy;
            start[j * 3 + 2] = (Math.random() - 0.5) * 0.6;
          }
        }

        const geometry = new LineGeometry();
        geometry.setPositions(start); // one-time cost — fine at build time

        const material = new LineMaterial({
          color: color.getHex(),
          linewidth: lineWidth,
          transparent: true,
          opacity: prefersReducedMotion ? 1 : 0,
          depthTest: false,
          worldUnits: false,
        });

        const line = new Line2(geometry, material);
        line.frustumCulled = false;
        scene.add(line);

        return {
          line,
          material,
          target,
          start,
          current: start.slice(),
          box: { minX: bMinX, maxX: bMaxX, minY: bMinY, maxY: bMaxY },
          delay: prefersReducedMotion ? 0 : Math.random() * staggerSpread,
          pointCount: pts.length,
          active: true,
        };
      });

      strandsRef.current = strands;
      fitCamera();
      raf = requestAnimationFrame(animate);
    }

    function animate() {
      if (disposed) return;
      const elapsed = clock.getElapsedTime();
      if (formStartTime === null) formStartTime = elapsed;
      const t = elapsed - formStartTime;

      mouse.lerp(mouseTarget, 0.15);

      let allFormed = true;
      const strands = strandsRef.current;

      for (const s of strands) {
        const localT = prefersReducedMotion
          ? 1
          : Math.min(1, Math.max(0, (t - s.delay) / formDuration));
        const stillForming = localT < 1;
        if (stillForming) allFormed = false;

        if (stillForming) {
          const eased = easeOutExpo(localT);
          for (let j = 0; j < s.pointCount; j++) {
            const ix = j * 3;
            const iy = ix + 1;
            const iz = ix + 2;
            s.current[ix] = THREE.MathUtils.lerp(
              s.start[ix],
              s.target[ix],
              eased,
            );
            s.current[iy] = THREE.MathUtils.lerp(
              s.start[iy],
              s.target[iy],
              eased,
            );
            s.current[iz] = THREE.MathUtils.lerp(
              s.start[iz],
              s.target[iz],
              eased,
            );
          }
          s.material.opacity = eased;
          s.active = true;
          writeStrandPositions(s);
          continue;
        }

        s.material.opacity = 1;

        const nearCursor =
          cursorOn &&
          aabbCircleIntersects(s.box, mouse.x, mouse.y, cursorRadius);

        if (nearCursor) {
          for (let j = 0; j < s.pointCount; j++) {
            const ix = j * 3;
            const iy = ix + 1;
            const iz = ix + 2;
            const tx = s.target[ix];
            const ty = s.target[iy];
            const dx = tx - mouse.x;
            const dy = ty - mouse.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < cursorRadius) {
              const falloff = 1 - d / cursorRadius;
              const push = falloff * falloff * cursorStrength;
              const nx = d > 1e-4 ? dx / d : 0;
              const ny = d > 1e-4 ? dy / d : 0;
              s.current[ix] = tx + nx * push;
              s.current[iy] = ty + ny * push;
            } else {
              s.current[ix] = tx;
              s.current[iy] = ty;
            }
            s.current[iz] = s.target[iz];
          }
          s.active = true;
          writeStrandPositions(s);
        } else if (s.active) {
          // Ease back to rest over a few frames, then go fully idle.
          let maxDiff = 0;
          for (let j = 0; j < s.pointCount; j++) {
            const ix = j * 3;
            const iy = ix + 1;
            s.current[ix] += (s.target[ix] - s.current[ix]) * 0.2;
            s.current[iy] += (s.target[iy] - s.current[iy]) * 0.2;
            maxDiff = Math.max(
              maxDiff,
              Math.abs(s.target[ix] - s.current[ix]),
              Math.abs(s.target[iy] - s.current[iy]),
            );
          }
          if (maxDiff < 0.001) {
            s.current.set(s.target);
            s.active = false;
          }
          writeStrandPositions(s);
        }
        // else: already at rest and far from the cursor — nothing to do.
      }

      if (glowSprite && glowTexture) {
        const targetOpacity = hovering ? 0.01 : 0;
        glowSprite.material.opacity +=
          (targetOpacity - glowSprite.material.opacity) * 0.012;
        glowSprite.position.set(mouse.x, mouse.y, 0.001);
        const pulse = 1 + Math.sin(elapsed * 0.4) * 0.006;
        const baseScale = cursorRadius * 0.04 * pulse;
        glowSprite.scale.set(baseScale, baseScale, 1);
      }

      if (allFormed && !formed) {
        formed = true;
        onFormed?.();
      }

      renderer.render(scene, camera);

      // While the cursor effect is enabled we keep the loop alive so a
      // newly-hovering pointer is picked up; per-strand work above is
      // already gated to near-zero cost when nothing is happening.
      if (!allFormed || cursorOn) {
        raf = requestAnimationFrame(animate);
      } else {
        raf = 0;
      }
    }

    build();

    const resizeObserver = new ResizeObserver(() => {
      fitCamera();
      if (formed && !cursorOn) renderer.render(scene, camera);
    });
    resizeObserver.observe(container);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', updateMouseFromEvent);
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointerleave', handlePointerLeave);

      strandsRef.current.forEach((s) => {
        scene.remove(s.line);
        s.line.geometry.dispose();
        s.material.dispose();
      });
      strandsRef.current = [];

      if (glowSprite) {
        scene.remove(glowSprite);
        glowSprite.material.dispose();
      }
      glowTexture?.dispose();

      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    src,
    lineWidth,
    precision,
    formDuration,
    staggerSpread,
    cursorRadius,
    cursorStrength,
    hoverGlow,
    maxPixelRatio,
    simplifyTolerance,
  ]);

  // --- Recolor in place on theme change, without replaying the animation --
  useEffect(() => {
    const color = new THREE.Color(isDark ? darkColor : lightColor);
    strandsRef.current.forEach((s) => s.material.color.set(color));
  }, [isDark, lightColor, darkColor]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
      aria-hidden="true"
    />
  );
}
