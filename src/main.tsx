import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('main')!).render(
  <React.StrictMode>
    <App h1 = "New Heading" defaultClass='default class sa' p = "This is a paragraph for this page. Just a dummy one." />
  </React.StrictMode>,
)