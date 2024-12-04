import Drawer from "../../components/Drawer"
import Footer from "../../components/Footer"
import Herosection from "../../components/Herosection"
import Navbar from "../../components/Navbar"
import Timeline from "../../components/Timeline"

const Dashboard = () => {
  return (<>
    <Navbar />
    <div className=" mx-6">
      <Herosection />
      {/* <Drawer /> */}
      <Timeline />
    </div>
    <Footer/>
  </>
  )
}

export default Dashboard