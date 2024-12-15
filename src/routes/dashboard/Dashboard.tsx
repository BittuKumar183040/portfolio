import Herosection from './sections/Herosection';
import Projects from './sections/Projects';
import Timeline from './sections/Timeline';

const Dashboard = () => {
  return (
    <div className=" px-6">
      <Herosection />
      <Timeline />
      <Projects />
    </div>
  );
};

export default Dashboard;
