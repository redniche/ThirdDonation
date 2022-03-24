import Web3 from 'web3';
import ABI from '../common/ABI';

const {
  CONTRACT_ABI: { TOKEN_ABI, NFT_ABI },
} = ABI;

const rpcHttpUrl = 'http://20.196.209.2:8545';

const ssafyTokenContractAddress = '0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333';

export const SSAFY_NFT_CONTRACT_ADDRESS = '0x2526FD5b07F2e6436d9bb5bbD5bc0075DDF6A3fD';

const ssafyTokenProvider = new Web3.providers.HttpProvider(rpcHttpUrl);

export const web3 = new Web3(ssafyTokenProvider);

export const ssafyTokenContract = new web3.eth.Contract(TOKEN_ABI, ssafyTokenContractAddress);

export const SsafyNftContract = new web3.eth.Contract(NFT_ABI, SSAFY_NFT_CONTRACT_ADDRESS);
