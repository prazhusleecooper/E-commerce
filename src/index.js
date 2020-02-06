import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './resources/CSS/index.css';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from "./reducers";

const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>,
  document.getElementById('root')
);
