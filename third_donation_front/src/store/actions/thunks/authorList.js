import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';
import api from '../../../core/api';
import apis from './../../../core/axios';
// import { useSelector } from 'react-redux';
// import * as selectors from '../../selectors';

export const fetchAuthorList = (authorId) => async (dispatch) => {
  // await new Promise(() => alert('헬로'));
  dispatch(actions.getAuthorList.request(Canceler.cancel));
  try {
    const {
      data: { data },
    } = await Axios.get(`${apis.users.profile}/${authorId}`, {
      cancelToken: Canceler.token,
      params: {},
    });
    dispatch(actions.getAuthorList.success(data));
  } catch (err) {
    dispatch(actions.getAuthorList.failure(err));
  }
  // }
};

export const fetchAuthorRanking = () => async (dispatch) => {
  dispatch(actions.getAuthorRanking.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.authorsSales}`, {
      cancelToken: Canceler.token,
      params: {},
    });

    dispatch(actions.getAuthorRanking.success(data));
  } catch (err) {
    dispatch(actions.getAuthorRanking.failure(err));
  }
};
