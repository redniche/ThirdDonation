/**
 * PJT Ⅰ - 과제 3 테스트 코드 작성
 *
 * @format
 * @dev NFT mint, transfer, and compare URI
 */

const NftCreator = artifacts.require("SsafyNFT");

contract("NftCreator", (accounts) => {
	it("NFT mint, transfer, and compare URI", async () => {
		const sender = accounts[0];
		const receiver = accounts[1];

		var uri = {
			attributes: [
				{
					trait_type: "Breed",
					value: "Maltipoo",
				},
				{
					trait_type: "Eye color",
					value: "Mocha",
				},
			],
			description: "The world's most adorable and sensitive pup.",
			image: "ipfs://hash Value Of The IPFSEd Image",
			name: "DangDangYi",
		};
		var tokenURI = JSON.stringify(uri);
		var nftContract;
		console.log("토큰 URI: ", tokenURI);
		console.log(sender);
		console.log(receiver);
		await NftCreator.deployed().then(async (instance) => {
			nftContract = instance;
			console.log("여기까지");

			//민팅
			var result = await nftContract.create(sender, tokenURI);

			var tokenID = result.logs[0].args["tokenId"];

			var owner = await nftContract.ownerOf(tokenID);
			//테스트1
			assert.equal(sender, owner, "NFT Mint Failed");

			console.log(sender);
			//전송
			await nftContract.transferFrom(sender, receiver, tokenID);
			owner = await nftContract.ownerOf(tokenID);
			console.log(owner);

			//테스트2
			assert.equal(receiver, owner, "NFT Transfer Failed.");

			var tokenURIFetched = await nftContract.tokenURI(tokenID);
			//테스트3
			assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.");
		});

		// TODO
		// 다음이 반드시 테스트되어야 합니다.
		// assert.equal(sender, owner, "NFT Mint Failed");
		// assert.equal(receiver, owner, "NFT Transfer Failed.");
		// assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.")
	});
});
