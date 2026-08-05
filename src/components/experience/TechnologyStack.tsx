import { motion } from 'motion/react';
import type { TechCategory } from './types';

// Give each category a distinct accent so a multi-category stack is easy to
// scan at a glance, while staying muted enough not to fight the timeline.
const CATEGORY_STYLES: Record<string, string> = {
  Frontend: 'bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300',
  Backend:
    'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
  Databases:
    'bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',
  DevOps:
    'bg-violet-500/10 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300',
  'UI/UX':
    'bg-pink-500/10 text-pink-700 dark:bg-pink-400/10 dark:text-pink-300',
  Process:
    'bg-teal-500/10 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300',
};

const DEFAULT_STYLE =
  'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200';

type StackSectionProps = TechCategory;

const StackSection = ({ title, stack }: StackSectionProps) => {
  const badgeStyle = CATEGORY_STYLES[title] ?? DEFAULT_STYLE;

  return (
    <div className="mt-3 first:mt-0">
      <h4 className="my-1 text-xs font-semibold uppercase tracking-wider text-base-content/60 dark:text-gray-400">
        {title}
      </h4>
      <div className="ml-0.5 flex flex-wrap gap-1.5 text-sm">
        {stack
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
          .map((item) => (
            <motion.span
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              key={item}
              className={`h-fit w-fit rounded-full px-3 py-0.5 text-sm font-medium ${badgeStyle}`}
            >
              {item}
            </motion.span>
          ))}
      </div>
    </div>
  );
};

interface TechnologyStackProps {
  technologies: TechCategory[];
}

const TechnologyStack = ({ technologies }: TechnologyStackProps) => {
  return (
    <div>
      <strong className="text-sm tracking-wide">Technology Stack:</strong>
      {technologies.map((category) => (
        <StackSection key={category.title} {...category} />
      ))}
    </div>
  );
};

export default TechnologyStack;
