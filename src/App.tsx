import FourOFour from './components/FourOFour';
import MovetoTop from './components/MovetoTop';
import Dashboard from './routes/dashboard/Dashboard';
import Navbar from './routes/dashboard/sections/Navbar';
import Project from './routes/project/Project';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Resume from './routes/resume/Resume';

function App() {
  return (
    <>
      <Navbar />
      <div className=" bg-white dark:bg-gray-950">
        {/* route setup */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/project/:id"
              element={<Project />}
              key={window.location.pathname}
            />
            <Route path="/curriculumvitae" element={<Resume />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </BrowserRouter>
      </div>
      <MovetoTop />
    </>
  );
}

export default App;
