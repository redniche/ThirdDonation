// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./extensions/IERC721Metadata.sol";
import "../../utils/Address.sol";
import "../../utils/Context.sol";
import "../../utils/Strings.sol";
import "../../utils/introspection/ERC165.sol";

/**
 * PJT Ⅰ - 과제 1 ERC-721 구현
 * @dev EIP-721을 준수하여 ERC721을 작성합니다.
 * https://eips.ethereum.org/EIPS/eip-721 [ERC721] Non-Fungible Token Standard
 */
contract ERC721 is Context, ERC165, IERC721, IERC721Metadata {
    using Address for address;
    using Strings for uint256;

    // `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`와 동일
    // `IERC721Receiver(0).onERC721Received.selector`로부터 얻을 수도 있습니다
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Token name
    // 토큰 이름
    string private _name;

    // Token symbol
    // 토큰 심볼
    string private _symbol;

    // Mapping from token ID to owner address
    // 토큰 ID에서 소유자 주소로 매핑
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    // 소유자 주소를 토큰 수에 매핑
    // 기존 uint256 에서 좀 더 안전한 SafeMath를 사용하는 library 작성함
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    // 토큰 ID에서 승인된 주소로 매핑
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    // 소유자에서 운영자 승인으로 매핑
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     * @dev 토큰 컬렉션에 '이름'과 '기호'를 설정하여 계약을 초기화합니다.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721-balanceOf}.
     * @dev 명시한 주소의 잔액을 얻습니다.
     * @param owner 잔액을 요청하는 주소
     * @return uint256 전달받은 주소가 보유한 수량
     */
    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");

        return _balances[owner];
    }

    /**
     * @dev See {IERC721-ownerOf}.
     * @dev 명시된 토큰 ID의 소유자를 얻습니다.
     * @param tokenId uint256 소유자를 요청하는 토큰의 ID
     * @return address 주어진 토큰 ID의 현재 표시된 소유자
     */
    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    /**
     * @dev See {IERC721Metadata-name}.
     * @dev 현재 NFT의 이름을 얻습니다.
     * @return string NFT의 이름
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IERC721Metadata-symbol}.
     * @dev 현재 NFT의 심볼을 얻습니다.
     * @return string NFT의 심볼
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     * @dev OpenZeppelin 4.4.1에서 착안함. https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.5.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
    }

    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

    /**
     * @dev See {IERC721-approve}.
     * @dev 주어진 토큰 ID의 전송을 다른 주소에게 허가합니다.
     * 영(zero) 주소는 승인된 주소가 없음을 나타냅니다.
     * 한 번에 하나의 승인된 주소만 있을 수 있습니다.
     * 토큰 소유자나 승인된 운영자만이 호출할 수 있습니다.
     * @param to address 주어진 토큰 ID에 대해 승인할 주소
     * @param tokenId uint256 승인하고자 하는 토큰 ID
     */
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }

    /**
     * @dev See {IERC721-getApproved}.
     * @dev 토큰 ID에 대해 승인된 주소를, 만일 설정된 주소가 없으면 0을 얻습니다.
     * 만일 토큰 ID가 존재하지 않는 경우 되돌려집니다.
     * @param tokenId uint256 승인된 주소를 요청하는 토큰의 ID
     * @return address 주어진 토큰 ID에 대해 현재 승인된 주소
     */
    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");

        return _tokenApprovals[tokenId];
    }

    /**
     * @dev See {IERC721-setApprovalForAll}.
     * @dev 주어진 운영자의 승인을 설정 또는 해제합니다.
     * 운영자는 발신자를 대신해 모든 토큰을 전송할 수 있도록 허가되었습니다.
     * @param operator 승인을 설정하고자 하는 운영자의 주소
     * @param approved 설정하고자 하는 승인의 상태를 나타냅니다
     */
    function setApprovalForAll(address operator, bool approved) public virtual override {
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    /**
     * @dev See {IERC721-isApprovedForAll}.
     * @dev 주어진 소유자에 대해 운영자가 승인되었는지 여부를 말해줍니다.
     * @param owner 승인을 조회하고자 하는 소유자 주소
     * @param operator 승인을 조회하고자 하는 운영자 주소
     * @return bool 주어진 운영자가 주어진 소유자로부터 승인되었는지 여부
     */
    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev See {IERC721-transferFrom}.
     * @dev 주어진 토큰 ID의 소유권을 다른 주소로 전송합니다.
     * 이 메소드는 사용하지 않는 것이 좋습니다. 가능하다면 `safeTransferFrom`을 사용하세요.
     * msg.sender는 소유자, 승인된 주소, 또는 운영자여야 합니다.
     * @param from 토큰의 현재 소유자
     * @param to 주어진 토큰 ID의 소유권을 받을 주소
     * @param tokenId 전송할 토큰의 uint256 ID
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        //solhint-disable-next-line max-line-length
        // 1. 송금을 지시할 수 있는 대상은 소유 당사자, 승인 받은 주소, 지정된 관리자 주소인지 검사
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(from, to, tokenId);
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * `_data` is additional data, it has no specified format and it is sent in call to `to`.
     *
     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
     * implement alternative mechanisms to perform token transfer, such as signature-based.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     *
     * @dev `tokenId` 토큰을 `from`에서 `to`로 안전하게 전송하여 먼저 계약 수신자를 확인합니다.
     * 토큰이 영원히 잠기는 것을 방지하기 위해 ERC721 프로토콜을 알고 있습니다.
     *
     * `_data`는 추가 데이터로 지정된 형식이 없으며 `to`를 호출하여 전송됩니다.
     *
     * 이 내부 함수는 {safeTransferFrom}과 동일하며 예를 들어
     * 서명 기반과 같은 토큰 전송을 수행하는 대체 메커니즘을 구현합니다.
     *
     * 요구 사항:
     *
     * - `from`은 0 주소가 될 수 없습니다.
     * - `to`는 0 주소가 될 수 없습니다.
     * - `tokenId` 토큰이 존재해야 하며 `from`이 소유해야 합니다.
     * - 'to'가 스마트 계약을 의미하는 경우 안전한 전송을 위해 호출되는 {IERC721Receiver-onERC721Received}를 구현해야 합니다.
     *
     * {Transfer} 이벤트를 발생시킵니다.
     */
    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    /**
     * @dev Returns whether `tokenId` exists.
     *
     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
     *
     * Tokens start existing when they are minted (`_mint`),
     * and stop existing when they are burned (`_burn`).
     *
     * @dev `tokenId`가 있는지 여부를 반환합니다.
     *
     * 토큰은 {approve} 또는 {setApprovalForAll}을 통해 소유자 또는 승인된 계정이 관리할 수 있습니다.
     *
     * 토큰은 발행될 때 존재하기 시작합니다(`_mint`),
     * 그리고 소각되면 존재를 중지합니다(`_burn`).
     */
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ERC721.ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    /**
     * @dev Safely mints `tokenId` and transfers it to `to`.
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     *
     * @dev 는 `tokenId`를 안전하게 발행하고 `to`로 전송합니다.
     *
     * 요구 사항:
     *
     * - `tokenId`는 존재하지 않아야 합니다.
     * - 'to'가 스마트 계약을 의미하는 경우 안전한 전송을 위해 호출되는 {IERC721Receiver-onERC721Received}를 구현해야 합니다.
     *
     * {Transfer} 이벤트를 발생시킵니다.
     */
    function _safeMint(address to, uint256 tokenId) internal virtual {
        _safeMint(to, tokenId, "");
    }

    /**
     * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
     *
     * @dev 추가 `data` 매개변수가 있는 {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`]와 동일
     * {IERC721Receiver-onERC721Received}에서 계약 수신자에게 전달되었습니다.
     */
    function _safeMint(
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _mint(to, tokenId);
        require(
            _checkOnERC721Received(address(0), to, tokenId, _data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     * @dev 새 토큰을 발행하기 위한 내부 함수.
     * 주어진 토큰 ID가 이미 존재하면 되돌립니다.
     * @param to 발행된 토큰을 소유할 주소
     * @param tokenId uint256 발행될 토큰의 ID
     */
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _beforeTokenTransfer(address(0), to, tokenId);

        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);

        _afterTokenTransfer(address(0), to, tokenId);
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
     * 명세서: NFT를 소각(삭제)하는 함수이다. 상속받은 컨트랙트에 의해서만 호출가능해야 한다.
     * 소각할 NFT의 위임 송금 정보를 삭제한다. balances(여기선 _balances)와 _owners 정보를 변경한다.
     * @dev 특정 토큰을 소각하기 위한 내부 함수.
     * 토큰이 존재하지 않으면 되돌립니다.
     * @param tokenId uint256 소각할 토큰의 ID
     */
    function _burn(uint256 tokenId) internal virtual {
        address owner = ERC721.ownerOf(tokenId);

        _beforeTokenTransfer(owner, address(0), tokenId);

        // Clear approvals
        _approve(address(0), tokenId);

        _balances[owner] -= 1;
        delete _owners[tokenId];

        emit Transfer(owner, address(0), tokenId);

        _afterTokenTransfer(owner, address(0), tokenId);
    }

    /**
     * @dev 는 `tokenId`를 `from`에서 `to`로 전송합니다.
     * {transferFrom}과 달리 msg.sender에 제한이 없습니다.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     *
     * Emits a {Transfer} event. Transfer이란 이벤트를 발생시킵니다.
     */
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        require(ERC721.ownerOf(tokenId) == from, "ERC721: transfer from incorrect owner");
        require(to != address(0), "ERC721: transfer to the zero address");

        _beforeTokenTransfer(from, to, tokenId);

        // Clear approvals from the previous owner
        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);

        _afterTokenTransfer(from, to, tokenId);
    }

    /**
     * @dev to에게 tokenId의 권한을 승인한다.
     *
     * Emit a {Approval} event.
     */
    function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
        emit Approval(ERC721.ownerOf(tokenId), to, tokenId);
    }

    /**
     * @dev Approve `operator` to operate on all of `owner` tokens
     *
     * Emits a {ApprovalForAll} event.
     *
     * @dev 모든 `owner`의 토큰에서 작동하도록 `operator`를 승인합니다.
     *
     * {ApprovalForAll} 이벤트를 발생시킵니다.
     */
    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal virtual {
        require(owner != operator, "ERC721: approve to caller");
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    /**
     * @dev 목표 주소에서 `onERC721Received`를 호출할 내부 함수.
     * 대상 주소가 컨트랙트가 아닌 경우 호출이 실행되지 않습니다.
     *
     * 이 기능은 더 이상 사용되지 않습니다.
     * @param from 주어진 토큰 ID의 이전 소유자를 나타내는 주소
     * @param to 토큰을 받을 목표 주소
     * @param tokenId uint256 전송될 토큰의 ID
     * @param _data bytes 호출과 함께 전송할 추가 데이터
     * @return bool 호출이 예상한 값(magic value)을 반환했는지 여부
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) private returns (bool) {
        if (to.isContract()) {
            try IERC721Receiver(to).onERC721Received(_msgSender(), from, tokenId, _data) returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721: transfer to non ERC721Receiver implementer");
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
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
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     *
     * @dev 토큰 전송 전에 호출되는 후크입니다. 여기에는 minting과 burning이 포함됩니다.
     *
     * 호출 조건:
     *
     * - `from`과 `to`가 모두 0이 아닌 경우 ``from``의 `tokenId`는
     * 'to'로 옮겼습니다.
     * - 'from'이 0이면 'to'에 대해 'tokenId'가 발행됩니다.
     * - `to`가 0이면 ``from``의 `tokenId`가 소각됩니다.
     * - `from`과 `to`는 모두 0이 아닙니다.
     *
     * 후크에 대해 자세히 알아보려면 xref:ROOT:extending-contracts.adoc로 이동하십시오.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}

    /**
     * @dev Hook that is called after any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to https://docs.openzeppelin.com/contracts/3.x/extending-contracts#using-hooks .
     *
     * @dev 토큰 전송 후 호출되는 후크입니다. 여기에는 다음이 포함됩니다.
     * minting과 burning.
     *
     * 호출 조건:
     *
     * - `from`과 `to`가 모두 0이 아닌 경우.
     * - `from`과 `to`는 모두 0이 아닙니다.
     *
     * 후크에 대해 자세히 알아보려면 https://docs.openzeppelin.com/contracts/3.x/extending-contracts#using-hooks 로 이동하십시오.
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}
}
