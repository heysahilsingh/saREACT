// import React from 'react'
import ReactDOM from 'react-dom/client'
import { routes } from './ui/Ui.tsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('main')!).render(
    <RouterProvider router={routes} />
)

// ReactDOM.createRoot(document.getElementById('main')!).render(
//   <React.StrictMode>
//     <RouterProvider router={routes} />
//   </React.StrictMode>
// )
