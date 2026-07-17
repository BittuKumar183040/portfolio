import React, { useEffect, useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

interface ProjectProps {
  id: string;
  title: string;
  shortDesc: string;
  imageSource?: any;
  gitLink?: string;
  previewLink?: string;
}

const ProjectCard: React.FC<ProjectProps> = ({
  id,
  title,
  shortDesc,
  imageSource,
  gitLink,
  previewLink,
}) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const images: string[] = Array.isArray(imageSource) ? imageSource : [imageSource];
  const hasMultipleImages = images.length > 1;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/project/${id}`);
  };
  const handleLinkClick = (e: React.MouseEvent<SVGElement>, link: string) => {
    e.stopPropagation();
    window.open(link, '_blank');
  };

  const startCycling = () => {
    setIsHovering(true);
    if (!hasMultipleImages) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 1200);
  };

  const stopCycling = () => {
    setIsHovering(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setActiveIndex(0);
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const cardVariants = {
    rest: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      y: -6,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
  };

  const titleVariants = {
    hover: {
      x: 2,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  };

  const iconContainerVariants = {
    rest: { opacity: 0, y: 6 },
    hover: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const iconVariants = {
    rest: { opacity: 0, y: 6 },
    hover: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      initial="rest"
      whileHover="hover"
      onHoverStart={startCycling}
      onHoverEnd={stopCycling}
      onClick={handleClick}
      className="group relative w-52 cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 md:w-80"
    >
      <div className="relative h-40 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={activeIndex}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full scale-105 object-cover object-top pointer-events-none select-none"
            src={images[activeIndex]}
            alt=""
            loading="lazy"
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-black/30" />

        {hasMultipleImages && (
          <div className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex && isHovering
                    ? 'w-4 bg-white'
                    : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="w-full p-4 dark:text-white md:p-5">
        <motion.h2
          variants={titleVariants}
          className="mb-0 inline-block text-center text-sm font-bold text-gray-900 dark:text-white md:mb-2 md:text-left md:text-md"
        >
          {title}
        </motion.h2>

        <div className="hidden h-20 overflow-clip text-justify text-sm text-gray-600 dark:text-gray-300 md:block">
          {shortDesc}
        </div>

        <motion.div
          variants={iconContainerVariants}
          className="mt-4 flex flex-1 items-end justify-end gap-5"
        >
          {gitLink && (
            <motion.div
              variants={iconVariants}
              className="tooltip tooltip-top"
              data-tip="Github"
            >
              <FaGithub
                className="cursor-pointer text-gray-700 transition-colors duration-200 hover:text-primary dark:text-gray-300"
                onClick={(e) => handleLinkClick(e, gitLink)}
                size={22}
              />
            </motion.div>
          )}
          {previewLink && (
            <motion.div
              variants={iconVariants}
              className="tooltip tooltip-left"
              data-tip="Project Preview"
            >
              <FaRegEye
                className="cursor-pointer text-gray-700 transition-colors duration-200 hover:text-primary dark:text-gray-300"
                onClick={(e) => handleLinkClick(e, previewLink)}
                size={22}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;