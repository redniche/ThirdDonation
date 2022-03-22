import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { entityLoadingFailed, entityLoadingStarted } from '../utils';
import { initEntityState, entityLoadingSucceeded } from '../utils';

export const defaultState = {
  account: initEntityState(null),
};

const states = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case getType(actions.getAccount.request): {
      return { ...state, account: entityLoadingStarted(state.account, payload) };
    }
    case getType(actions.getAccount.success): {
      return { ...state, account: entityLoadingSucceeded(state.account, payload) };
    }
    case getType(actions.getAccount.failure): {
      return { ...state, account: entityLoadingFailed(state.account) };
    }
    case getType(actions.clearAccount): {
      return {
        ...state,
        account: initEntityState(null),
      };
    }
    default:
      return state;
  }
};

export default states;
