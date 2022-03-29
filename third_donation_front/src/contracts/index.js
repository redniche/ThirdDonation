import Web3 from 'web3';
import ABI from '../common/ABI';
import { detectCurrentProvider } from '../core/ethereum';

const {
  CONTRACT_ABI: { TOKEN_ABI, NFT_ABI, SALE_ABI },
} = ABI;

const rpcHttpUrl = 'http://20.196.209.2:8545';

const SSAFY_TOKEN_CONTRACT_ADDRESS = '0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333';

export const SSAFY_NFT_CONTRACT_ADDRESS = '0x1a2E44A719a9b6827A54A06720c8d9D103DE6401';

export const SALE_NFT_CONTRACT_ADDRESS = '0x6f4377f0D0F7C2F8223c0d384Ca882b86d17D8ca';

const ssafyTokenProvider = new Web3.providers.HttpProvider(rpcHttpUrl);

export const web3 = new Web3(ssafyTokenProvider);

export const GetWeb3 = () => {
  const provider = detectCurrentProvider();
  return new Web3(provider);
};

export const ssafyTokenContract = new web3.eth.Contract(TOKEN_ABI, SSAFY_TOKEN_CONTRACT_ADDRESS);

export const getSsafyNftContract = () => {
  return new GetWeb3().eth.Contract(NFT_ABI, SSAFY_NFT_CONTRACT_ADDRESS);
};

export const getSsafyNftContract2 = (provider) => {
  const web3 = new Web3(provider);
  return new web3.eth.Contract(NFT_ABI, SSAFY_NFT_CONTRACT_ADDRESS);
};
