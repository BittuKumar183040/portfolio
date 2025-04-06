import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import FourOFour from './components/FourOFour';
import MovetoTop from './components/MovetoTop';
import Dashboard from './routes/dashboard/Dashboard';
import Navbar from './routes/dashboard/sections/Navbar';
import Project from './routes/project/Project';
import Resume from './routes/resume/Resume';

const App: React.FC = () => {
  const location = useLocation();
  console.log('Version - b2.4.1');

  return (
    <>
      <Navbar />
      <div
        className={'bg-white dark:bg-gray-950'}
        style={{ position: 'absolute', width: '100%' }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/curriculumvitae" element={<Resume />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </div>
      <MovetoTop />
    </>
  );
};

export default App;
