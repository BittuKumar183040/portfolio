import { CgScrollV } from 'react-icons/cg';
import ConnectBtn from '../../../components/ConnectBtn';
import me from '../../../assets/me.svg';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import InteractiveImage from '../../../components/creative/InteractiveImage';
import HeroBackground from '../../../components/creative/HeroBackground';
import TextResolver from '../../../components/creative/TextResolverAnimation';

const Herosection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // tracks scroll progress across the hero section itself,
  // from the moment it enters until it's fully scrolled past
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // text drifts up slightly slower than the scroll and fades out early
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // scroll indicator fades out fast, no reason to see it once you've started scrolling
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden min-h-dvh bg-white dark:bg-gray-950"
    >
      {/* ambient field sits behind everything, adapts automatically to light/dark */}
      <HeroBackground className="-z-10" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 container mx-auto flex min-h-dvh flex-col px-4 sm:px-6 lg:px-8"
      >
        <div className="grid flex-1 grid-cols-1 items-center gap-10 py-20 sm:gap-12 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:py-16">
          {/* Image — leads on mobile for immediate visual impact, sits right on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <div className="aspect-square w-56 sm:w-72 md:w-80 lg:w-full lg:max-w-md">
              <InteractiveImage src={me} className="h-full w-full" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            style={{ y: textY, opacity: textOpacity }}
            className="order-2 flex flex-col items-center gap-6 text-center lg:order-1 lg:items-start lg:text-left"
          >
            <h1 className="flex flex-col items-center gap-1 lg:items-start">
              <motion.span
                variants={itemVariants}
                className="text-lg font-light text-gray-700 dark:text-gray-300 sm:text-xl md:text-2xl"
              >
                Hi, I'm a
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="block min-h-[1.2em] text-3xl font-bold text-red-600 text-shadow-md dark:text-red-400 sm:text-4xl md:text-5xl lg:text-6xl"
              >
                <TextResolver
                  strings={['Full Stack Developer']}
                  interval={4000}
                  iterations={2}
                />
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="text-xl font-medium text-gray-700 text-shadow-sm opacity-90 dark:text-gray-200 sm:text-2xl md:text-3xl lg:text-4xl"
              >
                &amp; 3D Modelling Artist
              </motion.span>
            </h1>

            <motion.p
              variants={itemVariants}
              className="max-w-md text-base text-gray-600 dark:text-gray-300 sm:text-lg lg:max-w-lg"
            >
              I'm{' '}
              <span className="font-semibold text-red-600 dark:text-red-400">
                Bittu Kumar
              </span>
              , a passionate{' '}
              <span className="text-red-600 dark:text-red-400">
                full stack developer
              </span>{' '}
              with over{' '}
              <span className="font-semibold text-red-600 dark:text-red-400">
                2 years of experience
              </span>{' '}
              in the development field. I specialize in building{' '}
              <span className="font-semibold text-red-600 dark:text-red-400">
                clean, functional websites
              </span>{' '}
              and am always eager to explore new technologies.
            </motion.p>

            <motion.div variants={itemVariants}>
              <ConnectBtn />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="hidden justify-center pb-6 text-gray-700 dark:text-gray-300 sm:flex"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
            aria-hidden="true"
          >
            <CgScrollV className="absolute text-2xl opacity-40" />
            <CgScrollV className="text-2xl animate-ping" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Herosection;
