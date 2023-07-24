import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Main from './Layout/Main';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Home/Login';
import AuthProvider from './provider/AuthProvider';
import Register from './Pages/Home/Register';
import CollegeCard from './Pages/Home/CollegeCard';
import CollegeDetails from './Pages/Home/CollegeDetails';
import AdmissionPage from './Pages/Home/AdmissionPage';
import MyCollegeForm from './Pages/Home/MyCollegeForm';
import MyCollege from './Pages/Home/MyCollege';
import NotFound from './Pages/Home/Home/NotFound';
import Profile from './Pages/Home/Home/Profile';
import PrivateRoute from './Routes/PrivateRoute';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/colleges",
        element: <CollegeCard></CollegeCard>,
      },
      {
        path: "/colleges/:id",
        element:<PrivateRoute><CollegeDetails></CollegeDetails></PrivateRoute>,
       
      },
      {
        path: "/admission",
        element: <PrivateRoute><AdmissionPage></AdmissionPage></PrivateRoute>,
        
      },
      {
        path: "/myCollegeForm/:id",
        element:<MyCollegeForm></MyCollegeForm>
      },
      {
        path: "/myCollege",
        element:<PrivateRoute><MyCollege></MyCollege></PrivateRoute>,
      },
      {
        path: "/userProfile",
        element:<Profile></Profile>,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </AuthProvider>
);