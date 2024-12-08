import React from 'react';
import { FaGithub } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

interface ProjectProps {
    title:string;
    description:string;
    imageSource?:string;
    gitLink?:string;
    previewLink?:string;
}

const ProjectCard : React.FC<ProjectProps> = ({title, description, imageSource, gitLink, previewLink}) => {
  return (
    <div className="card glass md:w-80 lg:w-96 w-full justify-around overflow-hidden transition-all shadow-sm hover:shadow-xl hover:-translate-y-2">
      <div className={`carousel select-none carousel-vertical hover "cursor-pointer" rounded-box h-56 flex flex-col bg-slate-200`}>
        <img
            className="carousel-item h-full w-full object-cover object-top pointer-events-none"
            src={imageSource}
            alt={""}
            loading="lazy"
        />
      </div>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div>{description}</div>    
        <div className="card-actions justify-end mt-4 flex gap-5">
          { gitLink && <FaGithub className=' cursor-pointer' onClick={() => window.open(gitLink, "_blank")} size={25}/>}
          { previewLink && <FaRegEye className=' cursor-pointer' onClick={() => window.open(previewLink, "_blank")} size={25}/>}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard