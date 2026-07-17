import { CgScrollV } from 'react-icons/cg';
import ConnectBtn from '../../../components/ConnectBtn';
import me from '../../../assets/me.svg';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import InteractiveImage from '../../../components/creative/InteractiveImage';
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

  // image drifts at a different rate + slight scale-down, for parallax depth
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // scroll indicator fades out fast, no reason to see it once you've started scrolling
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto"
    >
      <div className="flex justify-between items-center gap-10 flex-wrap h-dvh overflow-hidden pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          style={{ y: textY, opacity: textOpacity }}
          className="flex flex-col gap-6 transform -translate-y text-left px-4"
        >
          <div className="text-gray-900 flex flex-col items-center md:items-start mt-96 md:mt-0 py-4 text-center ">
            <motion.p
              variants={itemVariants}
              className="text-xl mb-3 md:text-2xl lg:text-3xl font-light dark:text-white"
            >
              Hi, I'm a
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-3xl md:text-5xl lg:text-6xl h-16 font-bold text-red-600 text-shadow-md"
            >
              <TextResolver
                strings={['Full Stack Developer']}
                interval={4000}
                iterations={2}
              />
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-2xl opacity-85 md:text-4xl lg:text-5xl font-medium text-gray-700 text-shadow-sm dark:text-white"
            >
              & 3D Modelling Artist
            </motion.p>
          </div>
          <div className="text-lg md:text-xl lg:w-1/2 text-gray-700 opacity-70 text-center md:text-left dark:text-white">
            <motion.p variants={itemVariants}>
              I'm <span className="font-bold text-red-600">Bittu Kumar</span>, a
              passionate{' '}
              <span className="text-red-600">full stack developer</span> with
              over{' '}
              <span className="font-semibold text-red-600">
                2 years of experience
              </span>{' '}
              in the development field. I specialize in building{' '}
              <span className="font-semibold text-red-600">
                clean, functional websites
              </span>{' '}
              and am always eager to explore new technologies.
            </motion.p>
          </div>
          <ConnectBtn />
        </motion.div>

        <motion.div
          id="svg-container"
          style={{ y: imageY, opacity: imageOpacity, scale: imageScale }}
          className="absolute md:right-0 mt-24 md:w-1/2 h-dvh pointer-events-none"
        >
          <InteractiveImage src={me} />
        </motion.div>

        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="relative w-full flex dark:text-white justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <CgScrollV className="absolute text-2xl" />
            <CgScrollV className="text-2xl animate-ping" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Herosection;
