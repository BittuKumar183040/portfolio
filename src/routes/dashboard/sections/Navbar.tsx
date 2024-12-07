
const Navbar = () => {
    return (
        <div className="flex bg-white bg-opacity-40 backdrop-blur-sm shadow-md z-50 fixed top-0 w-full p-3 px-4">
            <div className="flex-1 flex items-center">
                <p className="text-md">Bittu Kumar.</p>
            </div>
            <div className="">
                <button className="">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-4 w-4 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Navbar