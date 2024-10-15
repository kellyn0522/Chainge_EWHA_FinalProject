import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { AuthItemContextProvider } from './context/AuthItemContext.jsx';


//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AuthItemContextProvider>
          <App />
        </AuthItemContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)