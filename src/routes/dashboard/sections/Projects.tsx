import ProjectCard from '../../../components/ProjectCard';
import { projects } from '../../../assets/data/projects';
import SectionHeading from '../../../components/SectionHeading';

const ProjectsItems = ({ group }: any) => {
  const projectList = (key: string) => {
    if (key === 'all') {
      return projects;
    }
    return projects.filter((project) => project.group === key);
  };

  return (
    <div className=" flex gap-4 flex-wrap justify-around">
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
    </div>
  );
};

const GroupProjects = ({ activeTab }: { activeTab: string }) => {
  const handleTabChange = (e: any) => {
    const currentTab = e.target.ariaLabel.toLowerCase();
    localStorage.setItem('currentTab', currentTab);
  };

  return (
    <div
      role="tablist"
      className="tabs tabs-lifted dark:opacity-80"
      onChange={handleTabChange}
    >
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab dark:text-gray-500"
        aria-label="All"
        defaultChecked={activeTab === 'all'}
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box md:p-6 p-2 pb-6 "
      >
        <ProjectsItems group="all" />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab dark:text-gray-500"
        aria-label="Major"
        defaultChecked={activeTab === 'major'}
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box md:p-6 p-2 pb-6"
      >
        <ProjectsItems group="major" />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab dark:text-gray-500"
        aria-label="Minor"
        defaultChecked={activeTab === 'minor'}
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box md:p-6 p-2 pb-6"
      >
        <ProjectsItems group="minor" />
      </div>
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab dark:text-gray-500"
        aria-label="Games"
        defaultChecked={activeTab === 'games'}
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box md:p-6 p-2 pb-6"
      >
        <ProjectsItems group="game" />
      </div>
    </div>
  );
};

const Projects = () => {
  const activeTab = localStorage.getItem('currentTab') || 'major';
  return (
    <section className=" container mx-auto mt-4 pb-10">
      <SectionHeading
        heading="Projects"
        subHeading="List of all the project that I have build in past years."
      />
      <GroupProjects activeTab={activeTab} />
    </section>
  );
};

export default Projects;
