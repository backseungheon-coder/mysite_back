import {lazy} from 'react';
import { Navigate } from 'react-router-dom';

const FullLayout = lazy(() => import('./FullLayout.js'))
const Sign_up = lazy(() => import("./Sign_up.js"));
const Login = lazy(() => import("./Login/Login.js"));


const ThemeRoutes = [
    {
        path: "/",
        element: <FullLayout />,
        childred:[
            {path:"/", element:<Navigate to="FullLayout"/>},
            {path: "/login", element: <Login/>}
        ], 
    }

];


export default ThemeRoutes;
