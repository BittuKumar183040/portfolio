import { motion } from 'motion/react';

interface SectionHeadingProps {
  heading: string;
  subHeading?: string;
  align?: 'center' | 'left';
}

const SectionHeading = ({
  heading,
  subHeading,
  align = 'center',
}: SectionHeadingProps) => {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`my-6 flex flex-col ${
        isCenter ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      <span className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-primary/70 dark:text-primary/60">
        {subHeading ? subHeading : '—'}
      </span>

      <h2 className="mt-1.5 text-3xl font-bold tracking-tight text-gray-800 dark:text-white md:text-3xl lg:text-4xl">
        {heading}
      </h2>

      <div className="relative mt-3 h-1 w-14 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <motion.div
          initial={{ x: '-100%' }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="absolute inset-0 rounded-full bg-primary dark:bg-primary"
        />
      </div>
    </motion.div>
  );
};

export default SectionHeading;
