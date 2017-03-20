import { List, Map } from 'immutable';

const payhistory_init = List([]);
//expect array elements to be dictionaries with { 'timestamp': 123214,
//'payment_term': 'ALL_TIME', 'visible': true, 'total_payment': 5.00,
//'total_plays': 34,
//payments:[{artist, mbid, image, numplays, payment}, {...}, {...}] }

export default function pay_history( pay_history=payhistory_init, action) {
  switch(action.type) {
    case 'ADD_NEW_PAYMENT':
      return [action.payment,
              ...pay_history];
    case 'DELETE_PAY_HISTORY':
      return payhistory_init;
    default:
      return pay_history;
  }
}
