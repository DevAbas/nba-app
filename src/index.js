import React from 'react';
import ReactDOM from 'react-dom';
import { firebase } from './firebase';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

const App = (props) => (
  <BrowserRouter>
    <Routes {...props} />
  </BrowserRouter>
)

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(<App user={user} />, document.getElementById('root'));
})

