import ProjectCard from '../../../components/ProjectCard';
import { projects } from '../../../assets/data/projects';
import SectionHeading from '../../../components/SectionHeading';

const ProjectsItems = ({ group }: any) => {

  const projectList = (key: string) => {
    if (key === 'all') {
      return projects;
    }
    return projects.filter((project) => project.group === key);
  }

  return (<div className=" flex gap-4 flex-wrap justify-around">
    {projectList(group).map((project) => (
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
  </div>)
}

const GroupProjects = () => {
  return (
    <div role="tablist" className="tabs tabs-lifted text-black dark:text-white">
      <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="All" />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box md:p-6 p-2 pb-6">
        <ProjectsItems group="all" />
      </div>

      <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Major" defaultChecked />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box md:p-6 p-2 pb-6">
        <ProjectsItems group="major" />
      </div>

      <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Minor" />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box md:p-6 p-2 pb-6">
        <ProjectsItems group="minor" />
      </div>
      <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Games" />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box md:p-6 p-2 pb-6">
        <ProjectsItems group="game" />
      </div>
    </div>
  )
}


const Projects = () => {
  return (
    <section className=" container mx-auto mt-4 pb-10">
      <SectionHeading
        heading="Projects"
        subHeading="List of all the project that I have build in past years."
      />
      <GroupProjects />

    </section>
  );
};

export default Projects;
