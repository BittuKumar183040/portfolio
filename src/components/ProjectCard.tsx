import React from 'react';
import { FaGithub } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

interface ProjectProps {
    img:string;
    title:string;
    description:string;
}

const ProjectCard : React.FC<ProjectProps> = ({img, title, description}) => {
  return (
    <div className="card glass md:w-96 w-full">
    <figure className=' h-48 object-fill overflow-scroll'>
        <img
        className=''
        src={img}
        alt="" />
    </figure>
    <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div>{description}</div>    
        <div className="card-actions justify-end">
          <FaGithub size={20}/>
          <FaRegEye size={20}/>
        </div>
    </div>
    </div>
  )
}

export default ProjectCard