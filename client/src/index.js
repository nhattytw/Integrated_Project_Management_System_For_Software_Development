import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route,RouterProvider, createBrowserRouter } from "react-router-dom";
import  LoginPage from './login/login';
import RegistrationPage from './Registration/Registration';
import { NavBar } from './nav/nav';
import Landing  from './LandingBody/landingpage';
const root = ReactDOM.createRoot(document.getElementById('root'));

const router = new createBrowserRouter([{
  path:'/',
  element:<App />
},
{
  path:'/login',
  element:<LoginPage />
},
{
  path:'/Registration',
  element:<RegistrationPage />
}
])
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
