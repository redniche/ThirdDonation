// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.3.2 (utils/introspection/ERC165.sol)

pragma solidity ^0.8.0;

import "./IERC165.sol";

/**
 * @dev Implementation of the {IERC165} interface.
 *
 * @dev {IERC165} 인터페이스 구현.
 *
 * Contracts that want to implement ERC165 should inherit from this contract and override {supportsInterface} to check
 * for the additional interface id that will be supported. For example:
 *
 * ERC165를 구현하고자 하는 컨트랙트는 이 컨트랙트를 상속받아 확인하기 위해 {supportsInterface}를 재정의해야 합니다.
 * 지원될 추가 인터페이스 ID용. 예를 들어:
 *
 * ```solidity
 * function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
 *     return interfaceId == type(MyInterface).interfaceId || super.supportsInterface(interfaceId);
 * }
 * ```
 *
 * Alternatively, {ERC165Storage} provides an easier to use but more expensive implementation.
 * 또는 {ERC165Storage}는 사용하기 쉽지만 더 비싼 구현을 제공합니다.
 */
abstract contract ERC165 is IERC165 {
    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return interfaceId == type(IERC165).interfaceId;
    }
}
