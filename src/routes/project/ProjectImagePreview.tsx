import { useState, memo } from 'react';

const ProjectImagePreview = ({ images }: any) => {
  const [index, setIndex] = useState<number>(0);
  const handleImageChange = (idx: number) => {
    setIndex(idx);
  };

  return (
    <div className=" flex items-start gap-4 md:flex-row flex-col-reverse">
      <div className=" flex md:flex-col flex-row gap-3 justify-center items-center">
        {images.map((item: string, idx: number) => (
          <div
            key={idx}
            className="w-full md:w-28 max-w-32 max-h-20 overflow-hidden rounded-lg border border-gray-400"
          >
            <img
              onClick={() => handleImageChange(idx)}
              className="cursor-pointer transition-all 
                hover:opacity-95 hover:scale-105"
              src={item}
              alt=""
            />
          </div>
        ))}
      </div>
      <div className=" lg:w-[500px] flex justify-center w-full">
        <img
          src={images[index]}
          alt=""
          className=" rounded-xl border shadow-xl"
        />
      </div>
    </div>
  );
};

export default memo(ProjectImagePreview);
