interface sectionAllowed {
  heading: String;
  subHeading?: String;
}

const SectionHeading = ({ heading, subHeading }: sectionAllowed) => {
  return (
    <div className=" text-gray-800 dark:text-white text-center my-4 flex items-center justify-center flex-col">
      <p className=" text-2xl md:text-2xl lg:text-3xl font-bold text-shadow-md ">
        {heading}
      </p>
      {subHeading && (
        <p className=" text-md font-bold opacity-80 text-shadow-md  ">
          {subHeading}
        </p>
      )}
      <div className=" bg-gray-200 dark:bg-gray-700 w-12 h-1 rounded-lg mt-1"></div>
    </div>
  );
};

export default SectionHeading;
