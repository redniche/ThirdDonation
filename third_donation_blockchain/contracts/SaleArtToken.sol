// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SsafyNFT.sol";

contract SaleArtToken {
    SsafyNFT public mintArtTokenAddress;

    // MintArtToken 스마트 컨트랙트 주소값으로 생성
    constructor(address _mintArtTokenAddress){
        mintArtTokenAddress = SsafyNFT(_mintArtTokenAddress);
    }

    mapping(uint256 => uint256) public artTokenPrices;

    // 판매중인 토큰을 담는 배열
    uint256[] public onSaleArtTokkenArray;

    // 작품 판매 등록
    function setForSaleArtToken(uint256 _artTokenId, uint256 _price) public{
        // 해당 작품의 소유자 주소
        address artTokenOwner = mintArtTokenAddress.ownerOf(_artTokenId);
        
        require(artTokenOwner == msg.sender, "Caller is not art token owner.");
        require(_price > 0, "Price is zero or lower.");
        // 해당 작품이 판매중이 아닐 때
        require(artTokenPrices[_artTokenId] == 0, "This art token is already on sale");
        // artTokenOwner가 판매 스마트 컨트랙트(address(this))에 권한을 넘겼는지 확인
        require(mintArtTokenAddress.isApprovedForAll(artTokenOwner, address(this)),"Art token owner did not approve token");
        
        artTokenPrices[_artTokenId] = _price;

        onSaleArtTokkenArray.push(_artTokenId);
    }

    // 작품 구매
    function purchaseArtToken(uint256 _artTokenId) public payable{
        uint256 price = artTokenPrices[_artTokenId];
        address artTokenOwner = mintArtTokenAddress.ownerOf(_artTokenId);

        require(price > 0, "Art Token is not sale.");
        require(price <= msg.value, "Caller sent lower than price.");
        require(artTokenOwner != msg.sender, "Caller is art token owner.");

        payable(artTokenOwner).transfer(msg.value);
        mintArtTokenAddress.safeTransferFrom(artTokenOwner, msg.sender, _artTokenId);

        artTokenPrices[_artTokenId] = 0;

        for(uint256 i = 0; i < onSaleArtTokkenArray.length; i++){
            if(artTokenPrices[onSaleArtTokkenArray[i]] == 0){
                onSaleArtTokkenArray[i] = onSaleArtTokkenArray[onSaleArtTokkenArray.length-1];
                onSaleArtTokkenArray.pop();
            }

        }
    }

    // 판매 중인 작품 배열의 길이 출력
    function getOnSaleArtTokenArrayLength() view public returns (uint256) {
        return onSaleArtTokkenArray.length;
    }

    function getArtTokenPrice(uint256 _artTokenId) view public returns (uint256){
        return artTokenPrices[_artTokenId];
    }

}