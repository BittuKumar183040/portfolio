import ProjectCard from '../../../components/ProjectCard';

const locEcom = ['../assets/ecommerce/ecommerce1.jpg', '../assets/ecommerce/ecommerce2.jpg', '../assets/ecommerce/ecommerce3.jpg', '../assets/ecommerce/ecommerce4.jpg'];
const ticTac = ['../assets/tictac/tic1.jpg', '../assets/tictac/tic2.jpg', '../assets/tictac/tic3.jpg'];

const Projects = () => {
  return (
    <section className=" container mx-auto mt-4 mb-10">
        <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold text-red-600 text-center text-shadow-md">Project</h1>
        <h1 className="text-md md:text-md lg:text-xl font-bold text-red-600 text-center opacity-60 mb-6 text-shadow">List of all the project that I have build in past years.</h1>
        <div className=' flex gap-4 flex-wrap justify-around'>

          <ProjectCard 
            title='Shopping Website | ShowWithUs.' 
            description="Created E-commerece webpage using HTML, CSS and JavaScript" 
            gitLink="https://github.com/BittuKumar183040/ShopWithUs"
            previewLink="https://sw-us.vercel.app"
            img={locEcom}
          />

          <ProjectCard 
            title='Tic Tac Toe' 
            description="An interactive tic tac toe game with smooth animation build using Vanilla Javascript, HTML and CSS" 
            gitLink="https://github.com/BittuKumar183040/tictac"
            previewLink="https://bittukumar183040.github.io/tictac"
            img={ticTac}
            multiple={true}
          />

        </div>
    </section>
  )
}

export default Projects