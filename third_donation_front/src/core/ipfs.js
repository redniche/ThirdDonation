import axios from 'axios';
import { create } from 'ipfs-http-client';

const apis = {
  https_public: 'https://ipfs.io/ipfs',
  http_local: 'http://j6e207.p.ssafy.io/ipfs',
  ipfs: 'ipfs://',
};

export const Ipfs = create({
  host: 'j6e207.p.ssafy.io',
  port: 5001,
  protocol: 'http',
});

export const IpfsAxios = axios.create({
  baseURL: apis.http_local,
});

export default apis;
