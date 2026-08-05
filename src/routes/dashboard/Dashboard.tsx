import { ContainerScroll } from '../../components/creative/container-scroll-animation';
import SmoothScrollProvider from '../../components/creative/SmoothScrollProvider';
import useDocumentTitle from '../documentTitle/ChangeTitle';
import Footer from './sections/Footer';
import Herosection from './sections/Herosection';
import Projects from './sections/Projects';
import Testimonials from './sections/Testimonial';
import Timeline from './sections/Timeline';

const Dashboard = () => {
  useDocumentTitle('Bittu Kumar');
  return (
    <SmoothScrollProvider>
      <Herosection />
      <Timeline />
      <Projects />
      <ContainerScroll titleComponent={''}>
        <Testimonials />
      </ContainerScroll>
      <Footer />
    </SmoothScrollProvider>
  );
};

export default Dashboard;
