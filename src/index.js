import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { store } from "./Redux/configureStore";
import { Provider } from "react-redux";
import Alert from "./assets/Alert/Alert";
import axios from 'axios'

const setupAxios = () => {

  axios.defaults.baseURL = 'https://test-bk-api.vercel.app';
  // axios.defaults.baseURL = 'http://localhost:8080';
  axios.defaults.headers = {
    'authorization': `${localStorage.getItem('token')}`
  };
};

setupAxios();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Alert />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  //</React.StrictMode>
);