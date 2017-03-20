// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ArtistPayment from './containers/ArtistPayment';
import ListeningHistory from './containers/SongList';
import PaymentsPage from './containers/PaymentHistory';
import SettingsPage from './containers/Settings';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ArtistPayment} />
    <Route path="/settings" component={SettingsPage} />
    <Route path="/listening_history" component={ListeningHistory} />
    <Route path="/payment_history" component={PaymentsPage} />
  </Route>
);
