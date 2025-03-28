import { CgScrollV } from 'react-icons/cg';
import ConnectBtn from '../../../components/ConnectBtn';
import me from '../../../assets/me.svg';

const Herosection = () => {
  return (
    <>
      <section className=" container mx-auto">
        <div className=" flex justify-between items-center gap-10 flex-wrap h-dvh overflow-hidden pt-16">
          <div className="flex flex-col gap-6 transform -translate-y text-left px-4">
            <div className="text-gray-900 flex flex-col items-center md:items-start mt-96 md:mt-0 py-4 text-center ">
              <p className="text-xl mb-3 md:text-2xl lg:text-3xl font-light dark:text-white">
                Hi, I'm a
              </p>
              <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-600 text-shadow-md">
                Full Stack Developer
              </p>
              <p className="text-2xl opacity-85 md:text-4xl lg:text-5xl font-medium text-gray-700 text-shadow-sm dark:text-white">
                & 3D Modelling Artist
              </p>
            </div>
            <div className="text-lg md:text-xl lg:w-1/2 text-gray-700 opacity-70 text-center md:text-left dark:text-white">
              <p>
                I'm <span className="font-bold text-red-600">Bittu Kumar</span>,
                a passionate{' '}
                <span className="text-red-600">full stack developer</span> with
                over{' '}
                <span className="font-semibold text-red-600">
                  2 years of experience
                </span>{' '}
                in the development field. I specialize in building{' '}
                <span className="font-semibold text-red-600">
                  clean, functional websites
                </span>{' '}
                and am always eager to explore new technologies.
              </p>
            </div>
            <ConnectBtn />
          </div>
          <div
            id="svg-container"
            className="absolute md:right-0 mt-24 md:w-1/2 h-dvh pointer-events-none"
          >
            <img
              className=" object-contain opacity-50 dark:opacity-100 dark:grayscale"
              src={me}
              alt=""
            />
          </div>
          <div className=" relative w-full flex dark:text-white justify-center">
            <CgScrollV className=" absolute text-2xl" />
            <CgScrollV className=" text-2xl animate-ping" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Herosection;
