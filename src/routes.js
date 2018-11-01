import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';

import Home from './components/Home/Home';
import NewsArticle from './components/Articles/News/Post/'
import VideosArticle from './components/Articles/Videos/Post/';
import NewsMain from './components/Articles/News/Main/';
import VideosMain from './components/Articles/Videos/Main/';
import SignIn from './components/SignIn/SignIn';


const Routes = (props) => {
  return (
    <Layout user={props.user}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/articles/:id" exact component={NewsArticle} />
        <Route path="/videos/:id" exact component={VideosArticle} />
        <Route path="/news" exact component={NewsMain} />
        <Route path="/videos" exact component={VideosMain} />
        <Route path="/sign-in" exact component={SignIn} />
      </Switch>
    </Layout>
  )
};

export default Routes;