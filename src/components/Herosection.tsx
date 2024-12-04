import { CgScrollH, CgScrollV } from "react-icons/cg"
import { FaMouse } from "react-icons/fa"
import { FaScrollTorah } from "react-icons/fa6"
import { MdMouse } from "react-icons/md"
import { PiMouseScroll, PiMouseScrollFill } from "react-icons/pi"

const Herosection = () => {
    return (
        <div className=' flex justify-between items-center gap-10 flex-wrap h-screen'>
            <div className="flex flex-col gap-6 transform -translate-y-20 text-left px-4">
                <div className="text-gray-800">
                    <p className="text-xl md:text-2xl lg:text-3xl font-light">Hi, I'm a</p>
                    <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-600 text-shadow-md">Full Stack Developer</p>
                    <p className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-700 text-shadow-sm"> & 3D Modelling Artist</p>
                </div>
                <div className="text-lg md:text-xl lg:w-2/3 text-gray-700 opacity-70">
                    <p>
                        I'm <span className="font-bold text-red-600">Bittu Kumar</span>, a
                        passionate <span className="text-red-600">full stack developer</span> with
                        over <span className="font-semibold text-red-600">2 years of experience</span> in the development field.
                    </p>
                </div>
            </div>
            <div className=' absolute md:right-0 md:w-1/2 h-screen'>
                <img className=' pointer-events-none object-contain opacity-40' src='/me.png' alt='' />
            </div>
            <div className=" absolute left-0 bottom-2 w-full flex justify-center">
                <CgScrollV className=" absolute text-2xl" />
                <CgScrollV className=" text-2xl animate-ping" />
            </div>
        </div>
    )
}

export default Herosection