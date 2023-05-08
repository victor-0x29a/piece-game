import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider as ReduxProvier } from 'react-redux'
import { store } from './store'
import Rotas from './Routes'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import GlobalStyle from './style/main'
import "./style/imports.css"
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvier store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
      <ToastContainer />
    </ReduxProvier>
  </React.StrictMode>,
)
