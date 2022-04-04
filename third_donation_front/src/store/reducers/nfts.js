import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import {
  initEntityState,
  entityLoadingStarted,
  entityLoadingSucceeded,
  entityLoadingFailed,
} from '../utils';

export const defaultState = {
  nftPage: initEntityState(0),
  nftBreakdown: initEntityState(null),
  nftDetail: initEntityState(null),
  nftShowcase: initEntityState(null),
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    case getType(actions.getNftBreakdown.request):
      return { ...state, nftBreakdown: entityLoadingStarted(state.nftBreakdown, action.payload) };
    case getType(actions.getNftBreakdown.success): {
      //append existing data with new data
      let payload = state.nftBreakdown.data
        ? [...state.nftBreakdown.data, ...action.payload]
        : action.payload;
      return { ...state, nftBreakdown: entityLoadingSucceeded(state.nftBreakdown, payload) };
    }
    case getType(actions.getNftBreakdown.failure):
      return { ...state, nftBreakdown: entityLoadingFailed(state.nftBreakdown) };

    case getType(actions.getNftDetail.request):
      return { ...state, nftDetail: entityLoadingStarted(state.nftDetail, action.payload) };
    case getType(actions.getNftDetail.success):
      return { ...state, nftDetail: entityLoadingSucceeded(state.nftDetail, action.payload) };
    case getType(actions.getNftDetail.failure):
      return { ...state, nftDetail: entityLoadingFailed(state.nftDetail) };

    case getType(actions.getNftShowcase.request):
      return { ...state, nftShowcase: entityLoadingStarted(state.nftShowcase, action.payload) };
    case getType(actions.getNftShowcase.success):
      return { ...state, nftShowcase: entityLoadingSucceeded(state.nftShowcase, action.payload) };
    case getType(actions.getNftShowcase.failure):
      return { ...state, nftShowcase: entityLoadingFailed(state.nftShowcase) };

    case getType(actions.clearNfts):
      return { ...state, nftBreakdown: initEntityState(null) };

    case getType(actions.clearPage):
      return { ...state, nftPage: initEntityState(0) };

    case getType(actions.increasePage):
      return {
        ...state,
        nftPage: entityLoadingStarted(state.nftPage, ++state.nftPage.data),
      };

    default:
      return state;
  }
};

export default states;