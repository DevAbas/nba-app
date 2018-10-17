import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './components/Home/Home';

const Routes = () => (
  <Layout>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </Layout>
);

export default Routes;