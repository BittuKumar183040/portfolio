import SectionHeading from '../../../components/SectionHeading';
import TimelineItem from '../../../components/experience/TimelineItem';
import experiences from '../../../assets/data/experienceData';

const Timeline = () => {
  return (
    <section className="container mx-auto mt-4 mb-24 px-4">
      <SectionHeading heading="Experience" />

      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical mt-8">
        {experiences.map((experience, index) => (
          <TimelineItem
            key={experience.id}
            experience={experience}
            index={index}
            hasTopConnector={index !== 0}
            hasBottomConnector={index !== experiences.length - 1}
          />
        ))}
      </ul>
    </section>
  );
};

export default Timeline;
