import React from 'react';
import { FaGithub } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import ProjectImages from './ProjectImages';

interface ProjectProps {
    title:string;
    description:string;
}

const ProjectCard : React.FC<ProjectProps> = ({title, description}) => {
  return (
    <div className="card glass md:w-80 lg:w-96 w-full justify-around overflow-hidden">
      <ProjectImages />
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div>{description}</div>    
        <div className="card-actions justify-end">
          <FaGithub className=' cursor-pointer' onClick={() => window.open("https://github.com/BittuKumar183040/ShopWithUs", "_blank")} size={20}/>
          <FaRegEye className=' cursor-pointer' onClick={() => window.open("https://sw-us.vercel.app", "_blank")} size={20}/>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard