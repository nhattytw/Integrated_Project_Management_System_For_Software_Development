import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/login/login";
import RegistrationPage from "./pages/Registration/Registration";
import ForgotPassword from "./pages/Landing/forgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import {
  ContextProvider,
  AssignmentContext,
  AssignmentContextProvider,
} from "./Context/context";
import About from "./pages/Landing/About";
import Contact from "./pages/Landing/Contact";
import Terms from "./pages/Registration/Terms";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = new createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/Registration",
    element: <RegistrationPage />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Contact",
    element: <Contact />,
  },
  {
    path: "/forgetpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/Terms",
    element: <Terms />,
  },
]);
root.render(
  <React.StrictMode>
    <ContextProvider>
     
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
