import useOnline from "./hooks/useOnline";
import { Sahil } from './main';


const App = () => {
  console.log("Component Starts render");

  const onlineStatus = useOnline();
  
  console.log(onlineStatus);

  console.log("Component ends render");


  return (
    <div className="sahil">
      <p className="text-3xl font-bold underline">userOnline: {String(onlineStatus)}</p>
      <div className="sahil"></div>
      <Sahil></Sahil>
    </div>
  )

}

export default App
