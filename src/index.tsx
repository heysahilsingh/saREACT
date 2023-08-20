import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './ui/App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('main')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)