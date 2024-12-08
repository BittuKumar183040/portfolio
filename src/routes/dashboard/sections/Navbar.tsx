import DropDown from "../../../components/DropDown"

const Navbar = () => {
    return (
        <div className="flex bg-white bg-opacity-40 backdrop-blur-sm shadow-md z-50 fixed top-0 w-full p-3 px-4">
            <div className="flex-1 flex items-center">
                <p className="text-md">Bittu Kumar.</p>
            </div>
            <DropDown />
        </div>
    )
}

export default Navbar