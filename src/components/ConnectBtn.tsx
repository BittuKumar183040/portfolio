import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useState } from "react";
import { RiContactsLine } from "react-icons/ri";

function ConnectBtn() {
  const [expand, setExpand] = useState(false);

  const handleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div className="flex gap-2 mt-10 md:flex-row flex-col items-center md:justify-start justify-center">
      <div>
        <button
          onClick={handleExpand}
          className="btn btn-sm btn-outline bg-white"
        >
            <RiContactsLine className="mr-1" />
            <span>Get in Touch</span>
        </button>
      </div>
      <div
        className={`flex flex-row gap-1 transition-all duration-300 ease-in-out ${
          expand ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-10px]"
        }`}
      >
        <FaLinkedin
          size={32}
          onClick={() => window.open("https://www.linkedin.com/in/bittukumar183040/", "_blank")}
          className="hover:text-red-600 p-1 cursor-pointer"
        />
        <FaGithub 
            size={32} 
            onClick={() => window.open("https://github.com/BittuKumar183040", "_blank")} 
            className="hover:text-red-600 p-1 cursor-pointer" 
        />
      </div>
    </div>
  );
}

export default ConnectBtn;
