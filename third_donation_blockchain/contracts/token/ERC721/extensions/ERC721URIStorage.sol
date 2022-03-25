// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (token/ERC721/extensions/ERC721URIStorage.sol)

pragma solidity ^0.8.0;

import "../ERC721.sol";

/**
 * @dev ERC721 token with storage based token URI management.
 * @dev 스토리지 기반 토큰 URI 관리가 있는 ERC721 토큰.
 */
abstract contract ERC721URIStorage is ERC721 {
    using Strings for uint256;

    // Optional mapping for token URIs
    // 토큰 URI에 대한 선택적 매핑
    mapping(uint256 => string) private _tokenURIs;

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        // 기본 URI가 없으면 토큰 URI를 반환합니다.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        // 둘 다 설정되면 baseURI와 tokenURI를 연결합니다(abi.encodePacked를 통해).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }

    /**
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * @dev `_tokenURI`를 `tokenId`의 tokenURI로 설정합니다.
     *
     * 요구 사항:
     *
     * - `tokenId`가 있어야 합니다.
     */
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    // tokenId에 해당하는 tokenURI를 반환하는 함수
    // function _getTokenURI(uint256 tokenId) internal virtual returns(string memory){
    //     require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");

    //     return _tokenURIs[tokenId];
    // }
    function getTokenURI(uint256 tokenId) view public returns(string memory){
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");

        return _tokenURIs[tokenId];
    }

    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {Transfer} event.
     *
     * @dev 'tokenId'를 파괴합니다.
     * 토큰 소각 시 승인이 해제됩니다.
     *
     * 요구 사항:
     *
     * - `tokenId`가 있어야 합니다.
     *
     * {Transfer} 이벤트를 발생시킵니다.
     */
    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }
}
