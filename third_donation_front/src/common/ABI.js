import SsafyTokenAbi from '../core/nft/SsafyToken.json';
import SsafyNFTAbi from '../core/nft/SsafyNFT.json';
import MintArtTokenAbi from '../core/nft/MintArtTokenAbi.json';
import SaleArtTokenAbi from '../core/nft/SaleArtTokenAbi.json';

/* 
[컨트랙트 ABI]
- 작성한 스마트 컨트랙트의 컴파일 결과로부터 얻은 ABI(in JSON)를 복사하여 붙여넣습니다.
- NFT_ABI: SSAFY NFT 컨트랙트 ABI
- SALE_FACTORY_ABI: SALE Factory 컨트랙트 ABI
- SALE_ABI: SALE 컨트랙트 ABI
*/
const ABI = {
  CONTRACT_ABI: {
    NFT_ABI: SsafyNFTAbi,
    SALE_FACTORY_ABI: [],
    SALE_ABI: SaleArtTokenAbi,
    TOKEN_ABI: SsafyTokenAbi,
    MINT_ABI: MintArtTokenAbi,
  },
};

export default ABI;
