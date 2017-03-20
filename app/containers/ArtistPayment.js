import React, { Component } from 'react';
import Menu from '../components/Menu';
import { ArtistPay } from '../components/ArtistPayment';
import { connect } from 'react-redux';
import { addPaymentToHistory, deletePaymentHistory, updateMinPayment, toggleArtistPayment, updatePaymentAmount } from '../actions/actions';


const ArtistPaymentComponent = connect(
  function mapStateToProps(state) {
    return { song_history: state.song_list,
             settings: state.settings,
             payhistory: state.pay_history };
  },
  function mapDispatchToProps(dispatch) {
    return {
      addPaymentToHistory: (payment_array) => { dispatch(addPaymentToHistory(payment_array)) },
      deletePaymentHistory: () => { dispatch(deletePaymentHistory()) },
      updateMinPayment: (min_payment) => { dispatch(updateMinPayment(min_payment)) },
      toggleArtistPayment: (mbid) => { dispatch(toggleArtistPayment(mbid)) },
      updatePaymentAmount: (amount) => { dispatch(updatePaymentAmount(amount)) }
    };
  }
)(ArtistPay);


export default class ArtistPayment extends Component {

  render() {
    return (
     <div>
      <Menu selected='home'/>
      <ArtistPaymentComponent />
    </div>
    );
  }
}
