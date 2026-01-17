import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// Tailwind styles are loaded via CDN in index.html as per instructions, 
// but we include this file to satisfy standard vite structure.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)