import { create } from 'ipfs-http-client';

export const Ipfs = create({
  host: 'j6e207.p.ssafy.io',
  port: 5001,
  protocol: 'http',
});

const apis = {
  https_public: 'https://ipfs.io/ipfs',
  http_local: 'http://j6e207.p.ssafy.io:8080',
  ipfs: 'ipfs://',
};

export default apis;
