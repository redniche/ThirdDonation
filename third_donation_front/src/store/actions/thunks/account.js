import apis, { Axios, Canceler, setAxiosHeader } from '../../../core/axios';
import * as actions from '..';
import { GetWeb3 } from '../../../contracts';
import auth from '../../../core/auth';

export const fetchAccount = (walletAddress, refresh = false) => {
  return async (dispatch) => {
    dispatch(actions.getAccount.request(Canceler.cancel));
    try {
      if (refresh) {
        Axios.get('/users')
          .then(({ data: { data } }) => {
            data.imagePath = data.imagePath ? `${apis.file}/${data.imagePath}` : null;
            dispatch(actions.getAccount.success(data));
          })
          .catch((err) => {
            console.log(err);
            dispatch(actions.getAccount.failure(err));
          });
      } else {
        const web3 = GetWeb3();
        web3.eth.personal.sign(web3.utils.sha3('hello world'), walletAddress, (err, result) => {
          if (!err) {
            Axios.post('/users', {
              walletAddress: walletAddress,
              signature: result,
            })
              .then(({ data: { accessToken, data } }) => {
                auth.setToken(accessToken);
                data.imagePath = data.imagePath ? `${apis.file}/${data.imagePath}` : null;
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
      }
    } catch (err) {
      console.log(err);
      dispatch(actions.getAccount.failure(err));
    }
  };
};
