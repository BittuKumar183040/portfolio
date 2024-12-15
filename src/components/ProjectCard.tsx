import React from 'react';
import { FaGithub } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

interface ProjectProps {
    id: string;
    title:string;
    description:string;
    imageSource?:any;
    gitLink?:string;
    previewLink?:string;
}

const ProjectCard : React.FC<ProjectProps> = ({id, title, description, imageSource, gitLink, previewLink}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/project/${id}`);
  }

  return (
    <div onClick={handleClick} className="card light:glass dark:bg-gray-900 md:w-80 lg:w-96 w-full justify-around transition-all shadow-md hover:shadow-2xl hover:-translate-y-2">
      <div className={`carousel select-none carousel-vertical hover "cursor-pointer" rounded-box h-56 flex flex-col bg-slate-200`}>
        <img
            className="carousel-item h-full w-full object-cover object-top pointer-events-none"
            src={imageSource}
            alt={""}
            loading="lazy"
        />
      </div>
      <div className="card-body dark:text-white">
        <h2 className="card-title">{title}</h2>
        <div className='dark:text-gray-300'>{description}</div>    
        <div className="card-actions justify-end mt-4 flex gap-5">
          { gitLink && 
            <div className=' tooltip tooltip-top' data-tip="Github">
              <FaGithub className=' cursor-pointer' onClick={() => window.open(gitLink, "_blank")} size={25}/>
            </div>
          }
          { previewLink && 
          <div className=' tooltip tooltip-top' data-tip="Project Preview">
            <FaRegEye className=' cursor-pointer' onClick={() => window.open(previewLink, "_blank")} size={25}/>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard