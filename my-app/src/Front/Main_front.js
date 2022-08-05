import '../App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Typography from '@mui/material/Typography';
import Containerr from '@mui/material/Container';
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
  }from "react-router-dom";
import Store from "./Store/Store"
import Agency from "./Agency/Agency"
import Notice from "./Notice/Notice"
import FAQ from "./FAQ_front/FAQ"
import Box from '@mui/material/Box';
import Login_menu from './Login_menu'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import './navsytle.scss'
import Dash from './Dash/Dash.js';


function Main(props) {





    return (
      <>
        <BrowserRouter>
  <div>
  <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" sx={{backgroundColor:'#ffffff',height:'65px'}}>
        <Toolbar variant="dense" id='toolbar' >
          <div id="barcon">
            <div id="logo_box">
              <NavLink exact="true" to="/dash">
                <Typography variant="h6" color="black" component="div">
                <img src={ require('../img/logo.png') }  width='70'height='50'/>
                </Typography>
              </NavLink>
             
            </div>
           
              <div className="nav_container" >
                
                <NavLink  exact="true" to="/store" style={({ isActive }) => ({backgroundColor:'#ffffff',color:'black',borderBottom: isActive ? '4px solid black' : '4px solid #0D99FF',fontWeight: isActive ? 'bold' : ''})}>
                       가맹점관리
                </NavLink>

                <NavLink exact="true" to="/agency" style={({ isActive }) => ({ backgroundColor:'#ffffff',color:'black',borderBottom: isActive ? '4px solid black' : '4px solid #0D99FF',fontWeight: isActive ? 'bold' : ''})}>
                    대리점관리
                  </NavLink>



                  <NavLink exact="true" to="/notice" style={({ isActive }) => ({ backgroundColor:'#ffffff',color:'black',borderBottom: isActive ? '4px solid black' : '4px solid #0D99FF',fontWeight: isActive ? 'bold' : ''})}>         
                      공지사항
                  </NavLink>

                <NavLink exact="true" to="/faq" style={({ isActive }) => ({backgroundColor:'#ffffff',color:'black',borderBottom: isActive ? '4px solid black' : '4px solid #0D99FF',fontWeight: isActive ? 'bold' : ''})}> 
                    FAQ
                </NavLink>
          
            </div>
          </div>
            <Login_menu/>
          </Toolbar>
      </AppBar>

    </Box>


   


  </div>
  <div style={{backgroundColor:'white', height:'100vh', display:'flex',flexDirection:'column' }} >
  
    <Containerr root='false' maxWidth='false' sx={{flex:'10',width:'100%',margin:'0px',padding:'0px !important' }} >
      
      <Routes >
      <Route  exact="true" path="/dash" element={<Dash />} />
        <Route  exact="true" path="/store" element={<Store />} />
        <Route  exact="true" path="/agency"  element={<Agency />}/>
        <Route  exact="true" path="/notice" element={<Notice/>} />
        <Route  exact="true" path="/faq" element={<FAQ/>}/>
      </Routes>


    </Containerr>
    
      <footer style={{flex:'1',backgroundColor:'#F3F3F3'}}>
        <hr></hr>
        <div className="text-center p-3" >
        Copyright ©2021 네스타
        테스트용 메시지: 프론트 계정으로 로그인 되었습니다.
        </div>
      </footer>
    </div>
    
    </BrowserRouter>
  
        </>
    );
  }
  
  export default Main;
  