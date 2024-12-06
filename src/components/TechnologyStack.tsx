const TechnologyStack = () => {
  return (
    <>
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
    </>
  )
}

export default TechnologyStack