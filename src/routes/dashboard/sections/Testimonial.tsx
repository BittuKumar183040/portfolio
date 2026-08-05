// components/creative/Testimonial.tsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  testimonials as defaultTestimonials,
  type Testimonial,
} from '../../../assets/data/testimonials';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

interface TestimonialsProps {
  items?: Testimonial[];
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}

export default function Testimonials({
  items = defaultTestimonials,
  autoplay = true,
  autoplayInterval = 5000,
  className,
}: TestimonialsProps) {
  const count = items.length;

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const designationRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const activeIndexRef = useRef(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const layoutImages = (idx: number, immediate = false) => {
    const container = imageContainerRef.current;
    if (!container || count === 0) return;

    const tweenFn = immediate ? gsap.set : gsap.to;

    items.forEach((_, index) => {
      const img = imageRefs.current[index];
      if (!img) return;

      const offset = (index - idx + count) % count;
      const zIndex = count - offset;
      const scale = offset === 0 ? 1 : 0.85;

      let x: string;
      let rotateY: number;
      if (offset === 0) {
        x = '0%';
        rotateY = 0;
      } else if (offset === 1) {
        x = '20%';
        rotateY = -15;
      } else {
        x = '-20%';
        rotateY = 15;
      }

      tweenFn(img, {
        zIndex,
        scale,
        x,
        rotateY,
        duration: immediate ? 0 : 0.8,
        ease: 'power3.out',
      });
    });
  };

  const goTo = (direction: number) => {
    if (count === 0) return;
    const newIndex = (activeIndexRef.current + direction + count) % count;
    activeIndexRef.current = newIndex;
    layoutImages(newIndex);

    gsap.to([nameRef.current, designationRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setDisplayIndex(newIndex),
    });
    gsap.to(quoteRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
    });
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const handlePrev = () => {
    stopAutoplay();
    goTo(-1);
  };
  const handleNext = () => {
    stopAutoplay();
    goTo(1);
  };
  useEffect(() => {
    layoutImages(activeIndexRef.current, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  // reflow the stack's positions on resize without touching the text
  useEffect(() => {
    const handleResize = () => layoutImages(activeIndexRef.current, true);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useLayoutEffect(() => {
    gsap.fromTo(
      [nameRef.current, designationRef.current],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
    );
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
    );

    const words = quoteRef.current?.querySelectorAll('.word');
    if (words && words.length) {
      gsap.from(words, {
        opacity: 0,
        y: 10,
        stagger: 0.02,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  }, [displayIndex]);

  useEffect(() => {
    if (!autoplay || count <= 1) return;
    autoplayRef.current = setInterval(() => goTo(1), autoplayInterval);
    return () => stopAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, autoplayInterval, count]);

  if (count === 0) return null;

  const current = items[displayIndex];

  return (
    <section
      className={`mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8 ${className ?? ''}`}
    >
        <div className="flex flex-col justify-between">
          <div>
            <h3
              ref={nameRef}
              className="mb-1 text-2xl font-bold dark:text-gray-900 text-white"
            >
              {current.name}
            </h3>
            <p
              ref={designationRef}
              className="mb-8 text-sm dark:text-gray-500 text-gray-400"
            >
              {current.designation}
            </p>
            <p
              ref={quoteRef}
              className="text-lg leading-relaxed dark:text-gray-600 text-gray-300"
            >
              {current.quote.split(' ').map((word, i) => (
                <span key={i} className="word inline-block">
                  {word}&nbsp;
                </span>
              ))}
            </p>
          </div>

          <div className="flex justify-end gap-8 pt-28 md:pt-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 hover:bg-sky-500 bg-white text-gray-900 dark:hover:bg-sky-400"
            >
              <BiLeftArrow />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 hover:bg-sky-500 bg-white text-gray-900 dark:hover:bg-sky-400"
            >
              <BiRightArrow />
            </button>
          </div>
        </div>
    </section>
  );
}
