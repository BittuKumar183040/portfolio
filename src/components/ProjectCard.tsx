import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

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
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/project/${id}`);
  };
  const handleLinkClick = (e: React.MouseEvent<SVGElement>, link: string) => {
    e.stopPropagation();
    window.open(link, '_blank');
  };

  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  const titleVariants = {
    hover: {
      scale: 1.1,
      transition: { type: 'spring', stiffness: 300 },
    },
  };
  const imageVariants = {
    hover: {
      borderRadius: '10px',
      scale: 1.05,
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
    },
  };
  const descVariants = {
    hover: {
      scale: 1.05,
      transition: { type: 'spring', stiffness: 1000 },
    },
  };
  const logoVarients = {
    hover: {
      scale: 1.1,
      transition: { type: 'spring', stiffness: 1000 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      onClick={handleClick}
      className="bg-gray-100 dark:bg-gray-900 group cursor-pointer light:glass justify-around rounded-2xl border-2 border-gray-200 dark:border-gray-800 shadow-inner w-52 md:w-80"
    >
      <div className="select-none h-40 dark:opacity-80 group-hover:opacity-100 transition-opacity">
        <motion.img
          variants={imageVariants}
          className="h-full w-full rounded-2xl object-cover object-top pointer-events-none shadow-inner transition-all"
          src={imageSource[0]}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="dark:text-white p-4 md:p-5 w-full">
        <motion.h2
          variants={titleVariants}
          className="md:text-md md:text-left text-center font-bold text-sm md:mb-2 mb-0 inline-block"
        >
          {title}
        </motion.h2>
        <motion.div
          variants={descVariants}
          className="dark:text-gray-300 h-20 text-sm overflow-clip hidden text-justify md:block "
        >
          {shortDesc}
        </motion.div>
        <motion.div
          variants={logoVarients}
          className="flex-1 justify-end items-end mt-4 flex gap-5 "
        >
          {gitLink && (
            <div className=" tooltip tooltip-top" data-tip="Github">
              <FaGithub
                className=" cursor-pointer"
                onClick={(e) => handleLinkClick(e, gitLink)}
                size={25}
              />
            </div>
          )}
          {previewLink && (
            <div className=" tooltip tooltip-left" data-tip="Project Preview">
              <FaRegEye
                className=" cursor-pointer"
                onClick={(e) => handleLinkClick(e, previewLink)}
                size={25}
              />
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
