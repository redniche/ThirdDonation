import axios from 'axios';
import { create } from 'ipfs-http-client';

const ipfs_apis = {
  https_public: 'https://ipfs.io/ipfs',
  https_local: 'https://j6e207.p.ssafy.io/ipfs',
  ipfs: 'ipfs://',
};

export const Ipfs = create({
  host: 'j6e207.p.ssafy.io',
  port: '/addipfs/api/v0',
  protocol: 'https',
});

export const IpfsAxios = axios.create({
  baseURL: ipfs_apis.https_local,
});

export const convertIpfsToHttps = (ipfsLink) => {
  if (typeof ipfsLink == 'string') {
    return ipfsLink.replace(ipfs_apis.ipfs, ipfs_apis.https_local + '/');
  }
  //문자열이 아니면 null 반환
};

export default ipfs_apis;
