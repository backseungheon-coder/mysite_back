import React from "react";
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme  } from './theme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// const url = 'http://44.203.90.204:8000';

// const url = 'http://127.0.0.1:8000'

// function rducer(state = url, action){
//   if (action.type === 'front'){
//     state = state+'/front';
//     return state
//   }
//   else if (action.type === 'admin'){
//     state = state+'/admin';
//     return state
//   }
//   else{
//     console.log('hi')
//     return state
//   }
// }

// let store = createStore(rducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
    <ThemeProvider theme={theme} >
      
        <App />
  
    </ThemeProvider>
    
);
