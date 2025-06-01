import { useParams } from 'react-router-dom';
import { projects } from '../../assets/data/projects';
import FourOFour from '../../components/FourOFour';
import ProjectImagePreview from './ProjectImagePreview';
import { FaGithub, FaRegEye } from 'react-icons/fa6';
import useDocumentTitle from '../documentTitle/ChangeTitle';
import BackBtn from '../../components/BackBtn';

const Project = () => {
  const { id } = useParams();
  const project = projects.find((project) => project.id === id);

  useDocumentTitle(project?.title);

  window.scrollTo({ top: 0 });
  if (!project) return <FourOFour />;

  return (
    <div className=" container relative mx-auto pt-32 gap-8 px-2 md:px-0 ">
      <div
        className=" fixed top-[53px] left-1/2 -translate-x-1/2 shadow-lg dark:shadow-gray-700 dark:bg-opacity-50 rounded-b-2xl bg-white dark:bg-black bg-opacity-40 backdrop-blur-sm 
        px-8 py-3"
      >
        <div className="card-actions flex-1 justify-end items-end flex gap-5 dark:text-gray-300">
          {project.gitLink && (
            <div className=" tooltip tooltip-left " data-tip="Github">
              <FaGithub
                className=" cursor-pointer"
                onClick={() => window.open(project.gitLink, '_blank')}
                size={25}
              />
            </div>
          )}
          {project.previewLink && (
            <div className=" tooltip tooltip-right" data-tip="Project Preview">
              <FaRegEye
                className=" cursor-pointer"
                onClick={() => window.open(project.previewLink, '_blank')}
                size={25}
              />
            </div>
          )}
        </div>
      </div>
      <BackBtn />
      <p className=" text-3xl pb-10 dark:text-white">{project.title}</p>
      <div className="flex flex-col lg:flex-row gap-8 pb-10">
        <ProjectImagePreview images={project.imageSource} />
        <div dangerouslySetInnerHTML={{ __html: project.description }} />
      </div>
    </div>
  );
};

export default Project;
