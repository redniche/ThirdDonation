// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SsafyNFT.sol";
import "./SsafyToken.sol";

contract SaleArtToken {
    SsafyNFT public mintArtTokenAddress;
    SsafyToken public ssafyTokenAddress;

    // MintArtToken 스마트 컨트랙트 주소값으로 생성
    constructor(address _mintArtTokenAddress, address _ssafyTokenAddress){
        mintArtTokenAddress = SsafyNFT(_mintArtTokenAddress);
        ssafyTokenAddress = SsafyToken(_ssafyTokenAddress);
    }

    mapping(uint256 => uint256) public artTokenPrices;

    // 판매중인 토큰을 담는 배열
    uint256[] public onSaleArtTokkenArray;

    // 작품 판매 등록
    function setForSaleArtToken(uint256 _artTokenId, uint256 _price) public{
        // 해당 작품의 소유자 주소
        address artTokenOwner = mintArtTokenAddress.ownerOf(_artTokenId);
        
        require(artTokenOwner == msg.sender, "Caller is not art token owner.");
        require(_price >= 100, "Price must be at least 100.");
        // 해당 작품이 판매중이 아닐 때
        require(artTokenPrices[_artTokenId] == 0, "This art token is already on sale");
        // artTokenOwner가 판매 스마트 컨트랙트(address(this))에 권한을 넘겼는지 확인
        require(mintArtTokenAddress.isApprovedForAll(artTokenOwner, address(this)),"Art token owner did not approve token");
        
        artTokenPrices[_artTokenId] = _price;

        onSaleArtTokkenArray.push(_artTokenId);
    }

    // 작품 판매 중지
    function cancelSaleArtToken(uint256 _artTokenId) public {
        // 해당 작품의 소유자 주소
        address artTokenOwner = mintArtTokenAddress.ownerOf(_artTokenId);

        require(artTokenOwner == msg.sender, "Caller is not art token owner.");

        artTokenPrices[_artTokenId] = 0;

        for(uint256 i = 0; i < onSaleArtTokkenArray.length; i++){
            if(artTokenPrices[onSaleArtTokkenArray[i]] == 0){
                onSaleArtTokkenArray[i] = onSaleArtTokkenArray[onSaleArtTokkenArray.length-1];
                onSaleArtTokkenArray.pop();
            }

        }

    } 

    // 작품 구매
    function purchaseArtToken(uint256 _artTokenId, address sender, address charity) public {
        uint256 price = artTokenPrices[_artTokenId];
        address artTokenOwner = mintArtTokenAddress.ownerOf(_artTokenId);

        require(price > 0, "Art Token is not sale.");
        // require(price <= msg.value, "Caller sent lower than price.");
        require(artTokenOwner != msg.sender, "Caller is art token owner.");

        uint256 balance = ssafyTokenAddress.balanceOf(sender);
        require(price<balance, "Caller sent lower than price");

        bool ischarity = mintArtTokenAddress.getCharity(charity);
        require(ischarity, "Charity is not registed");

        address tokenArtist = mintArtTokenAddress.getTokenArtistAddress(_artTokenId);
        address contractOwner = getContractOwner();
        ssafyTokenAddress.transferFrom(sender, artTokenOwner, price * 90 / 100); // 토큰 소유자에게 금액 전송
        ssafyTokenAddress.transferFrom(sender, tokenArtist, price * 6 / 100); // 토큰 민팅한 예술가에게 금액 전송
        ssafyTokenAddress.transferFrom(sender, charity, price * 2 / 100); // 기부단체에게 금액 전송
        ssafyTokenAddress.transferFrom(sender, contractOwner, price * 2 / 100); // 컨트랙트 소유자에게 금액 전송

        mintArtTokenAddress.safeTransferFrom(artTokenOwner, msg.sender, _artTokenId);

        artTokenPrices[_artTokenId] = 0;

        for(uint256 i = 0; i < onSaleArtTokkenArray.length; i++){
            if(artTokenPrices[onSaleArtTokkenArray[i]] == 0){
                onSaleArtTokkenArray[i] = onSaleArtTokkenArray[onSaleArtTokkenArray.length-1];
                onSaleArtTokkenArray.pop();
            }
        }
    }

    function getArtTokenPrice(uint256 _artTokenId) view public returns (uint256){
        return artTokenPrices[_artTokenId];
    }

    
    function getContractOwner() view public returns (address){
        return mintArtTokenAddress.owner();
    }

}