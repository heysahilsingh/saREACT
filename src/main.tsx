// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('main')!).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
)

export const Sahil = () => {
  return (
    <div>Sahil COmponent</div>
  )

}