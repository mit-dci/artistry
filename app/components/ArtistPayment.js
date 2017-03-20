import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './ArtistPayment.css';


export function ArtistPayItem(props) {
  const { artistpayment, settings } = props;

    if ( settings.payments.artists_off.indexOf(artistpayment.mbid) < 0)
        return (<div>
            <div className={styles.songlist_songname}> {artistpayment.artist}: </div>
            <div className={styles.songlist_artist}> $ {artistpayment.payment.toFixed(2)} </div>
            for <div className={styles.songlist_artist}> {artistpayment.num_plays} </div> song(s)
            </div>
        );
    else return (<strike><div>
            {artistpayment.artist}:
            $ {artistpayment.payment.toFixed(2)} for {artistpayment.num_plays} song(s)
            </div></strike>
        );
}



export class ArtistPay extends Component {
  render() {
    const { song_history, settings, payhistory, addPaymentToHistory, deletePaymentHistory, updateMinPayment, toggleArtistPayment, updatePaymentAmount } = this.props;

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

    function updateMinPaymentCheck(refs, default_amount){
        const regex  = /^(\$)?\d+(?:\.\d{2})?$/;

        let dollars = refs.myMinDollarInput.value;

        if (!regex.test(dollars)){
            alert("Please enter a valid dollar amount");
            refs.myMinDollarInput.value = default_amount;
        }else{
            console.log('calling update payments with $' + dollars);
            updateMinPayment(refs.myMinDollarInput.value);
        }
    }

    function getArtistPlays(timestamp=0) {
    //get a list of artists with numbers of plays since timestamp, sorted from
    //most to fewest plays as an object of {mbid, artist, image_link, num_plays}
        console.log('getArtistPlays called with ' + timestamp);

        if (song_history.size == 0 || song_history.length == 0) {
            return [];
        }

        let return_obj = {};

        for (let i = 0; i < song_history.length; i++) {
            if (song_history[i].timestamp >= timestamp && !song_history[i].isRemoved){
                let key = song_history[i].mbid;
                if (key in return_obj) {
                    return_obj[key]['num_plays'] += 1;
                } else {
                    return_obj[key] = {'num_plays': 1, 'artist': song_history[i].artist, 'image': song_history[i].image };
                }
            }

        }

        let sorted_array = [];
        for(let key in return_obj){

            let push_obj = return_obj[key];
            push_obj['mbid'] = key;

            sorted_array.push(push_obj);
        }

        return sorted_array.sort(function(a,b){return b['num_plays']-a['num_plays'];});

    }


    function getArtistPlaysForPaymentPeriod(){
    //get the right timestamp based on payment term (from settings) and call
    //getArtistPlays with it

        const getMostRecentPaymentTimestamp = () => { //get largest timestamp + 1

            if (payhistory.length > 0){
                return Math.max.apply(Math, payhistory.map(payment => {return payment.timestamp;})) + 1;
            }

            return 0;
        };


        let timestamp = 0;

        switch (settings.payments.term){
            case 'THIS_MONTH':
                timestamp = Math.floor(Date.now() / 1000) - (30*24*60*60);
                break;
            case 'ALL_TIME':
                timestamp = 0;
                break;
            case 'LAST_PAYMENT':
                timestamp = getMostRecentPaymentTimestamp();
                break;
        }

        return getArtistPlays(timestamp);
    }

    function splitPaymentByPlays(sorted_array, min_payment=0.01){
    //divide money between artists by # enabled plays, as long as they get
    //min_payment.  Expects sorted_array from getArtistPlays
        console.log(settings.payments);
        if (sorted_array.length == 0 || settings.payments.amount == 0) {
            return [];
        }

        let totalsongs = 0;
        let maxindex = 0;

        while (maxindex < sorted_array.length &&
            ((settings.payments.amount/(totalsongs+sorted_array[maxindex].num_plays)) * sorted_array[maxindex].num_plays) >= min_payment){

            if (settings.payments.artists_off.indexOf(sorted_array[maxindex].mbid) < 0){
                totalsongs += sorted_array[maxindex].num_plays;
            }

            console.log(maxindex + ': cost_per_song:' + Math.floor(settings.payments.amount/totalsongs*100)/100 + ' #songs:' + sorted_array[maxindex].num_plays);

            maxindex += 1;
        }

        let return_array = sorted_array.slice(0,maxindex);

        //for real money we need to floor this to the nearest cent, for BTC we
        //won't need the floor operations and it will come out exactly to the
        //payment amount.
        const cost_per_song = (Math.floor( (settings.payments.amount / totalsongs) * 100) / 100);

        for (let i = 0; i < return_array.length; i++){
            if (settings.payments.artists_off.indexOf(return_array[i].mbid) < 0){
                return_array[i]['payment'] =  cost_per_song * return_array[i].num_plays;
            } else{
                return_array[i]['payment'] =  0.00;
            }
        }

        //for real money, we will likely have a lot of cents left over
        //depending on what the true cost per song comes out to be.  Distribute
        //these to the top artists:
        let extraCents = Math.round((settings.payments.amount - totalsongs*cost_per_song)*100);
        let i = 0;
        while (extraCents > 0){
            if (settings.payments.artists_off.indexOf(return_array[i].mbid) < 0){
                return_array[i]['payment'] += 0.01;
                extraCents--;
            }
            i = (i+1) % return_array.length;
        }


        console.log(totalsongs + ' songs at $' + cost_per_song + ' each, $' + totalsongs*cost_per_song + ' total.');
        console.log(return_array.reduce((a,b) => a + b['payment'], 0.00));
        console.log(return_array.reduce((a,b) => a + b['num_plays'], 0));
        return return_array;


    }

    return (
    <div className={styles.container}>
    <div className={styles.wrapper}>
        PAYMENTS:
        <br/>
        <br/>

        $<input type="number"
        ref = "myDollarInput"
        defaultValue = {settings.payments.amount} />
        <button onClick={() => { updatePayment(this.refs, settings.payments.amount); }}> Update Payment Amount </button>

        <br/>

        $<input type="number"
        ref = "myMinDollarInput"
        defaultValue = {settings.payments.min_payment} />
        <button onClick={() => { updateMinPaymentCheck(this.refs, settings.payments.min_payment); }}> Update Minimum Payment Amount </button>

        <br/>
        <br/>

        <button onClick={() => {addPaymentToHistory( splitPaymentByPlays(getArtistPlaysForPaymentPeriod(), settings.payments.min_payment));} }> Pay </button>
        <button onClick={() => {deletePaymentHistory();} }> Delete Payment History </button>

        <br/>
        <br/>

        Top Artists to Pay:

      <div className={styles.innerwrapper}>
        <ul className={styles.songlist_list}>
            {splitPaymentByPlays(getArtistPlaysForPaymentPeriod(), settings.payments.min_payment).map(artistpayment => (
            <li key={artistpayment.mbid}
                onClick={() => { toggleArtistPayment(artistpayment.mbid);}}
                className={styles.songlist_item}>
                <ArtistPayItem artistpayment={artistpayment} settings={settings} />
            </li>
            ))}
        </ul>

        </div>
        <hr/>
        </div>
        </div>
    );
  }
}

