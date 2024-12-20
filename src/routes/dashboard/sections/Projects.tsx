import ProjectCard from '../../../components/ProjectCard';
import { projects } from '../../../assets/data/projects';

const Projects = () => {
  return (
    <section className=" container mx-auto mt-4 pb-10">
      <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold text-red-600 text-center text-shadow-md">
        Projects
      </h1>
      <h1 className="text-md md:text-md lg:text-xl font-bold text-red-600 text-center opacity-80 mb-6 text-shadow dark:text-white">
        List of all the project that I have build in past years.
      </h1>
      <div className=" flex gap-4 flex-wrap justify-around">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            shortDesc={project.shortDesc}
            description={project.description}
            imageSource={project.imageSource}
            gitLink={project.gitLink}
            previewLink={project.previewLink}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
