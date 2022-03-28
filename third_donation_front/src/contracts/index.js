import Web3 from 'web3';
import ABI from '../common/ABI';
import { detectCurrentProvider } from '../core/ethereum';

const {
  CONTRACT_ABI: { TOKEN_ABI, NFT_ABI, SALE_ABI },
} = ABI;

const rpcHttpUrl = 'http://20.196.209.2:8545';

const SSAFY_TOKEN_CONTRACT_ADDRESS = '0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333';

export const SSAFY_NFT_CONTRACT_ADDRESS = '0xa060801c3714A2C8B4277866CB0B5310c790e4fB';

export const SALE_NFT_CONTRACT_ADDRESS = '0x3F70A6bb5482BC8BEBF3a1a640f95a24F11399E1';

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

export const saleArtTokenContracts = new web3.eth.Contract(SALE_ABI, SALE_NFT_CONTRACT_ADDRESS);
