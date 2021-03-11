import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/store';
import axios from 'axios';
import ErrorBoundary from './components/ErrorBoundary';
import { host } from './credentials/credentials';

axios.defaults.baseURL = host + '/';


ReactDOM.render(<Provider store={store} ><ErrorBoundary><App /></ErrorBoundary></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
