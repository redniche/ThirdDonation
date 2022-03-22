import { Axios, Canceler } from '../../../core/axios';
import * as actions from '..';
// import api from '../../../core/api';

export const fetchAccount = (walletAddress) => async (dispatch) => {
  dispatch(actions.getAccount.request(Canceler.cancel));
  try {
    const { data } = await Axios.get('http://jsonplaceholder.typicode.com/users', {
      cancelToken: Canceler.token,
      params: { walletAddress },
    });
    const processedData = {
      ...data[0],
      walletAddress: '0xe0124dC7A5e49D8b3065865f0c0feab88C007540',
    };
    dispatch(actions.getAccount.success(processedData));
    // const { data } = await Axios.get(`${api.baseUrl}${api.authors}?${filter}`, {
    //   cancelToken: Canceler.token,
    //   params: {},
    // });
    // dispatch(actions.getAccounts.success(data));
  } catch (err) {
    dispatch(actions.getAccount.failure(err));
  }
};
