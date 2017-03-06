// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import Menu from '../components/Menu';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SettingsActions from '../actions/settings';

/*
function mapStateToProps(state) {
  return {
    username: state.lastfm.username,
    enabled: state.payments.enabled,
    amount: state.payments.amount
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SettingsActions, dispatch);
}

class HomePage extends Component {

  props: {
      change_payment_amount: (amount) => void,
    enable_payment: () => void,
    disable_payment: () => void,
    change_lastfm_username: (username) => void,
    username: string
  };

  render() {
    return (
     <div>
      <Menu selected='home'/>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
*/

export default class HomePage extends Component {

  render() {
    return (
     <div>
      <Menu selected='home'/>
      <Home />
    </div>
    );
  }
}
