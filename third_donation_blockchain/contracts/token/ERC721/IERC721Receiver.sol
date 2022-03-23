// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.3.2 (token/ERC721/IERC721Receiver.sol)

pragma solidity ^0.8.0;

/**
 * @title ERC721 token receiver interface
 * @dev Interface for any contract that wants to support safeTransfers
 * from ERC721 asset contracts.
 */
interface IERC721Receiver {
    /**
     * @dev Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
     * by `operator` from `from`, this function is called.
     *
     * It must return its Solidity selector to confirm the token transfer.
     * If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
     *
     * The selector can be obtained in Solidity with `IERC721.onERC721Received.selector`.
     *
     * @dev {IERC721} `tokenId` 토큰이 {IERC721-safeTransferFrom}을 통해 이 계약으로 전송될 때마다
     * 'from'의 'operator'에 의해 이 함수가 호출됩니다.
     *
     * 토큰 전송을 확인하기 위해 Solidity 선택기를 반환해야 합니다.
     * 다른 값이 반환되거나 받는 사람이 인터페이스를 구현하지 않으면 이전이 되돌려집니다.
     *
     * 선택자는 솔리디티에서 `IERC721.onERC721Received.selector`로 얻을 수 있습니다.
     */
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}
