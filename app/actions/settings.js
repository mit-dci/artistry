// @flow
import type { settingsStateType } from '../reducers/settings';

export const UPDATE_PAY_AMOUNT = 'UPDATE_PAY_AMOUNT';
export const ENABLE_PAYMENTS = 'ENABLE_PAYMENTS';
export const DISABLE_PAYMENTS = 'DISABLE_PAYMENTS';
export const UPDATE_LASTFM_USERNAME = 'UPDATE_LASTFM_USERNAME';

export function change_payment_amount(amount: number) {
  dispatch({type: UPDATE_PAY_AMOUNT, amount: amount});
}

export function enable_payment() {
  dispatch({type: ENABLE_PAYMENTS});
}

export function disable_payment() {
  dispatch({type: DISABLE_PAYMENTS});
}

export function change_lastfm_username(username: string) {
  dispatch({type: UPDATE_LASTFM_USERNAME, username: username});
}


/* examples for more complex logic

export function increment(){
    return { type: INCREMENT_COUNTER };
}

export function incrementIfOdd() {
  return (dispatch: () => void, getState: () => counterStateType) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: () => void) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
*/
