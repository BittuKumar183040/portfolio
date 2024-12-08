import MovetoTop from "../../components/MovetoTop"
import Footer from "./sections/Footer"
import Herosection from "./sections/Herosection"
import Navbar from "./sections/Navbar"
import Projects from "./sections/Projects"
import Timeline from "./sections/Timeline"

const Dashboard = () => {
  return (<>
    <Navbar />
    <div className=" mx-6">
      <Herosection />
      <Timeline />
      <Projects />
    </div>
    <MovetoTop/>
    <Footer />
  </>
  )
}

export default Dashboard