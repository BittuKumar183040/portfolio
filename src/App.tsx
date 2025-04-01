import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';
import FourOFour from './components/FourOFour';
import MovetoTop from './components/MovetoTop';
import Dashboard from './routes/dashboard/Dashboard';
import Navbar from './routes/dashboard/sections/Navbar';
import Project from './routes/project/Project';
import Resume from './routes/resume/Resume';

const App: React.FC = () => {
  const location = useLocation();

  // Define transitions for route changes
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: 'translateY(140px) scale(1.1)' },
    enter: { opacity: 1, transform: 'translateY(0px) scale(1)' },
    config: { duration: 300 },
    keys: location.pathname,
  });
  
  console.log("Version - b2.4.1")

  return (
    <>
      <Navbar />
      {transitions((styles, item) => (
        <animated.div
          className={'bg-white dark:bg-gray-950'}
          style={{ ...styles, position: 'absolute', width: '100%' }}
        >
          <Routes location={item}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/curriculumvitae" element={<Resume />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </animated.div>
      ))}
      <MovetoTop />
    </>
  );
};

export default App;
