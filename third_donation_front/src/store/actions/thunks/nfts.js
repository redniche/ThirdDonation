import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';
import api from '../../../core/api';
import apis from './../../../core/axios';

export const fetchNftsBreakdown = (userId, isArtist = false, isSell = false, isMusic = false) => {
  return async (dispatch, getState) => {
    //TODO isSell 이 true일 때 다른 동작 필요
    if (isSell) return;
    //access the state
    const state = getState();
    const page = state.NFT.nftPage.data;
    dispatch(actions.getNftBreakdown.request(Canceler.cancel));
    try {
      const {
        data: { data },
      } = await Axios.get(`${apis.nfts.items}/${isMusic ? '/nfts_music.json' : userId}`, {
        cancelToken: Canceler.token,
        params: { page, size: 20, artist: isArtist },
      });
      if (data.length) {
        dispatch(actions.increasePage());
        dispatch(actions.getNftBreakdown.success(data));
        return 0;
      } else {
        console.log('마지막 NFT 입니다.');
        dispatch(actions.getNftBreakdown.failure('마지막 NFT 입니다.'));
        return 1;
      }
    } catch (err) {
      dispatch(actions.getNftBreakdown.failure(err));
      return -1;
    }
  };
};
export const fetchNftShowcase = () => async (dispatch) => {
  dispatch(actions.getNftShowcase.request(Canceler.cancel));

  try {
    const {
      data: { data },
    } = await Axios.get(`${api.baseUrl}${api.nftShowcases}`, {
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
