import Web3 from 'web3';
import ABI from '../common/ABI';

const {
  CONTRACT_ABI: { TOKEN_ABI, NFT_ABI, SALE_ABI },
} = ABI;

const rpcHttpUrl = 'http://20.196.209.2:8545';

export const SSAFY_TOKEN_CONTRACT_ADDRESS = '0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333';

export const SSAFY_NFT_CONTRACT_ADDRESS = '0xA451Abc664c6203596CC7fCf95190CE131B25d86';

export const saleArtTokenContractAddress = '';

const ssafyTokenProvider = new Web3.providers.HttpProvider(rpcHttpUrl);

export const web3 = new Web3(ssafyTokenProvider);

export const ssafyTokenContract = new web3.eth.Contract(TOKEN_ABI, SSAFY_TOKEN_CONTRACT_ADDRESS);

export const ssafyNftContract = new web3.eth.Contract(NFT_ABI, SSAFY_NFT_CONTRACT_ADDRESS);

export const saleArtTokenContracts = new web3.eth.Contract(SALE_ABI, saleArtTokenContractAddress);
