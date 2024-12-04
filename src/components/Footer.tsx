import { IoLogoGithub } from "react-icons/io";
const Footer = () => {
    return (
        <footer className="footer bg-neutral text-neutral-content items-center p-4">
            <aside className="grid-flow-col items-center flex gap-5">
                <img src="/me.png" alt="Bittu Kumar" className="w-10 rounded-xl transform scale-125" />
                <p>Copyright © 2023 - {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <IoLogoGithub  className=" h-6 w-fit" />
                <IoLogoGithub  className=" h-6 w-fit" />
                <IoLogoGithub  className=" h-6 w-fit" />
            </nav>
        </footer>
    )
}

export default Footer