import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from "./Redux/configureStore";
import { Provider } from "react-redux";
import Alert from "./assets/Alert/Alert";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Alert />
      <App />
    </Provider>
  </React.StrictMode>
);