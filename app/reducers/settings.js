import { UPDATE_PAY_AMOUNT, ENABLE_PAYMENTS, DISABLE_PAYMENTS, UPDATE_LASTFM_USERNAME} from '../actions/settings';

export type settingsStateType = {
  lastfm: {
    username: string
  },
  payments: {
    amount: number,
    enabled: boolean
  }
};

type actionType = {type: string} | {type: string, amount: number} | {type: string, username: string};

const settingsDefault = {
    lastfm: {
        username: ''
    },
    payments: {
        amount: 0.00,
        enabled: false
    }
};


export default function settings(state: settingsStateType = settingsDefault, action: actionType) {

  switch (action.type) {
    case UPDATE_PAY_AMOUNT:
      state.payments.amount = action.amount;
      return state;
    case ENABLE_PAYMENTS:
      state.payments.enabled = true;
      return state;
    case DISABLE_PAYMENTS:
      state.payments.enabled = false;
      return state;
    case UPDATE_LASTFM_USERNAME:
      state.lastfm.username = action.username;
      return state;
    default:
      return state;
  }

}
