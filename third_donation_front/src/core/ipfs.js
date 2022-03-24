import { create } from 'ipfs-http-client';

export const Ipfs = create({
  host: 'j6e207.p.ssafy.io',
  port: 5001,
  protocol: 'http',
});
