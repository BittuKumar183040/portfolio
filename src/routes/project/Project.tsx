import { useParams } from "react-router-dom"
import { projects } from "../../assets/data/projects"
import FourOFour from "../../components/FourOFour"
interface Props {
  title:string, 
  value?:number
}
const Progress = ({title, value}:Props) => {
  return (
    <div className=" flex items-center gap-4 w-11/12 mx-auto">
      <p className=" text-md w-40 opacity-80">{title}</p>
      <progress 
        className="progress w-full" 
        {...(value) == undefined ? {} : {value}}
        max="100"
        >
      </progress>
    </div>
  )
}

const Project = () => {
  let { id } = useParams();
  const project = projects.find((project) => project.id === id);
  if(!project) return <FourOFour />
  return (
    <div className=" container px-2 h-screen flex flex-wrap gap-5 items-center">
      
      <div className=" bg-red-400">
        <img src="" alt={project.title} />
      </div>
      <div className=" bg-slate-200">
        <p className=" text-3xl">{project.title}</p>
        <div dangerouslySetInnerHTML={{ __html: project.description}} />
        <p className=" text-xl opacity-80">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi repudiandae sit accusamus ex eligendi, veniam culpa assumenda dolor possimus deserunt enim. Omnis non dolores doloremque ullam expedita saepe provident nobis.</p>
        <hr />
        <div className=" w-full sm:w-96">
          <Progress title="React" value={90}/>
          <Progress title="HTMl" value={90}/>
          <Progress title="CSS" value={85}/>
        </div>
      </div>
    </div>
  )
}

export default Project