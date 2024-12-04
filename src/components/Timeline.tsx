const Timeline = () => {
    return (
        <>
            <h1>Experience</h1>
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
                    <div className="timeline-end mb-10 md:w-96 lg:w-[30rem] text-justify">
                        <time className="font-mono italic">January 2023</time>
                        <div className="text-lg font-black">BosonQ Psi PVT. LTD.</div>
                        <p className=" text-md">With 2 years of experience at this company, I play a key role in the software team, handling both frontend and backend
                        development for Beta 2.0. I work with technologies like React JS, Fast API, Spring Boot, and manage deployment to the
                        Dev environment. I have also developed multiple POCs and led the development of an in-house 3D model visualization
                        tool to display simulation results and uploaded CAD files.</p>
                        <strong className=" opacity-70">Technology Stack:</strong>                    
                        <div className="space-y-2 ml-2">
                            <div>
                                <h3 className="text-md font-semibold text-blue-400">Frontend</h3>
                                <p className="">
                                    React, JavaScript, Redux, Three.js, CSS (SCSS, Tailwind, Styled-components), Responsive Design, API
                                    Handling (fetch, axios).
                                </p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold text-green-400">Backend</h3>
                                <p className="">
                                    Python, Django, FastAPI, SQLAlchemy, JSON, Data Processing, Celery, Socket.IO.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold text-yellow-400">Databases</h3>
                                <p className="">MySQL, Postgres, MongoDB.</p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold text-purple-400">DevOps</h3>
                                <p className="">AWS, S3, ECR, Docker, Docker Compose, Lens.</p>
                            </div>
                            <div>
                                <h3 className="text-md font-semibold text-pink-400">UI</h3>
                                <p className="">Figma, Fig-jam Board, Miro, Photoshop, Blender 3D.</p>
                            </div>
                        </div>
                    
                        </div>
                    <hr />
                </li>
            </ul>
        </>
    )
}

export default Timeline