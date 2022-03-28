import { useCallback, useState } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { API_URL, Axios } from './../../core/axios';
import { Ipfs } from './../../core/ipfs';
import { getSsafyNftContract, SSAFY_NFT_CONTRACT_ADDRESS } from '../../contracts';
import Web3 from 'web3';
import { useNavigate } from '@reach/router';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import ABI from '../../common/ABI';
import { detectCurrentProvider } from '../../core/ethereum';

/**
 * NFT 민팅을 할 수 있는 페이지 컴포넌트
 * @returns
 */

const Mint = () => {
  const { data: account } = useSelector(selectors.accountState);
  const [file, setFile] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const fileRegist = (e) => {
    let tempFile = e.target.files[0];
    if (!tempFile) return;

    let maxSize = 200 * 1024 * 1024;
    if (maxSize <= tempFile.size) {
      alert('파일 용량은 200MB 이내로 등록 가능합니다.');
      return;
    }
    URL.revokeObjectURL(file);
    setFile(tempFile);
    setIsVideo(tempFile.type == 'video/mp4');
    const fileURL = URL.createObjectURL(tempFile);
    setPreview(fileURL);
  };

  const isEmpty = useCallback(() => {
    return !file || title.trim() === '' || description.trim() === '';
  }, [file, title, description]);

  const submitMint = async () => {
    const currentProvider = detectCurrentProvider();
    if (!currentProvider) return;

    const accounts = await currentProvider.request({ method: 'eth_requestAccounts' });
    const currentWallet = accounts[0];

    const web3 = new Web3(currentProvider);
    const {
      CONTRACT_ABI: { NFT_ABI },
    } = ABI;

    const myTicketContract = new web3.eth.Contract(NFT_ABI, SSAFY_NFT_CONTRACT_ADDRESS);
    console.log(currentWallet);
    try {
      const response = await myTicketContract.methods
        .create(currentWallet, 'asdfsadf', 'asdasd')
        .send({ from: currentWallet });
      console.log(response);

      if (response.status) {
        const tokenId = response.events.Transfer.returnValues.tokenId;
        console.log(`발행한 tokenId: ${tokenId}`);
        const balanceLength = await myTicketContract.methods.balanceOf(account).call();
        console.log(`해당 주소가 보유하고있는 NFT 토큰의 개수: ${balanceLength}`);
      }
    } catch (err) {
      console.error(err);
    }

    const nowWalletAddress = account.walletAddress;
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async (e) => {
      const fileResult = e.target.result;
      await getHash(Buffer(fileResult))
        .then(({ fileHash, tokenUriHash }) => {
          console.log(fileHash, tokenUriHash);
          const tokenUri = `https://ipfs.io/ipfs/${tokenUriHash}`;
          return { fileHash, tokenUri };
        })
        .then(({ fileHash, tokenUri }) => {
          // mint함수 부르기
          if (fileHash && tokenUri) {
            //fileHash랑 tokenUri가 null이 아니어야 작동.
            sendMintTx(fileHash, tokenUri);
          }
        })
        .catch((err) => alert(err));
    };

    // ipfs로 file 업로드
    // ipfs로 tokenUri 생성
    const getHash = async (buffer) => {
      try {
        const uploadResult = await Ipfs.add(buffer);
        const fileHash = uploadResult.path;

        if (fileHash) {
          console.log(`hash: ${fileHash}`);
          // metadata생성하기

          const timeData = await Axios.get('https://worldtimeapi.org/api/timezone/Asia/Seoul', {
            headers: {
              'Content-type': 'application/json',
            },
          });
          console.log(timeData.data.datetime);
          let time = new Date(timeData.data.datetime);
          console.log(time);

          const metadata = {
            title,
            description,
            hash: fileHash,
            image: `https://ipfs.io/ipfs/${fileHash}`,
            author: account,
            create_date: timeData,
          };
          // tokenUri생성하기
          const tokenUriHash = await Ipfs.add(JSON.stringify(metadata)).then((res) => {
            console.log(`tokenUri: ${res.path}`);
            return res.path;
          });
          return { fileHash, tokenUriHash };
        }
      } catch (e) {
        console.log(e);
        return;
      }
    };

    // NFT 컨트랙트 실행
    const sendMintTx = async (fileHash, tokenUri) => {
      if (fileHash && tokenUri) {
        const nonce = await web3.eth.getTransactionCount(nowWalletAddress, 'latest');
        const tx = {
          from: nowWalletAddress,
          to: SSAFY_NFT_CONTRACT_ADDRESS,
          nonce: nonce.toString(),
          gas: '1000000',
          data: getSsafyNftContract.methods
            .create(nowWalletAddress, fileHash, tokenUri)
            .encodeABI(),
        };

        tx;
        // console.log(ssafyNftContract);

        // if (ssafyNftContract) return;

        // // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // console.log(accounts);
        // const signer = await provider.getSigner();
        // console.log('Account:', await signer.getAddress());

        // signer;
        // // mintNFT;
        // await signer.signTransaction(tx).then((signedTx) => {
        //   if (signedTx == null) throw new Error('TransactionSignFailedException');

        //   let tran = web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        //   tran
        //     .sendTransaction(tx)
        //     .then((res) => {
        //       console.log(res);
        //       const tokenId = ssafyNftContract.methods.current().call();
        //       return tokenId;
        //     })
        //     .then((res) => {
        //       handleSaveNFT(res, tokenUri);
        //       alert('NFT가 생성되었습니다!');
        //     })
        //     .catch((err) => {
        //       alert('에러 발생!');
        //       console.log(err);
        //     });
        // });

        // console.log(tx);
        // // mintNFT;
        // await web3.eth
        //   .sendTransaction(tx)
        //   .then((res) => {
        //     console.log(res);
        //     const tokenId = ssafyNftContract.methods.current().call();
        //     return tokenId;
        //   })
        //   .then((res) => {
        //     handleSaveNFT(res, tokenUri);
        //     alert('NFT가 생성되었습니다!');
        //   })
        //   .catch((err) => {
        //     alert('에러 발생!');
        //     console.log(err);
        //   });
        navigate();
      } else {
        console.log('fileHash, tokenUri 가 빈 값임');
      }
    };

    // request server with NFTInfo
    const handleSaveNFT = (tokenId, tokenUri) => {
      if (tokenId !== 0 && tokenUri !== '')
        Axios.post(
          `${API_URL}/nfts/items`,
          {
            id: tokenId,
            tokenUri: tokenUri,
            ownerAddress: nowWalletAddress,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(`err: ${err}`);
            // 만약 NFT생성은 완료 되었는데 서버전송에서 오류날 경우따로 DB저장 처리 가능한 함수 필요
          });
    };
    handleSaveNFT;
  };

  return (
    <PanelLayout title="작품 등록">
      <section className="container">
        <div className="Minter">
          <h1>작품 NFT 등록</h1>
          {'Connected Address: 지갑 주소 표시'}
          <br />
          <br />
          <br />
          <div>
            <h2>파일 업로드</h2>
            <div className="d-create-file mb-3">
              {file ? (
                !isVideo ? (
                  <img src={preview} style={{ width: '100%', height: '100%' }}></img>
                ) : (
                  <video src={preview} autoPlay style={{ width: '100%', height: '100%' }}></video>
                )
              ) : (
                <></>
              )}
              <p id="file_name">PNG, JPG, GIF, WEBP, MP4 확장자만 200MB 이내로 추가해주세요</p>
              <p>{file && file.name}</p>
              <div className="browse">
                <input type="button" id="get_file" className="btn-main" value="파일 찾기" />
                <input
                  id="upload_file"
                  type="file"
                  accept=".png,.jpg,.jpeg,.gif,.webp,.mp4"
                  onChange={fileRegist}
                />
              </div>
            </div>
            <h2>제목</h2>
            <input
              className="form-control"
              type="text"
              placeholder="제목을 입력해주세요."
              onChange={(event) => setTitle(event.target.value)}
            />
            <h2>설명</h2>
            <input
              className="form-control"
              type="text"
              placeholder="작품 설명을 작성해주세요."
              onChange={(event) => setDescription(event.target.value)}
            />
            {isEmpty() && <span>모든 항목을 입력해주세요</span>}
            {!isEmpty() && (
              <>
                <span>NFT Name: {title}</span>
                <br />
                <br />
                <button type="button" id="mintButton" className="btn-main" onClick={submitMint}>
                  작품 등록
                </button>
                <br />
              </>
            )}
          </div>
        </div>
      </section>
    </PanelLayout>
  );
};

export default Mint;
