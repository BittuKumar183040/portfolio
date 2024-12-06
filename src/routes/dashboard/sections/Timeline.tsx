import TechnologyStack from "../../../components/TechnologyStack"

const Timeline = () => {
    return (
        <section className=" container mx-auto mt-4 mb-10">
            <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold text-red-600 text-center py-2">Experience</h1>
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                <li>
                    <hr />
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="timeline-start mb-10 text-justify flex flex-col md:items-end h-full mt-14">
                        <time className="font-mono italic ">January 2023</time>
                        <div className="text-lg font-black">BosonQ Psi PVT. LTD.</div>
                        <p className=" text-md">With 2 years of experience at this company, I play a key role in the software team, handling both frontend and backend
                        development for Beta 2.0. I work with technologies like React JS, Fast API, Spring Boot, and manage deployment to the
                        Dev environment. I have also developed multiple POCs and led the development of an in-house 3D model visualization
                        tool to display simulation results and uploaded CAD files.</p>
                    </div>
                    <div className="timeline-end timeline-box">
                        <TechnologyStack/>
                    </div>
                    <hr />
                </li>
            </ul>
        </section>
    )
}

export default Timeline