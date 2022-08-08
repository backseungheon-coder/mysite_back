import React from "react";
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme  } from './theme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const url = 'https://api.nestates.shop';

function rducer(state = url, action){
  return state
}

let store = createStore(rducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <ThemeProvider theme={theme} >
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>

);
