import FourOFour from './components/FourOFour';
import MovetoTop from './components/MovetoTop';
import Dashboard from './routes/dashboard/Dashboard';
import Footer from './routes/dashboard/sections/Footer';
import Navbar from './routes/dashboard/sections/Navbar';
import Project from './routes/project/Project';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </BrowserRouter>
      </div>
      <MovetoTop />
      <Footer />
    </>
  );
}

export default App;
