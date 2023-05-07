import React from 'react'
import ReactDOM from 'react-dom/client'


import Rotas from './Routes'
import { BrowserRouter } from 'react-router-dom'

import GlobalStyle from './style/main'
import "./style/imports.css"


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
  </React.StrictMode>,
)
