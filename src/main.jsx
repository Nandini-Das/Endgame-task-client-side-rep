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
import UpdateUser from './Pages/Home/Home/updateUser';


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
        element:<CollegeDetails></CollegeDetails>,
       
      },
      {
        path: "/admission",
        element: <AdmissionPage></AdmissionPage>,
        
      },
      {
        path: "/myCollegeForm/:id",
        element:<MyCollegeForm></MyCollegeForm>,
      },
      {
        path: "/myCollege",
        element:<MyCollege></MyCollege>,
      },
      {
        path: "/userProfile",
        element:<Profile></Profile>,
      },
      {
        path: "/updateUser",
        element:<UpdateUser></UpdateUser>,
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