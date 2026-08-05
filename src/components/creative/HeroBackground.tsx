// components/creative/HeroBackground.tsx
import { useEffect, useRef } from 'react';

type Triple = [string, string, string];

interface HeroBackgroundProps {
  className?: string;
  /** Blob colors used in light mode — kept softer so they read on a bright page. */
  lightColors?: Triple;
  /** Blob colors used in dark mode — a touch more saturated so they still glow on near-black. */
  darkColors?: Triple;
  /** 0–1, how much the field nudges toward the pointer. Keep this small — it's ambience, not a cursor effect. */
  parallaxStrength?: number;
}

interface Blob {
  baseX: number;
  baseY: number;
  radius: number;
  colorIndex: number;
  speed: number;
  phase: number;
  driftX: number;
  driftY: number;
}

interface ThemeConfig {
  colors: Triple;
  coreAlpha: number;
  haloAlpha: number;
}

const DEFAULT_LIGHT: Triple = ['#a5b4fc', '#c4b5fd', '#fbcfe8'];
const DEFAULT_DARK: Triple = ['#818cf8', '#c084fc', '#f472b6'];

/**
 * Soft, slow-moving light field for a hero section. Canvas 2D rather than
 * WebGL on purpose — it sits behind the main visual and should cost almost
 * nothing. Interaction is deliberately minimal: the whole field leans a few
 * pixels toward the pointer, heavily damped, so it reads as alive without
 * competing with the foreground content.
 *
 * Dark mode: it watches the `dark` class on <html> (the standard Tailwind
 * class-strategy toggle) and falls back to prefers-color-scheme if that
 * class isn't present, so it adapts whether the app uses a manual toggle,
 * next-themes, or the OS setting — no restart of the animation, just a
 * palette swap read each frame.
 */
export default function HeroBackground({
  className,
  lightColors = DEFAULT_LIGHT,
  darkColors = DEFAULT_DARK,
  parallaxStrength = 0.02,
}: HeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function buildTheme(isDark: boolean): ThemeConfig {
      return isDark
        ? { colors: darkColors, coreAlpha: 0.42, haloAlpha: 0.16 }
        : { colors: lightColors, coreAlpha: 0.22, haloAlpha: 0.08 };
    }

    function detectIsDark(): boolean {
      const root = document.documentElement;
      if (root.classList.contains('dark')) return true;
      if (root.classList.contains('light')) return false;
      return darkMediaQuery.matches;
    }

    // theme state lives in a plain object (not React state) so the running
    // draw loop can pick up changes instantly without tearing the canvas down
    const theme = { current: buildTheme(detectIsDark()) };

    const classObserver = new MutationObserver(() => {
      theme.current = buildTheme(detectIsDark());
    });
    classObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const handleSchemeChange = () => {
      theme.current = buildTheme(detectIsDark());
    };
    darkMediaQuery.addEventListener('change', handleSchemeChange);

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
    };
    resize();

    const blobCount = 3;
    const blobs: Blob[] = Array.from({ length: blobCount }, (_, i) => ({
      baseX:
        0.2 + (i / (blobCount - 1 || 1)) * 0.6 + (Math.random() - 0.5) * 0.15,
      baseY: 0.3 + Math.random() * 0.4,
      radius: 0.32 + Math.random() * 0.14,
      colorIndex: i,
      speed: 0.05 + Math.random() * 0.04,
      phase: Math.random() * Math.PI * 2,
      driftX: 0.06 + Math.random() * 0.05,
      driftY: 0.05 + Math.random() * 0.04,
    }));

    // pointer influence — small, heavily damped, purely ambient
    const targetOffset = { x: 0, y: 0 };
    const offset = { x: 0, y: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetOffset.x = nx * parallaxStrength;
      targetOffset.y = ny * parallaxStrength;
    };
    const handlePointerLeave = () => {
      targetOffset.x = 0;
      targetOffset.y = 0;
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    let raf: number;
    const start = performance.now();

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const t = prefersReducedMotion ? 0 : (now - start) / 1000;

      // very slow, very damped follow — never snaps
      offset.x += (targetOffset.x - offset.x) * 0.03;
      offset.y += (targetOffset.y - offset.y) * 0.03;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = 'lighter';

      const { colors, coreAlpha, haloAlpha } = theme.current;

      for (const b of blobs) {
        const x =
          (b.baseX + Math.sin(t * b.speed + b.phase) * b.driftX + offset.x) *
          width;
        const y =
          (b.baseY +
            Math.cos(t * b.speed * 0.8 + b.phase) * b.driftY +
            offset.y) *
          height;
        const r = b.radius * Math.max(width, height);
        const color = colors[b.colorIndex % colors.length];

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, hexToRgba(color, coreAlpha));
        gradient.addColorStop(0.6, hexToRgba(color, haloAlpha));
        gradient.addColorStop(1, hexToRgba(color, 0));

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };
    raf = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      resizeObserver.disconnect();
      classObserver.disconnect();
      darkMediaQuery.removeEventListener('change', handleSchemeChange);
    };
  }, [lightColors, darkColors, parallaxStrength]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const bigint = parseInt(
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean,
    16,
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
