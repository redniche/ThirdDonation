import { useCallback, useState, useEffect } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { API_URL, Axios } from './../../core/axios';
import { Ipfs } from './../../core/ipfs';
import { web3, SsafyNftContract, SSAFY_NFT_CONTRACT_ADDRESS } from '../../contracts';
import { useNavigate } from '@reach/router';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';

Ipfs;
Axios;
/**
 * NFT 민팅을 할 수 있는 페이지 컴포넌트
 * @returns
 */
const Mint = () => {
  // export default class Minter extends Component {
  // constructor() {
  //   super();
  //   this.onChange = this.onChange.bind(this);
  //   this.state = {
  //     files: [],
  //     title: '',
  //     author: '',
  //     description: '',
  //   };
  //   console.log(this.state.title);
  // }
  const { data: account } = useSelector(selectors.accountState);
  const [file, setFile] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  //리덕스로 유저 정보를 가져와야할듯.
  //이건 테스트용 코드고 실제 메타데이터는 제출시 const로 생성.
  var nft_metadata;
  useEffect(() => {
    nft_metadata = {
      title: title,
      description: description,
    };
    console.log(JSON.stringify(nft_metadata));
  });
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
    const nowWalletAddress = account.walletAddress;
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async (e) => {
      const fileResult = e.target.result;
      await getHash(Buffer(fileResult))
        .then((fileHash, tokenUriHash) => {
          const tokenUri = `https://ipfs.io/ipfs/${tokenUriHash}`;
          return fileHash, tokenUri;
        })
        .then((fileHash, tokenUri) => {
          // mint함수 부르기
          if (fileHash && tokenUri) {
            //fileHash랑 tokenUri가 null이 아니어야 작동.
            sendTransaction(tokenUri);
          }
        })
        .catch((err) => alert(err));
    };
    console.log(JSON.stringify(nft_metadata));

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
          // metadataURI생성하기
          const tokenUriHash = Ipfs.add(JSON.stringify(metadata)).then((res) => {
            console.log(`metaUri: ${res.path}`);
            return res.path;
          });
          return fileHash, tokenUriHash;
        }
      } catch (e) {
        console.log(e);
        return;
      }
    };

    // NFT 컨트랙트 실행
    const sendTransaction = async (fileHash, tokenUri) => {
      const nonce = await web3.eth.getTransactionCount(nowWalletAddress, 'latest');
      const tx = {
        from: nowWalletAddress,
        to: SSAFY_NFT_CONTRACT_ADDRESS,
        nonce: nonce,
        gas: 0,
        data: SsafyNftContract.methods.create(nowWalletAddress, fileHash, tokenUri).encodeABI(),
      };
      // mintNFT
      await web3.eth
        .sendTransaction(tx)
        .then((res) => {
          console.log(res);
          const tokenId = SsafyNftContract.methods.getTokenId().call();
          return tokenId;
        })
        .then((res) => {
          handleSaveNFT(res, tokenUri);
        })
        .catch((err) => {
          console.log(err);
        });
      alert('NFT가 생성되었습니다!');
      useNavigate('/');
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
            {/* <h2>Link to image asset: </h2> */}
            {/* <input
              className="form-control"
              type="text"
              placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
            /> */}
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
