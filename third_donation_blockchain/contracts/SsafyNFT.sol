// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/extensions/ERC721Enumerable.sol";
import "./token/ERC721/extensions/ERC721URIStorage.sol";
import "./access/Ownable.sol";
import "./SaleArtToken.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract SsafyNFT is ERC721Enumerable, ERC721URIStorage, Ownable {
    using Strings for uint256;
   
    // // 작품 구조체
    // struct Art{
    //     uint id;
    //     string title;
    //     string artist;
    //     string description;
    // }
    // 작품 정보를 반환해줄 구조체
    struct ArtTokenData{
        uint artTokenId;
        string artUri;
        uint artPrice;
    }

    // 예술가 여부를 매핑함. O(1)
    mapping(address => bool) private _artistAddress;
    // // 작품 정보를 매핑함
    // mapping(uint256 => Art) public arts;

    // 같은 파일 해시 여부를 매핑함. O(1)
    mapping(string => bool) private _isUsedFile;

    // 같은 tokenURI 존재 여부를 매핑함. O(1)
    mapping(string => bool) private _isUsedTokenURI;

    constructor() ERC721("SsafyNFT", "SFT") {
        _artistAddress[owner()] = true;
    }

    mapping(uint256 => string) public arts;

    /**
     * @dev Throws if called by any account other than the artist.
     * @dev 아티스트가 아닌 사람이 호출하면 Throw 함.
     */
    modifier onlyArtist() {
        require(_artistAddress[msg.sender], "Arist: caller is not the artist");
        _;
    }

    /**
     * @dev file과 tokenURI를 입력받아 동일 토큰의 존재 여부를 반환함.
     */
    function _existToken(string memory file, string memory _tokenURI) internal view virtual returns (bool) {
        return _isUsedFile[file] || _isUsedTokenURI[_tokenURI];
    }

    SaleArtToken public saleArtToken;

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

    function create(
        address to,
        string memory file,
        string memory _tokenURI
    ) public onlyArtist returns (uint256) {
        require(!_existToken(file, _tokenURI), "SsafyNFT: Already exist token");
        uint256 newTokenId = totalSupply() + 1;

        //NFT 민팅
        super._mint(to, newTokenId);

        //token 값들을 존재하는 토큰으로 변경
        _isUsedFile[file] = true;
        _isUsedTokenURI[_tokenURI] = true;

        //토큰 아아디에 해당하는 URI 변경
        super._setTokenURI(newTokenId, _tokenURI);

        arts[newTokenId] =  super.getTokenURI(newTokenId);

        //반환
        return newTokenId;
    }

    // function create(string memory _tokenURI, string memory _title, string memory _artist, string memory _description) public onlyArtist returns (uint256) {
    //     uint256 newTokenId = totalSupply() + 1;

    //     arts[newTokenId] = Art(newTokenId, _title, _artist, _description);

    //     //NFT 민팅
    //     super._mint(msg.sender, newTokenId);

    //     //토큰 아아디리에 해당하는 URI 변경
    //     super._setTokenURI(newTokenId, _tokenURI);

    //     //반환
    //     return newTokenId;
    // }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // function _baseURI() internal pure override returns (string memory) {
    //     return "https://localhost:5999/token/";
    // }

    // 지갑 주소에 해당하는 작품 배열 반환
    function getArtTokens(address _artTokenOwner) view public returns (ArtTokenData[] memory) {
        

        uint256 balanceLength = balanceOf(_artTokenOwner);

        require(balanceLength != 0, "Owner did not have token.");

        // ArtTokenData[] memory artTokenData = new ArtTokenData[](balanceLength);

        ArtTokenData[] memory artTokenData = new ArtTokenData[](balanceLength);

      
        for(uint256 i = 0; i < balanceLength; i++){
            uint256 artTokenId = tokenOfOwnerByIndex(_artTokenOwner, i);
            
            string memory artTokenURI = super.getTokenURI(artTokenId);
            uint256 artPrice = saleArtToken.getArtTokenPrice(artTokenId);

            // artTokenData[i] = artTokenURI;
            artTokenData[i] = ArtTokenData(artTokenId, artTokenURI, artPrice);
        }

        return artTokenData;

    }

    function setSaleArtToken(address _saleArtTokens) public {
        saleArtToken = SaleArtToken(_saleArtTokens);
    }

}
