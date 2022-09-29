import './Login/scss/style.scss'
import {
  Link,
  BrowserRouter,
  Routes,
  Route,
}from "react-router-dom";


import Login from './Login/Login.js';
import Stepper from './Stepper.js';
import Usage from './Agreement/Usage'
import Personal from './Agreement/Personal'

const FullLayout = (props) => {
  return (
    <div id="loginwrap">
        <div id="right">
            <div className="right">
            <Routes>
                <Route exact="true" path="/Sign_up" element={<Stepper />}/>
                <Route exact="true" path="/" element={<Login   setlogined={props.setlogined}/>}/>
                <Route exact="true" path="/agreement/Usage" element={<Usage   />}/>
                <Route exact="true" path="/agreement/Personal" element={<Personal/>}/>
            </Routes>
            </div>
        </div>
    </div>
  );
};



export default FullLayout;
