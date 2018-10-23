import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';

import Home from './components/Home/Home';
import NewsArticle from './components/Articles/News/Post/'



const Routes = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/articles/:id" exact component={NewsArticle} />
    </Switch>
  </Layout>
);

export default Routes;