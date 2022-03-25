import SsafyTokenAbi from '../core/nft/SsafyToken.json';
import SsafyNFTAbi from '../core/nft/SsafyNFT.json';
import ArtToken from '../core/nft/ArtToken.json';
import SaleArtToken from '../core/nft/SaleArtToken.json';

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
    ART_NFT_ABI: ArtToken,
    SALE_FACTORY_ABI: [],
    SALE_ABI: SaleArtToken,
    TOKEN_ABI: SsafyTokenAbi,
  },
};

export default ABI;
