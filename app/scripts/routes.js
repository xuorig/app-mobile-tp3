import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import App from './pages/app.jsx';
import Home from './pages/home.jsx';
import Info from './pages/info.jsx';
import Match from './pages/match.jsx';
import Bet from './pages/bet.jsx';

import NotFound from './pages/notFound.jsx';

const historyOptions = {
  queryKey : false
};

const routes = (
  <Router history={createHistory(historyOptions)}>
    <Route path='/' component={ App }>
      <IndexRoute component={ Home }/>
      <Route path='info' component={ Info } />
      <Route path='home' component={ Home } />
      <Route path='match/:id' component={ Match } />
      <Route path='match/:id/bet' component={ Bet } />
      <Route path='*' component={NotFound}/>
    </Route>
  </Router>
);

export default routes;
