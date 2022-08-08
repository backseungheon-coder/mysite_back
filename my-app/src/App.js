import React, { useState,useRef } from "react";
import styled, { createGlobalStyle } from "styled-components"
import Main from "./Admin_user/Main"
import Main_front from "./Front/Main_front"
import Login from "./Login/Login.js"
import storage from "redux-persist/lib/storage";
import { HTML5Backend } from 'react-dnd-html5-backend'
import './App.css';
const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, menu, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    main, menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, main, menu, nav, section {
      display: block;
    }
    /* HTML5 hidden-attribute fix for newer browsers */
    *[hidden] {
        display: none;
    }
    body {
      ${props => props.theme.bgColor};
      color:${props => props.theme.textColor};
      font-family:'Source Sans Pro', sans-serif;
      line-height: 1;
    }
    *{
      box-sizing: border-box;
    }
    a{
      text-decoration: none;
      color:inherit;
    }
    menu, ol, ul {
      list-style: none;
    }
    blockquote, q {
      quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
`


function App() {
  const [islogined,setlogined] = useState(window.localStorage.getItem('key'))

  if (islogined == null){
    
    return (
      // <Login/>
      <>
        <Login setlogined={setlogined}/>
      </>
    );
  }

  else{
    if (window.localStorage.getItem('level') == '0'){
     
    return (
      // <Login/>
      
      <>
         <Main backend={HTML5Backend}/>
      </>
    );
    }
    else{
    
      return (
        <>
           <Main_front/>
        </>
      );

    }
  }
  


}

export default App;
