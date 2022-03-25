// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (token/ERC721/extensions/ERC721Enumerable.sol)

pragma solidity ^0.8.0;

import "../ERC721.sol";
import "./IERC721Enumerable.sol";

/**
 * @dev This implements an optional extension of {ERC721} defined in the EIP that adds
 * enumerability of all the token ids in the contract as well as all token ids owned by each
 * account.
 *
 * @dev 이것은 추가하는 EIP에 정의된 {ERC721}의 선택적 확장을 구현합니다.
 * 계약에 있는 모든 토큰 ID와 각 계정이 소유한 모든 토큰 ID의 열거 가능성.
 */
abstract contract ERC721Enumerable is ERC721, IERC721Enumerable {
    // Mapping from owner to list of owned token IDs
    // 소유자에서 소유 토큰 ID 목록으로 매핑
    mapping(address => mapping(uint256 => uint256)) private _ownedTokens;

    // Mapping from token ID to index of the owner tokens list
    // 토큰 ID에서 소유자 토큰 목록의 인덱스로 매핑
    mapping(uint256 => uint256) private _ownedTokensIndex;

    // Array with all token ids, used for enumeration
    // 열거에 사용되는 모든 토큰 ID가 있는 배열
    uint256[] private _allTokens;

    // Mapping from token id to position in the allTokens array
    // 토큰 ID에서 위치로 매핑 allTokens array
    mapping(uint256 => uint256) private _allTokensIndex;

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(IERC165, ERC721) returns (bool) {
        return interfaceId == type(IERC721Enumerable).interfaceId || super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721Enumerable-tokenOfOwnerByIndex}.
     */
    function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual override returns (uint256) {
        require(index < ERC721.balanceOf(owner), "ERC721Enumerable: owner index out of bounds");
        return _ownedTokens[owner][index];
    }

    /**
     * @dev See {IERC721Enumerable-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return _allTokens.length;
    }

    /**
     * @dev See {IERC721Enumerable-tokenByIndex}.
     */
    function tokenByIndex(uint256 index) public view virtual override returns (uint256) {
        require(index < ERC721Enumerable.totalSupply(), "ERC721Enumerable: global index out of bounds");
        return _allTokens[index];
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     *
     * @dev 토큰 전송 전에 호출되는 후크입니다. 여기에는 주조가 포함됩니다.
     * 그리고 굽기.
     *
     * 호출 조건:
     *
     * - `from`과 `to`가 모두 0이 아닌 경우 ``from``의 `tokenId`는
     * 'to'로 옮겼습니다.
     * - 'from'이 0이면 'to'에 대해 'tokenId'가 발행됩니다.
     * - `to`가 0이면 ``from``의 `tokenId`가 소각됩니다.
     * - `from`은 0 주소가 될 수 없습니다.
     * - `to`는 0 주소가 될 수 없습니다.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        if (from == address(0)) {
            _addTokenToAllTokensEnumeration(tokenId);
        } else if (from != to) {
            _removeTokenFromOwnerEnumeration(from, tokenId);
        }
        if (to == address(0)) {
            _removeTokenFromAllTokensEnumeration(tokenId);
        } else if (to != from) {
            _addTokenToOwnerEnumeration(to, tokenId);
        }
    }

    /**
     * @dev Private function to add a token to this extension's ownership-tracking data structures.
     * @param to address representing the new owner of the given token ID
     * @param tokenId uint256 ID of the token to be added to the tokens list of the given address
     *
     * @dev 이 확장의 소유권 추적 데이터 구조에 토큰을 추가하는 비공개 함수입니다.
     * @param to 주어진 토큰 ID의 새 소유자를 나타내는 주소
     * @param tokenId uint256 주어진 주소의 토큰 목록에 추가할 토큰의 ID
     */
    function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
        uint256 length = ERC721.balanceOf(to);
        _ownedTokens[to][length] = tokenId;
        _ownedTokensIndex[tokenId] = length;
    }

    /**
     * @dev Private function to add a token to this extension's token tracking data structures.
     * @param tokenId uint256 ID of the token to be added to the tokens list
     *
     * @dev 이 확장의 토큰 추적 데이터 구조에 토큰을 추가하는 비공개 함수입니다.
     * @param tokenId uint256 토큰 목록에 추가할 토큰의 ID
     */
    function _addTokenToAllTokensEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    /**
     * @dev Private function to remove a token from this extension's ownership-tracking data structures. Note that
     * while the token is not assigned a new owner, the `_ownedTokensIndex` mapping is _not_ updated: this allows for
     * gas optimizations e.g. when performing a transfer operation (avoiding double writes).
     * This has O(1) time complexity, but alters the order of the _ownedTokens array.
     * @param from address representing the previous owner of the given token ID
     * @param tokenId uint256 ID of the token to be removed from the tokens list of the given address
     *
     * @dev 이 확장의 소유권 추적 데이터 구조에서 토큰을 제거하는 비공개 함수입니다. 참고
     * 토큰에 새 소유자가 할당되지 않은 동안 `_ownedTokensIndex` 매핑은 _not_ 업데이트됩니다. 이를 통해 가스 최적화가 가능합니다.
     * 전송 작업을 수행할 때(이중 쓰기 방지).
     * 이것은 O(1) 시간 복잡도를 갖지만 _ownTokens 배열의 순서를 변경합니다.
     * @param from address 주어진 토큰 ID의 이전 소유자를 나타냅니다.
     * @param tokenId uint256 주어진 주소의 토큰 목록에서 제거할 토큰의 ID
     */
    function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId) private {
        // To prevent a gap in from's tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).
        // from의 토큰 배열의 공백을 방지하기 위해 삭제할 토큰의 인덱스에 마지막 토큰을 저장하고,
        // 그런 다음 마지막 슬롯을 삭제합니다(스왑 및 팝).

        uint256 lastTokenIndex = ERC721.balanceOf(from) - 1;
        uint256 tokenIndex = _ownedTokensIndex[tokenId];

        // When the token to delete is the last token, the swap operation is unnecessary
        // 삭제할 토큰이 마지막 토큰인 경우 스왑 작업이 필요하지 않습니다.
        if (tokenIndex != lastTokenIndex) {
            uint256 lastTokenId = _ownedTokens[from][lastTokenIndex];

            _ownedTokens[from][tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
            _ownedTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index
        }

        // This also deletes the contents at the last position of the array
        // 배열의 마지막 위치에 있는 내용도 삭제합니다.
        delete _ownedTokensIndex[tokenId];
        delete _ownedTokens[from][lastTokenIndex];
    }

    /**
     * @dev Private function to remove a token from this extension's token tracking data structures.
     * This has O(1) time complexity, but alters the order of the _allTokens array.
     * @param tokenId uint256 ID of the token to be removed from the tokens list
     *
     * @dev 이 확장의 토큰 추적 데이터 구조에서 토큰을 제거하는 비공개 함수입니다.
     * 이것은 O(1) 시간 복잡도를 갖지만 _allTokens 배열의 순서를 변경합니다.
     * @param tokenId uint256 토큰 목록에서 제거할 토큰의 ID
     */
    function _removeTokenFromAllTokensEnumeration(uint256 tokenId) private {
        // To prevent a gap in the tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).
        // 토큰 배열의 공백을 방지하기 위해 삭제할 토큰의 인덱스에 마지막 토큰을 저장하고,
        // 그런 다음 마지막 슬롯을 삭제합니다(스왑 및 팝).

        uint256 lastTokenIndex = _allTokens.length - 1;
        uint256 tokenIndex = _allTokensIndex[tokenId];

        // When the token to delete is the last token, the swap operation is unnecessary. However, since this occurs so
        // rarely (when the last minted token is burnt) that we still do the swap here to avoid the gas cost of adding
        // an 'if' statement (like in _removeTokenFromOwnerEnumeration)
        // 삭제할 토큰이 마지막 토큰인 경우 스왑 작업이 필요하지 않습니다. 그러나 이러한 일이 발생하기 때문에
        // 드물게 (마지막으로 발행된 토큰이 소각되었을 때) 추가에 따른 가스 비용을 피하기 위해 여기서 스왑을 수행합니다.
        // 'if' 문(예: _removeTokenFromOwnerEnumeration)
        uint256 lastTokenId = _allTokens[lastTokenIndex];

        _allTokens[tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
        _allTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index

        // This also deletes the contents at the last position of the array
        // 배열의 마지막 위치에 있는 내용도 삭제합니다.
        delete _allTokensIndex[tokenId];
        _allTokens.pop();
    }
}
