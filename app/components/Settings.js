import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Settings.css';


export class Settings extends Component {
  render() {
    const { settings, updateLastFMUsername, updatePaymentAmount, togglePaymentEnabled, updatePaymentTerm, resetSongs } = this.props;

    function updatePayment(refs, default_amount){
        const regex  = /^(\$)?\d+(?:\.\d{2})?$/;

        let dollars = refs.myDollarInput.value;

        if (!regex.test(dollars)){
            alert("Please enter a valid dollar amount");
            refs.myDollarInput.value = default_amount;
        }else{
            console.log('calling update payments with $' + dollars);
            updatePaymentAmount(refs.myDollarInput.value);
        }
    }

    function termSelect(e){
        updatePaymentTerm(e.target.value);
    }

    return (
        <div className={styles.container}>
        <div className={styles.wrapper}>
        LastFM Username:
        <input type="text"
        ref = "myTextInput"
        defaultValue = {settings.lastfm.username} />
        <button onClick={() => { updateLastFMUsername(this.refs.myTextInput.value); }}> Update Username </button>

        <br/>
        <br/>

        $<input type="number"
        ref = "myDollarInput"
        defaultValue = {settings.payments.amount} />
        <button onClick={() => { updatePayment(this.refs, settings.payments.amount); }}> Update Payment Amount </button>

        <br/>
        <br/>

        <input type="checkbox" checked = {settings.payments.enabled} onChange={() => { togglePaymentEnabled(); }}/>
        Enable Automatic Monthly Payments of ${settings.payments.amount}?

        <br/>
        <br/>

        Select Payment Term (pay the artists you've listened to based on plays from):
        <br/>

        <input type="radio" name="payment_term"
        value="THIS_MONTH" defaultChecked={settings.payments.term === "THIS_MONTH"}
        onClick={(event) => { updatePaymentTerm(event.target.value); }}
        /><span className={styles.pay_radio}>this month </span>
        <input type="radio" name="payment_term"
        value="ALL_TIME" defaultChecked={settings.payments.term === "ALL_TIME"}
        onClick={(event) => { updatePaymentTerm(event.target.value); }}
        /><span className={styles.pay_radio}>all time </span>
        <input type="radio" name="payment_term"
        value="LAST_PAYMENT" defaultChecked={settings.payments.term === "LAST_PAYMENT"}
        onClick={(event) => { updatePaymentTerm(event.target.value); }}
        /><span className={styles.pay_radio}>since last payment </span>

        <br/>
        <br/>

        <button onClick={() => { resetSongs(); }}> Reset Songs </button>
        <i>  Warning: this wipes your song history and re-downloads it from scratch. It will delete anything you've modified.</i>

        <br/>
        <br/>

        <hr/>
        </div>
        </div>
    );
  }
}

