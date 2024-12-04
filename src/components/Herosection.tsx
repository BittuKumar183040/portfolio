import { CgScrollH, CgScrollV } from "react-icons/cg"
import { FaMouse } from "react-icons/fa"
import { FaScrollTorah } from "react-icons/fa6"
import { MdMouse } from "react-icons/md"
import { PiMouseScroll, PiMouseScrollFill } from "react-icons/pi"

const Herosection = () => {
  return (
    <div className=' flex justify-between items-center gap-10 flex-wrap h-screen'>
        <div className=" flex flex-col gap-4 transform -translate-y-20">
            <div className=" lg:text-4xl md:text-2xl">
                <p></p>
                <p>Hi, I'm a </p>
                <p className=" lg:text-6xl">Full Stack Developer</p>
                <p className=" lg:text-5xl"> & 3D Modelling Artist </p>
            </div>
            <div className=" text-lg lg:w-full">
                <p>I'm Bittu Kumar, a full stack developer current holds over 2 years of experence in development field.</p>
            </div>
        </div>
        <div className=' absolute md:right-0 md:w-1/2 h-screen'>
            <img className=' pointer-events-none object-contain opacity-40' src='/me.png' alt='' />
        </div>
        <div className=" absolute left-0 bottom-2 w-full flex justify-center">
            <CgScrollV className=" absolute text-2xl"/>
            <CgScrollV className=" text-2xl animate-ping"/>
        </div>
    </div>
  )
}

export default Herosection