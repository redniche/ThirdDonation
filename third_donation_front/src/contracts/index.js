import Web3 from 'web3';
import ABI from '../common/ABI';

const {
  CONTRACT_ABI: { TOKEN_ABI },
} = ABI;

const rpcHttpUrl = 'http://20.196.209.2:8545';

const ssafyTokenContractAddress = '0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333';

const ssafyTokenProvider = new Web3.providers.HttpProvider(rpcHttpUrl);

export const web3 = new Web3(ssafyTokenProvider);

export const ssafyTokenContract = new web3.eth.Contract(TOKEN_ABI, ssafyTokenContractAddress);
