import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Settings } from '../components/Settings';
import Menu from '../components/Menu';
import { updateLastFMUsername, updatePaymentAmount, togglePaymentEnabled, updatePaymentTerm, getAndPushSongs } from '../actions/actions';


export const SettingsComponent = connect(
  function mapStateToProps(state) {
    return { settings: state.settings };
  },
  function mapDispatchToProps(dispatch) {
    return {
      updateLastFMUsername: (name) => { dispatch(updateLastFMUsername(name)) },
      updatePaymentAmount: (amount) => { dispatch(updatePaymentAmount(amount)) },
      togglePaymentEnabled: () => { dispatch(togglePaymentEnabled()) },
      updatePaymentTerm: (term) => { dispatch(updatePaymentTerm(term)) },
      resetSongs: () => { dispatch(getAndPushSongs('REPLACE_SONGS')) }
    };
  }
)(Settings);

export default class SettingsPage extends Component {

  render() {
    return (
     <div>
      <Menu selected='settings'/>
      <SettingsComponent />
    </div>
    );
  }
}
