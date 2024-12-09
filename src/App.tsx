import { useEffect, useState } from "react"
import Dashboard from "./routes/dashboard/Dashboard"

function App() {
  const[loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handlePageLoad = () => setLoading(false);
    const simulateLoading = setTimeout(() => setLoading(false), 1000);
    window.addEventListener("load", handlePageLoad);
    return () => {
      window.removeEventListener("load", () => setLoading(false));
      clearTimeout(simulateLoading);
    }
  }, [])

  return (
    <div className=" bg-white dark:bg-gray-950"> 
      {loading ? <LoadingScreen /> : <Dashboard />}
    </div>
  )
}
const LoadingScreen = () => <div className="flex h-screen w-screen justify-center items-center">
    <img className=" h-24 w-24" src="./loading.gif" alt="loading" /> 
  </div>;
export default App
