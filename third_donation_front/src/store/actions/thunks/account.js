import { Axios, Canceler } from '../../../core/axios';
import * as actions from '..';

export const fetchAccount = (walletAddress) => async (dispatch) => {
  dispatch(actions.getAccount.request(Canceler.cancel));
  try {
    const {
      data: { data },
    } = await Axios.post('/users', {
      walletAddress,
    });
    dispatch(actions.getAccount.success(data));
    console.log(data);
  } catch (err) {
    dispatch(actions.getAccount.failure(err));
  }
};
