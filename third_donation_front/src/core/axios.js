import axios from 'axios';

export const API_URL = 'https://j6e207.p.ssafy.io/api';
export const API_TIME_SOURCE = 'https://worldtimeapi.org/api/timezone/Asia/Seoul';
export const Axios = axios.create({
  baseURL: API_URL,
});
export const Canceler = axios.CancelToken.source();

const nft_base = '/nfts';
const user_base = '/users';
const nft_sale_base = '/nfts/exchange';

const apis = {
  nfts: {
    items: `${nft_base}/items`,
    list: `${nft_base}/nft`,
    sales: `${nft_base}/sales`,
    saleList: `${nft_sale_base}/sales`,
  },
  users: {
    user: `${user_base}`,
    img: `${user_base}/img`,
    profile: `${user_base}/profile`,
  },
};

export default apis;
