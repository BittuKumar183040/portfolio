// components/InteractiveImage.tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface InteractiveImageProps {
  src: string;
  className?: string;
  intensity?: number;
  damping?: number;
  introDuration?: number;
}

/* ---------- Ripple plane (steady state) ---------- */

const planeVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const planeFragment = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;      // real cursor, damped
  uniform vec2 uAmbient;    // idle sin/cos wander center
  uniform float uHover;     // 0 = idle, 1 = actively pointed at
  uniform float uTime;
  uniform float uIntensity;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // blend the ripple center between the idle wander and the real cursor
    vec2 center = mix(uAmbient, uMouse, uHover);

    float dist = distance(uv, center);
    float ripple = sin(dist * 40.0 - uTime * 4.0) * 0.5 + 0.5;
    float falloff = smoothstep(0.35, 0.0, dist);

    // idle motion is subtler than an active hover
    float activeStrength = mix(0.35, 1.0, uHover) * uIntensity;

    vec2 dir = normalize(uv - center + 0.0001);
    float strength = falloff * ripple * activeStrength;

    vec2 distortedUv = uv + dir * strength * 0.06;

    if (distortedUv.x < 0.0 || distortedUv.x > 1.0 || distortedUv.y < 0.0 || distortedUv.y > 1.0) {
      discard;
    }

    vec4 color = texture2D(uTexture, distortedUv);
    color.rgb += falloff * uHover * 0.15;
    color.a *= uOpacity;
    if (color.a < 0.01) discard;
    gl_FragColor = color;
  }
`;

/* ---------- Particle assembly (intro only) ---------- */

const pointsVertex = /* glsl */ `
  uniform float uProgress;
  uniform float uPointSize;
  attribute vec3 aStart;
  varying vec2 vUv;
  varying float vAlpha;

  void main() {
    vUv = uv;
    float t = 1.0 - pow(1.0 - uProgress, 3.0);
    vec3 pos = mix(aStart, position, t);
    vAlpha = 1.0 - smoothstep(0.85, 1.0, uProgress);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uPointSize;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const pointsFragment = /* glsl */ `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    if (length(c) > 0.5) discard;
    vec4 color = texture2D(uTexture, vUv);
    if (color.a < 0.1) discard;
    gl_FragColor = vec4(color.rgb, color.a * vAlpha);
  }
`;

export default function InteractiveImage({
  src,
  className,
  intensity = 1,
  damping = 0.08,
  introDuration = 1400,
}: InteractiveImageProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const pixelRatioCap = isMobile ? 1.5 : 2;
    const particleCols = isMobile ? 48 : 96;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
    mount.appendChild(renderer.domElement);
    // pointer events land on the canvas itself
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.style.pointerEvents = 'auto';

    const group = new THREE.Group();
    scene.add(group);

    const planeUniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uAmbient: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uOpacity: { value: prefersReducedMotion ? 1 : 0 },
    };

    const planeMaterial = new THREE.ShaderMaterial({
      vertexShader: planeVertex,
      fragmentShader: planeFragment,
      uniforms: planeUniforms,
      transparent: true,
    });

    const planeGeometry = new THREE.PlaneGeometry(2, 2);
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    group.add(planeMesh);

    const pointsUniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uProgress: { value: prefersReducedMotion ? 1 : 0 },
      uPointSize: { value: 4 },
    };

    const pointsMaterial = new THREE.ShaderMaterial({
      vertexShader: pointsVertex,
      fragmentShader: pointsFragment,
      uniforms: pointsUniforms,
      transparent: true,
      depthWrite: false,
    });

    let pointsMesh: THREE.Points | null = null;
    let imageAspect = 1;

    const fitToContainer = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;

      renderer.setSize(w, h);

      const containerAspect = w / h;
      if (containerAspect > imageAspect) {
        group.scale.set(imageAspect / containerAspect, 1, 1);
      } else {
        group.scale.set(1, containerAspect / imageAspect, 1);
      }

      const dpr = renderer.getPixelRatio();
      pointsUniforms.uPointSize.value = Math.max(
        2,
        ((w / particleCols) * dpr) / group.scale.x,
      );
    };

    const buildParticles = () => {
      const rows = Math.round(particleCols / imageAspect) || particleCols;
      const count = particleCols * rows;

      const positions = new Float32Array(count * 3);
      const starts = new Float32Array(count * 3);
      const uvs = new Float32Array(count * 2);

      let i = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < particleCols; x++) {
          const u = x / (particleCols - 1);
          const v = y / (rows - 1);

          const px = u * 2 - 1;
          const py = v * 2 - 1;

          positions[i * 3] = px;
          positions[i * 3 + 1] = py;
          positions[i * 3 + 2] = 0;

          const angle = Math.random() * Math.PI * 2;
          const radius = 2 + Math.random() * 3;
          starts[i * 3] = px + Math.cos(angle) * radius;
          starts[i * 3 + 1] = py + Math.sin(angle) * radius;
          starts[i * 3 + 2] = (Math.random() - 0.5) * 1.5;

          uvs[i * 2] = u;
          uvs[i * 2 + 1] = v;

          i++;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3),
      );
      geometry.setAttribute('aStart', new THREE.BufferAttribute(starts, 3));
      geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

      pointsMesh = new THREE.Points(geometry, pointsMaterial);
      group.add(pointsMesh);
    };

    const loader = new THREE.TextureLoader();
    let introStart = 0;
    let introPlaying = false;

    loader.load(src, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      const img = texture.image as HTMLImageElement;
      imageAspect = img.width / img.height;

      planeUniforms.uTexture.value = texture;
      pointsUniforms.uTexture.value = texture;

      fitToContainer();

      if (!prefersReducedMotion) {
        buildParticles();
        introStart = performance.now();
        introPlaying = true;
      }
    });

    // ---- pointer state ----
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    let isHovering = false;
    let targetHover = 0;
    let raf: number;
    const clock = new THREE.Clock();

    const getLocalPoint = (clientX: number, clientY: number) => {
      const rect = mount.getBoundingClientRect();
      return {
        x: (clientX - rect.left) / rect.width,
        y: 1 - (clientY - rect.top) / rect.height,
      };
    };

    const handlePointerEnter = (e: PointerEvent) => {
      isHovering = true;
      targetHover = 1;
      const p = getLocalPoint(e.clientX, e.clientY);
      targetMouse.set(p.x, p.y);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isHovering) {
        isHovering = true;
        targetHover = 1;
      }
      const p = getLocalPoint(e.clientX, e.clientY);
      targetMouse.set(p.x, p.y);
    };

    const handlePointerLeave = () => {
      isHovering = false;
      targetHover = 0;
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      // constant idle wander, always running regardless of hover state
      planeUniforms.uAmbient.value.set(
        0.5 + Math.sin(t * 0.35) * 0.28,
        0.5 + Math.cos(t * 0.27) * 0.22,
      );

      planeUniforms.uMouse.value.lerp(targetMouse, damping);
      planeUniforms.uHover.value +=
        (targetHover - planeUniforms.uHover.value) * damping;
      planeUniforms.uTime.value = t;

      if (introPlaying) {
        const elapsed = performance.now() - introStart;
        const progress = Math.min(elapsed / introDuration, 1);
        pointsUniforms.uProgress.value = progress;
        planeUniforms.uOpacity.value = THREE.MathUtils.smoothstep(
          progress,
          0.6,
          1,
        );

        if (progress >= 1) {
          introPlaying = false;
          if (pointsMesh) {
            group.remove(pointsMesh);
            pointsMesh.geometry.dispose();
            pointsMesh = null;
          }
        }
      }

      if (planeUniforms.uTexture.value) renderer.render(scene, camera);
    };
    animate();

    const el = renderer.domElement;
    el.addEventListener('pointerenter', handlePointerEnter);
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', handlePointerLeave);
    el.addEventListener('pointercancel', handlePointerLeave);

    const resizeObserver = new ResizeObserver(fitToContainer);
    resizeObserver.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', handlePointerEnter);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
      el.removeEventListener('pointercancel', handlePointerLeave);
      resizeObserver.disconnect();

      renderer.dispose();
      planeGeometry.dispose();
      planeMaterial.dispose();
      pointsMaterial.dispose();
      pointsMesh?.geometry.dispose();
      planeUniforms.uTexture.value?.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [src, intensity, damping, introDuration]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
