const NavBarBtn = ({
  title,
  icon,
  handleClick,
}: {
  title: string;
  icon: any;
  handleClick: any;
}) => {
  return (
    <div
      id={title}
      onClick={handleClick}
      className=" flex gap-2 items-center cursor-pointer shadow-md rounded-md py-1 px-4 border"
    >
      <p className=" opacity-80 pointer-events-none">{icon}</p>
      <p className=" text-sm pointer-events-none">{title}</p>
    </div>
  );
};

export default NavBarBtn;
