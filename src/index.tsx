import React from 'react'
import ReactDOM from 'react-dom/client'
import Ui from './ui/Ui.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('main')!).render(
  <React.StrictMode>
    <Ui />
  </React.StrictMode>
)