// import { useState } from 'react'
import './App.css'

interface defaultClass {
  defaultClass: string
}

interface TI_AppProps extends defaultClass {
  h1: string
  p: string
  className?: string
}

function App(props: TI_AppProps) {

  console.log(props);

  return (
    <>
    <div className={`sahil ${props.className || "" || props.defaultClass}`}>{props.h1}</div>
    <div className="sahil">{props.p}</div>
    </>
  )
}

export default App
