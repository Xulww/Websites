import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();

const app = (
  <Router history={history}>
    <App />
  </Router>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
