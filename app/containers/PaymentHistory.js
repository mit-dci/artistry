import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PaymentHistory } from '../components/PaymentHistory';
import Menu from '../components/Menu';
import { deletePaymentHistory } from '../actions/actions';


export const PaymentComponent = connect(
  function mapStateToProps(state) {
    return { payhistory: state.pay_history };
  },
  function mapDispatchToProps(dispatch) {
    return {
      deletePaymentHistory: () => { dispatch(deletePaymentHistory()) }
    };
  }
)(PaymentHistory);

export default class PaymentsPage extends Component {

  render() {
    return (
     <div>
      <Menu selected='payment_history'/>
      <PaymentComponent />
    </div>
    );
  }
}
