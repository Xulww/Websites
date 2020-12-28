import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import { Home } from './components/Home';
import { Department } from './components/Department';
import { Company } from './components/Company';
import { Employee } from './components/Employee';
import { Navigation } from './components/Navigation/Navigation';
import PrivateRoute from './components/Auth/PrivateRoute';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import { AuthProvider } from './components/Auth/Auth';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <div className="container">
          <h3 className="m-3 d-flex justify-content-left">
            Employee Manager System
        </h3>
          <Switch>
            <Route path='/' component={Home} exact />
            <PrivateRoute path='/department' component={Department} />
            <PrivateRoute path='/company' component={Company} />
            <PrivateRoute path='/employee' component={Employee} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
