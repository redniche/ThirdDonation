import { Axios, Canceler, setAxiosHeader } from '../../../core/axios';
import * as actions from '..';
import { GetWeb3 } from '../../../contracts';
import auth from '../../../core/auth';

export const fetchAccount = (walletAddress) => async (dispatch) => {
  var web3 = GetWeb3();
  dispatch(actions.getAccount.request(Canceler.cancel));
  try {
    web3.eth.personal.sign(web3.utils.sha3('hello world'), walletAddress, (err, result) => {
      if (!err) {
        Axios.post('/users', {
          walletAddress,
          signature: result,
        })
          .then(({ data: { accessToken, data } }) => {
            auth.setToken(accessToken);

            setAxiosHeader(auth.getToken());
            dispatch(actions.getAccount.success(data));
          })
          .catch((err) => {
            console.log(err);
            dispatch(actions.getAccount.failure(err));
          });
      } else {
        console.log(err);
        dispatch(actions.getAccount.failure(err));
      }
    });
  } catch (err) {
    console.log(err);
    dispatch(actions.getAccount.failure(err));
  }
};
