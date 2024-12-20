import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div
      onClick={handleClick}
      className="card light:glass dark:bg-gray-900 md:w-80 lg:w-96 w-full justify-around transition-all shadow-md hover:shadow-2xl hover:-translate-y-2"
    >
      <div
        className={`carousel select-none carousel-vertical hover "cursor-pointer" rounded-box h-56 flex flex-col bg-slate-200`}
      >
        <img
          className="carousel-item h-full w-full object-cover object-top pointer-events-none"
          src={imageSource[0]}
          alt={''}
          loading="lazy"
        />
      </div>
      <div className="card-body dark:text-white p-4 md:p-5 ">
        <h2 className="card-title text-md">{title}</h2>
        <div className="dark:text-gray-300 h-20 text-sm overflow-clip ">
          {shortDesc}
        </div>
        <div className="card-actions flex-1 justify-end items-end mt-4 flex gap-5 ">
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
            <div className=" tooltip tooltip-top" data-tip="Project Preview">
              <FaRegEye
                className=" cursor-pointer"
                onClick={(e) => handleLinkClick(e, previewLink)}
                size={25}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
