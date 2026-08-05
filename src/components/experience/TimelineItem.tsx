import { motion } from 'motion/react';
import TechnologyStack from './TechnologyStack';
import type { Experience } from './types';

interface TimelineItemProps {
  experience: Experience;
  index: number;
  hasTopConnector: boolean;
  hasBottomConnector: boolean;
}

const connectorClass =
  'bg-gradient-to-b from-transparent via-primary/40 to-transparent';

const TimelineItem = ({
  experience,
  index,
  hasTopConnector,
  hasBottomConnector,
}: TimelineItemProps) => {
  const {
    period,
    role,
    company,
    logo,
    logoAlt,
    employmentType,
    summary,
    highlights,
    technologies,
  } = experience;

  return (
    <li>
      {hasTopConnector ? (
        <hr className={connectorClass} />
      ) : (
        <hr className="opacity-0" />
      )}

      <div className="timeline-middle">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/30 dark:bg-primary/20 dark:text-primary-content"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/20" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="relative h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: '-80px', amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="timeline-start mb-10 mt-14 flex h-full flex-col text-justify md:items-end"
      >
        <div className="flex items-center gap-2">
          <span className="mb-1 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-mono text-xs italic tracking-wide text-primary dark:bg-primary/20">
            {period}
          </span>
          {employmentType && (
            <span className="mb-1 inline-flex items-center rounded-full border border-primary/30 px-3 py-1 font-mono text-xs tracking-wide text-primary/80 dark:text-primary-content/80">
              {employmentType}
            </span>
          )}
        </div>

        <time className="mt-2 font-mono text-sm font-medium tracking-wide text-base-content/70 dark:text-gray-400">
          {role}
        </time>

        <div className="mr-2 mt-1 flex items-center gap-2.5 text-lg font-black tracking-tight dark:text-gray-100">
          <div className="relative flex h-6 w-6 items-center justify-center">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-primary/30"
            />
            <img
              loading="lazy"
              className="h-4 w-4 object-contain"
              src={logo}
              alt={logoAlt}
            />
          </div>
          {company}
        </div>

        {summary && (
          <p className="mr-2 mt-3 max-w-md text-[15px] leading-relaxed text-base-content/80 dark:text-gray-400">
            {summary}
          </p>
        )}

        {highlights && highlights.length > 0 && (
          <ul className="mr-2 mt-3 max-w-md space-y-2 text-[15px] leading-relaxed text-base-content/80 dark:text-gray-400">
            {highlights.map((point) => (
              <li
                key={point}
                className="flex md:flex-row-reverse md:text-right"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 md:ml-2 md:mr-0 mr-2" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: '-80px', amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        className="timeline-end timeline-box mb-10 border border-base-300/60 bg-base-100/40 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.02] dark:text-white"
      >
        <TechnologyStack technologies={technologies} />
      </motion.div>

      {hasBottomConnector ? (
        <hr className={connectorClass} />
      ) : (
        <hr className="opacity-0" />
      )}
    </li>
  );
};

export default TimelineItem;
