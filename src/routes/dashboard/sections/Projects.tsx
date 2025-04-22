import ProjectCard from '../../../components/ProjectCard';
import { projects } from '../../../assets/data/projects';
import SectionHeading from '../../../components/SectionHeading';
import { motion } from 'motion/react';

const ProjectsItems = ({ group }: any) => {
  const projectList = (key: string) => {
    if (key === 'all') {
      return projects;
    }
    return projects.filter((project) => project.group === key);
  };

  return (
    <div className=" relative flex gap-4 flex-wrap justify-around">
      <p className=" md:block hidden absolute right-0 -top-6 px-2 py-0.5 rounded-b-lg text-xs bg-gray-200 w-fit">
        No. of Projects - {projectList(group).length}
      </p>
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

const GroupProjects: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const handleTabChange = (e: any) => {
    const currentTab = e.target.ariaLabel.toLowerCase();
    localStorage.setItem('currentTab', currentTab);
  };

  const tabs = [
    { type: 'all', label: 'All' },
    { type: 'major', label: 'Major' },
    { type: 'minor', label: 'Minor' },
    { type: 'games', label: 'Games' },
    { type: 'visualization', label: 'Visualization' },
  ];

  return (
    <div
      role="tablist"
      className="tabs tabs-lifted dark:opacity-80"
      onChange={handleTabChange}
    >
      {tabs.map((tab) => (
        <>
          <motion.input
            key={tab.type}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.5 }}
            type="radio"
            name="tabs"
            role="tab"
            className="tab dark:text-gray-500"
            aria-label={tab.label}
            defaultChecked={activeTab === tab.type}
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box md:p-6 p-2 pb-6 "
          >
            <ProjectsItems group={tab.type} />
          </div>
        </>
      ))}
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
