import {lazy} from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";


const FullLayout = lazy(() => import('./FullLayout.js'))
const Sign_up = lazy(() => import("./Sign_up.js"));
const Login = lazy(() => import("./Login/Login.js"));


const ThemeRoutes = [
    {
            
    }

];


export default ThemeRoutes;
