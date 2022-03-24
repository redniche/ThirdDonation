// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.5.0) (token/ERC721/extensions/IERC721Enumerable.sol)

pragma solidity ^0.8.0;

import "../IERC721.sol";

/**
 * @title ERC-721 Non-Fungible Token Standard, optional enumeration extension
 * @dev See https://eips.ethereum.org/EIPS/eip-721
 */
interface IERC721Enumerable is IERC721 {
    /**
     * @dev Returns the total amount of tokens stored by the contract.
     *
     * @dev 계약에 의해 저장된 토큰의 총량을 반환합니다.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns a token ID owned by `owner` at a given `index` of its token list.
     * Use along with {balanceOf} to enumerate all of ``owner``'s tokens.
     *
     * @dev 토큰 목록의 지정된 '색인'에서 '소유자'가 소유한 토큰 ID를 반환합니다.
     * 모든 ``소유자``의 토큰을 열거하려면 {balanceOf}와 함께 사용하십시오.
     */
    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256);

    /**
     * @dev Returns a token ID at a given `index` of all the tokens stored by the contract.
     * Use along with {totalSupply} to enumerate all tokens.
     *
     * @dev 계약에 의해 저장된 모든 토큰의 지정된 '색인'에서 토큰 ID를 반환합니다.
     * {totalSupply}와 함께 사용하여 모든 토큰을 열거합니다.
     */
    function tokenByIndex(uint256 index) external view returns (uint256);
}
