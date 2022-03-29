import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';
import api from '../../../core/api';

// export const fetchNftsBreakdown = (authorId, isMusic = false) => {
export const fetchNftsBreakdown = (authorId) => {
  return async (dispatch, getState) => {
    //access the state
    const state = getState();
    console.log(state);

    dispatch(actions.getNftBreakdown.request(Canceler.cancel));

    try {
      let filter = authorId ? 'author=' + authorId : '';
      // let music = isMusic ? 'category=music' : '';

      const { data } = await Axios.get(
        // `${api.baseUrl}${isMusic ? '/nfts_music.json' : api.nfts}?${filter}&${music}`,
        `${api.baseUrl}${api.nfts}?${filter}`,
        {
          cancelToken: Canceler.token,
          params: {},
        },
      );

      console.log(data);

      dispatch(actions.getNftBreakdown.success(data));
    } catch (err) {
      dispatch(actions.getNftBreakdown.failure(err));
    }
  };
};
export const fetchNftShowcase = () => async (dispatch) => {
  dispatch(actions.getNftShowcase.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.nftShowcases}`, {
      cancelToken: Canceler.token,
      params: {},
    });

    dispatch(actions.getNftShowcase.success(data));
  } catch (err) {
    dispatch(actions.getNftShowcase.failure(err));
  }
};

export const fetchNftDetail = (nftId) => async (dispatch) => {
  dispatch(actions.getNftDetail.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.nfts}/${nftId}`, {
      cancelToken: Canceler.token,
      params: {},
    });

    dispatch(actions.getNftDetail.success(data));
  } catch (err) {
    dispatch(actions.getNftDetail.failure(err));
  }
};
