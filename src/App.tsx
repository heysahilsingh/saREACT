import useOnline from "./hooks/useOnline";


const App = () => {
  console.log("Component Starts render");

  const onlineStatus = useOnline();
  
  console.log(onlineStatus);

  console.log("Component ends render");


  return (
    <div className="sahil">
      <p>userOnline: {String(onlineStatus)}</p>
    </div>
  )

}

export default App
