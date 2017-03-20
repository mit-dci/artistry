import { List, Map } from 'immutable';
import update from 'react-addons-update';

const settings_init = {
    'lastfm': {
        'username': 'drmsy'
    },
    'payments': {
        'amount':0.00,
        'enabled':true,
        'term':'THIS_MONTH',
        'min_payment': 0.01,
        'artists_off': List([])
    }
}

export default function settings( settings=settings_init, action) {
    switch (action.type){
        case 'UPDATE_LASTFM_USERNAME':
            return update(settings, {lastfm: { username : {$set: action.username} }});
        case 'UPDATE_PAYMENT_AMOUNT':
            return update(settings, {payments: { amount : {$set: action.amount} }});
        case 'TOGGLE_PAYMENT_ENABLED':
            return update(settings, {payments: { enabled : {$set: !settings.payments.enabled} }});
        case 'UPDATE_PAYMENT_TERM':
            return update(settings, {payments: { term : {$set: action.term} }});
        case 'UPDATE_MIN_PAYMENT':
            return update(settings, {payments: { min_payment : {$set: action.min_payment} }});
        case 'ARTIST_PAYMENT_OFF':
            return update(settings, {payments: { artists_off: {$set: settings.payments.artists_off.filter(e => e != action.mbid)} }});
        case 'ARTIST_PAYMENT_ON':
            return update(settings, {payments: { artists_off: {$set: [...settings.payments.artists_off, action.mbid]} }});
        default:
            return settings;
    }
}
