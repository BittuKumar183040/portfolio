import ProjectCard from '../../../components/ProjectCard';

import ecom from '../../../assets/ecommerce/ecommerce1.jpg';
import tic from '../../../assets/tictac/tic1.jpg';
import adv from '../../../assets/advice/adv1.jpg';

const Projects = () => {
  return (
    <section className=" container mx-auto mt-4 mb-10">
        <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold text-red-600 text-center text-shadow-md">Projects</h1>
        <h1 className="text-md md:text-md lg:text-xl font-bold text-red-600 text-center opacity-80 mb-6 text-shadow dark:text-white">List of all the project that I have build in past years.</h1>
        <div className=' flex gap-4 flex-wrap justify-around'>

          <ProjectCard 
            title='Shopping Website | ShowWithUs.' 
            description="Created E-commerece webpage using HTML, CSS and JavaScript" 
            imageSource={ecom}
            gitLink="https://github.com/BittuKumar183040/ShopWithUs"
            previewLink="https://sw-us.vercel.app"
          />

          <ProjectCard 
            title='Tic Tac Toe' 
            description="An interactive tic tac toe game with smooth animation build using Vanilla Javascript, HTML and CSS" 
            imageSource={tic}
            gitLink="https://github.com/BittuKumar183040/tictac"
            previewLink="https://bittukumar183040.github.io/tictac"
          />

          <ProjectCard 
            title='Advice Generator App' 
            description="By using APIs, this app generates a random advice for you." 
            imageSource={adv}
            gitLink="https://github.com/BittuKumar183040/Advice-Generator"
            previewLink="https://bittukumar183040.github.io/Advice-Generator/"
          />

        </div>
    </section>
  )
}

export default Projects