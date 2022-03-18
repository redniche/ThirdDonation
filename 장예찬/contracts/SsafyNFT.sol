// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";
import "./utils/Counters.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract SsafyNFT is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    constructor() ERC721("SsafyNFT", "SFT") {}

    function current() public view returns (uint256) {
        return _tokenIds.current();
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function create(address to, string memory _tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        //NFT 민팅
        super._mint(to, newItemId);
        //토큰 아아디리에 해당하는 URI 변경
        super._setTokenURI(newItemId, _tokenURI);

        //반환
        return newItemId;
    }
}
