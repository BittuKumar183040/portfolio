import { useState } from 'react';
import ProjectCard from '../../../components/ProjectCard';
import { projects } from '../../../assets/data/projects';
import SectionHeading from '../../../components/SectionHeading';
import { motion } from 'motion/react';
import React from 'react';

type ProjectItem = (typeof projects)[number];

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center gap-2 rounded-box border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
    <p className="text-base font-medium text-gray-600 dark:text-gray-300">
      Nothing here yet
    </p>
    <p className="text-sm text-gray-400 dark:text-gray-500">
      No projects in this category so far — check back later.
    </p>
  </div>
);

const ProjectsItems = ({ group }: { group: string }) => {
  const projectList = (key: string): ProjectItem[] => {
    if (key === 'all') {
      return projects;
    }
    return projects.filter((project) => project.group.split(',').includes(key));
  };

  const list = projectList(group);

  return (
    <div className="relative">
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {list.length} {list.length === 1 ? 'project' : 'projects'}
      </p>

      {list.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
        >
          {list.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="min-w-0"
            >
              <ProjectCard
                id={project.id}
                title={project.title}
                shortDesc={project.shortDesc}
                imageSource={project.imageSource}
                gitLink={project.gitLink}
                previewLink={project.previewLink}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

const GroupProjects: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTab = e.target.ariaLabel?.toLowerCase();
    if (currentTab) localStorage.setItem('currentTab', currentTab);
  };

  const tabs = [
    { type: 'all', label: 'All' },
    { type: 'major', label: 'Major' },
    { type: 'minor', label: 'Minor' },
    { type: 'games', label: 'Games' },
    { type: 'visualization', label: 'Visualization' },
  ];

  return (
    <div role="tablist" className="tabs tabs-lifted" onChange={handleTabChange}>
      {tabs.map((tab) => (
        <React.Fragment key={tab.type}>
          <motion.input
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.5 }}
            type="radio"
            name="tabs"
            role="tab"
            className="tab text-sm font-medium text-gray-500 transition-colors hover:text-gray-700 checked:text-red-600 dark:text-gray-400 dark:hover:text-gray-200 dark:checked:text-red-400 sm:text-base"
            aria-label={tab.label}
            defaultChecked={activeTab === tab.type}
          />
          <div
            role="tabpanel"
            className="tab-content min-w-0 overflow-hidden rounded-box border border-gray-200 bg-white p-3 pb-6 dark:border-gray-800 dark:bg-black md:p-6"
          >
            <ProjectsItems group={tab.type} />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

const Projects = () => {
  // lazy-init so we only touch localStorage once, and guard for any
  // environment where window isn't available at render time
  const [activeTab] = useState<string>(() => {
    if (typeof window === 'undefined') return 'all';
    return localStorage.getItem('currentTab') || 'all';
  });

  return (
    <section className="container mx-auto mt-6 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <SectionHeading
        heading="Projects"
        subHeading="List of all the project that I have build in past years."
      />
      <div className="mt-8">
        <GroupProjects activeTab={activeTab} />
      </div>
    </section>
  );
};

export default Projects;
