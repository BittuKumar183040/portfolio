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

  console.log(`                                         
BBBBBBBBBBBBBBBBB      222222222222222    Version-b2.132.0 
B::::::::::::::::B    2:::::::::::::::22  
B::::::BBBBBB:::::B   2::::::222222:::::2 
BB:::::B     B:::::B  2222222     2:::::2 
  B::::B     B:::::B              2:::::2 
  B::::B     B:::::B              2:::::2 
  B::::BBBBBB:::::B            2222::::2  
  B:::::::::::::BB        22222::::::22   
  B::::BBBBBB:::::B     22::::::::222     
  B::::B     B:::::B   2:::::22222        
  B::::B     B:::::B  2:::::2             
  B::::B     B:::::B  2:::::2             
BB:::::BBBBBB::::::B  2:::::2       222222
B:::::::::::::::::B   2::::::2222222:::::2
B::::::::::::::::B    2::::::::::::::::::2
BBBBBBBBBBBBBBBBB     22222222222222222222                                        
`);

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
