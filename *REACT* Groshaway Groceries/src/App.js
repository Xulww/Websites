import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import Company from './containers/Company/Company';
import Orders from './containers/Orders/Orders';
import Kaufland from './containers/Kaufland/Kaufland';
import Lidl from './containers/Lidl/Lidl';
import Billa from './containers/Billa/Billa';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { UserProvider } from './Context/UserContext';

function App() {
  return (
    <div>
    <UserProvider>
        <Layout>
          <Switch>
              <Route path="/" exact component={Company}/>
              <Route path="/kaufland" component={Kaufland}/>
              <Route path="/lidl" component={Lidl}/>
              <Route path="/billa" component={Billa}/>
              <Route path="/orders" component={Orders}/>
              <Route path="/auth" component={Auth}/>
              <Route path="/logout" component={Logout}/>
          </Switch>
        </Layout>
      </UserProvider>
    </div>
  );
}

export default App;
