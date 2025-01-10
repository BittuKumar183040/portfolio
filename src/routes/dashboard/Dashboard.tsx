import useDocumentTitle from '../documentTitle/ChangeTitle';
import Herosection from './sections/Herosection';
import Projects from './sections/Projects';
import Timeline from './sections/Timeline';

const Dashboard = () => {
  useDocumentTitle('Bittu Kumar');
  return (
    <div className=" px-6 pb-16">
      <Herosection />
      <Timeline />
      <Projects />
    </div>
  );
};

export default Dashboard;
