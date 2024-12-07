import ProjectCard from '../../../components/ProjectCard';

const Projects = () => {
  return (
    <section className=" container mx-auto mt-4 mb-10">
        <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold text-red-600 text-center text-shadow-md">Project</h1>
        <h1 className="text-md md:text-md lg:text-xl font-bold text-red-600 text-center opacity-60 mb-6 text-shadow">List of all the project that I have build in past years.</h1>
        <div className=' flex gap-4 flex-wrap justify-around'>
          <ProjectCard 
            title='Ecommerce' description="Created E-commerece webpage using HTML, CSS and JavaScript"/>
        </div>
    </section>
  )
}

export default Projects