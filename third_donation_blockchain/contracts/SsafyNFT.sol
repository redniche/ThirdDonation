// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/extensions/ERC721Enumerable.sol";
import "./token/ERC721/extensions/ERC721URIStorage.sol";
import "./access/Ownable.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract SsafyNFT is ERC721Enumerable, ERC721URIStorage, Ownable {
    // 예술가 여부를 매핑함. O(1)
    mapping(address => bool) private _artistAddress;

    /**
     * @dev Throws if called by any account other than the artist.
     * @dev 아티스트가 아닌 사람이 호출하면 Throw 함.
     */
    modifier onlyArtist() {
        require(_artistAddress[msg.sender], "Arist: caller is not the artist");
        _;
    }

    constructor() ERC721("SsafyNFT", "SFT") {}

    function addArtistAddress(address artistAddress) public onlyOwner {
        _artistAddress[artistAddress] = true;
    }

    function deleteArtistAddress(address artistAddress) public onlyOwner {
        _artistAddress[artistAddress] = false;
    }

    function current() public view returns (uint256) {
        return totalSupply();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function create(address to, string memory _tokenURI) public onlyArtist returns (uint256) {
        uint256 newTokenId = totalSupply() + 1;
        //NFT 민팅
        super._mint(to, newTokenId);

        //토큰 아아디리에 해당하는 URI 변경
        super._setTokenURI(newTokenId, _tokenURI);

        //반환
        return newTokenId;
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://localhost:5999/token/";
    }
}
