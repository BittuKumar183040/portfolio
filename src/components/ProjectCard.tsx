import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated, easings } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

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

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  const [hoverStyle, api] = useSpring(() => ({
    scale: 1,
    config: { duration: 100 },
  }));

  const projectCardStyle = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    config: {
      duration: 1000,
      easing: easings.easeOutQuad,
    },
  });

  return (
    <animated.div
      ref={ref}
      onMouseEnter={() => api.start({ scale: 1.05 })}
      onMouseLeave={() => api.start({ scale: 1 })}
      style={{ ...projectCardStyle, ...hoverStyle }}
      onClick={handleClick}
      className="bg-gray-100 dark:bg-gray-900 group
        cursor-pointer light:glass justify-around rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 shadow-inner 
        w-52 md:w-80 
        "
    >
      <div className="select-none h-40 dark:opacity-80 group-hover:opacity-100 transition-opacity overflow-hidden">
        <img
          className=" h-full w-full object-cover object-top pointer-events-none shadow-inner transition-all "
          src={imageSource[0]}
          alt={''}
          loading="lazy"
        />
      </div>
      <div className="dark:text-white p-4 md:p-5 w-full ">
        <h2 className="md:text-md md:text-left text-center font-bold text-sm md:mb-2 mb-0 ">
          {title}
        </h2>
        <div className="dark:text-gray-300 h-20 text-sm overflow-clip hidden md:block ">
          {shortDesc}
        </div>
        <div className="flex-1 justify-end items-end mt-4 flex gap-5 ">
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
        </div>
      </div>
    </animated.div>
  );
};

export default ProjectCard;
