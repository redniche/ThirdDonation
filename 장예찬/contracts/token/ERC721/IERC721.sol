// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.3.2 (token/ERC721/IERC721.sol)

pragma solidity ^0.8.0;

import "../../utils/introspection/IERC165.sol";

/**
 * @dev Required interface of an ERC721 compliant contract.
 * @dev ERC721 준수 계약의 필수 인터페이스.
 */
interface IERC721 is IERC165 {
    /**
     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
     * @dev `tokenId` 토큰이 `from`에서 `to`로 전송될 때 발생합니다.
     */
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    /**
     * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
     * @dev 'owner'가 'approved'의 'tokenId' 토큰을 관리할 수 있게 허용하면 발생합니다.
     */
    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );

    /**
     * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
     * @dev '소유자'가 모든 자산을 관리하기 위해 '운영자'(`승인됨') 를 활성화 또는 비활성화할 때 발생합니다.
     */
    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     * @dev ``소유자``의 계정에 있는 토큰 수를 반환합니다.
     */
    function balanceOf(address owner) external view returns (uint256 balance);

    /**
     * @dev Returns the owner of the `tokenId` token.
     * @dev `tokenId` 토큰의 소유자를 반환합니다.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     * @dev `tokenId` 토큰을 `from`에서 `to`로 안전하게 전송하여 먼저 계약 수신자를 확인합니다.
     * 토큰이 영원히 잠기는 것을 방지하기 위해 ERC721 프로토콜을 알고 있습니다.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be have been allowed to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     * - `from`은 0 주소가 될 수 없습니다.
     * - `to`는 0 주소가 될 수 없습니다.
     * - `tokenId` 토큰이 존재해야 하며 `from`이 소유해야 합니다.
     * - 호출자가 `from`이 아닌 경우 {approve} 또는 {setApprovalForAll}에 의해 이 토큰을 이동할 수 있어야 합니다.
     * - 'to'가 스마트 계약을 의미하는 경우 안전한 전송을 위해 호출되는 {IERC721Receiver-onERC721Received}를 구현해야 합니다.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Transfers `tokenId` token from `from` to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {safeTransferFrom} whenever possible.
     * @dev `tokenId` 토큰을 `from`에서 `to`로 전송합니다.
     *
     * 경고: 이 방법은 사용하지 않는 것이 좋습니다. 가능하면 {safeTransferFrom}을 사용하세요.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     *
     * - `from`은 0 주소가 될 수 없습니다.
     * - `to`는 0 주소가 될 수 없습니다.
     * - `tokenId` 토큰은 `from`이 소유해야 합니다.
     * - 호출자가 `from`이 아닌 경우 {approve} 또는 {setApprovalForAll}에 의해 이 토큰을 이동하도록 승인되어야 합니다.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Gives permission to `to` to transfer `tokenId` token to another account.
     * The approval is cleared when the token is transferred.
     *
     * Only a single account can be approved at a time, so approving the zero address clears previous approvals.
     *
     * @dev 'tokenId' 토큰을 다른 계정으로 전송하기 위해 'to'에 권한을 부여합니다.
     * 토큰 양도 시 승인이 클리어 됩니다.
     *
     * 한 번에 하나의 계정만 승인할 수 있으므로 제로 주소 승인은 이전 승인을 취소합니다.
     *
     * Requirements:
     *
     * - The caller must own the token or be an approved operator.
     * - `tokenId` must exist.
     *
     * - 호출자는 토큰을 소유하거나 승인된 운영자여야 합니다.
     * - `tokenId`가 있어야 합니다.
     *
     * Emits an {Approval} event.
     */
    function approve(address to, uint256 tokenId) external;

    /**
     * @dev Returns the account approved for `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * @dev `tokenId` 토큰에 대해 승인된 계정을 반환합니다.
     *
     * 요구 사항:
     *
     * - `tokenId`가 있어야 합니다.
     */
    function getApproved(uint256 tokenId)
        external
        view
        returns (address operator);

    /**
     * @dev Approve or remove `operator` as an operator for the caller.
     * Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller.
     *
     * @dev 호출자의 연산자로 `operator`를 승인하거나 제거합니다.
     * 운영자는 호출자가 소유한 모든 토큰에 대해 {transferFrom} 또는 {safeTransferFrom}을 호출할 수 있습니다.
     *
     * Requirements:
     *
     * - The `operator` cannot be the caller.
     *
     * - `operator`는 호출자가 될 수 없습니다.
     *
     * Emits an {ApprovalForAll} event.
     */
    function setApprovalForAll(address operator, bool _approved) external;

    /**
     * @dev Returns if the `operator` is allowed to manage all of the assets of `owner`.
     *
     * @dev `operator`가 `owner`의 모든 자산을 관리할 수 있는지 여부를 반환합니다.
     *
     * See {setApprovalForAll}
     */
    function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`.
     *
     * @dev `tokenId` 토큰을 `from`에서 `to`로 안전하게 전송합니다.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * - `from`은 0 주소가 될 수 없습니다.
     * - `to`는 0 주소가 될 수 없습니다.
     * - `tokenId` 토큰이 존재해야 하며 `from`이 소유해야 합니다.
     * - 호출자가 `from`이 아닌 경우 {approve} 또는 {setApprovalForAll}에 의해 이 토큰을 이동하도록 승인되어야 합니다.
     * - 'to'가 스마트 계약을 의미하는 경우 안전한 전송을 위해 호출되는 {IERC721Receiver-onERC721Received}를 구현해야 합니다.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;
}
