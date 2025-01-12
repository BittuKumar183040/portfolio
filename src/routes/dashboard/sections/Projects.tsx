import ProjectCard from '../../../components/ProjectCard';
import { projects } from '../../../assets/data/projects';
import SectionHeading from '../../../components/SectionHeading';

const Projects = () => {
  return (
    <section className=" container mx-auto mt-4 pb-10">
      <SectionHeading
        heading="Projects"
        subHeading="List of all the project that I have build in past years."
      />
      <div className=" flex gap-4 flex-wrap justify-around">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            shortDesc={project.shortDesc}
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
