interface AppProps {
  sa: string;
  className?: string;
  defaultClass?: string;
  h1?: string;
  p?: string;
}

function App(props: AppProps) {
  console.log(props);

  return (
    <div className="sahil"></div>
  )

}

export default App
