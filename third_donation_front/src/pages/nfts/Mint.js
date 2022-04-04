import { useCallback, useState } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import apis, { Axios, API_TIME_SOURCE } from './../../core/axios';
import ipfs_apis, { Ipfs } from './../../core/ipfs';
import { getSsafyNftContract } from '../../contracts';
import { useNavigate } from '@reach/router';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import { detectCurrentProvider } from '../../core/ethereum';

/**
 * NFT 민팅을 할 수 있는 페이지 컴포넌트
 *
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

  /**
   * 파일 추가 버튼 onClick시 이벤트 동작부.
   *
   * @param {} e event
   * @returns
   */
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

  /**
   * 모든 입력값이 채워져있는지 보는 메서드.
   *
   */
  const isEmpty = useCallback(() => {
    return !file || title.trim() === '' || description.trim() === '';
  }, [file, title, description]);

  /**
   * 민팅 버튼 onClick시 이벤트 동작부.
   *
   * @returns
   */
  const submitMint = async () => {
    const currentProvider = detectCurrentProvider();
    if (!currentProvider) return;

    const accounts = await currentProvider.request({ method: 'eth_requestAccounts' });

    const nowWalletAddress = accounts[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const fileResult = e.target.result;
      getHash(Buffer(fileResult), file.type)
        .then(({ fileHash, tokenUriHash, metadata }) => {
          console.log(fileHash, tokenUriHash);
          return { fileHash, tokenUriHash, metadata };
        })
        .then(({ fileHash, tokenUriHash, metadata }) => {
          // mint함수 부르기
          if (fileHash && tokenUriHash) {
            //fileHash랑 tokenUri가 null이 아니어야 작동.
            sendMintTx(fileHash, tokenUriHash, metadata)
              .then((result) => {
                if (result) {
                  alert('NFT 생성에 성공했습니다!');
                  navigate('/');
                } else {
                  alert('NFT 생성에 실패했습니다');
                }
              })
              .catch(() => {
                alert('NFT 생성에 실패했습니다');
              });
          } else {
            alert('NFT 생성에 실패했습니다');
          }
        })
        .catch((err) => alert(err));
    };

    /**
     * buffer를 ipfs로 file 업로드.
     * ipfs로 tokenUri 생성
     *
     * @param {Buffer} buffer Buffer값
     * @returns
     */
    const getHash = async (buffer, type) => {
      try {
        const uploadResult = await Ipfs.add(buffer);
        const fileHash = uploadResult.path;

        if (fileHash) {
          console.log(`hash: ${fileHash}`);
          // metadata생성하기

          const timeData = await Axios.get(API_TIME_SOURCE, {
            headers: {
              'Content-type': 'application/json',
            },
          });
          let time = new Date(timeData.data.datetime);

          // {
          //   "title": "브이",
          //   "description": "브이",
          //   "hash": "QmVegiU99WMHqkEuS8awdn496upfwozoMCrCq7Z4QhWnsT",
          //   "type": "video/mp4"
          //   "file": "ipfs://QmVegiU99WMHqkEuS8awdn496upfwozoMCrCq7Z4QhWnsT",
          //   "artist": {
          //     "id": 11,
          //     "name": "Unnamed",
          //     "walletAddress": "0x019fd08eba0560271edd8821fd07483a6dc38e74",
          //     "create_date": "2022-03-28T11:15:36.547171"
          //   },
          //   "create_date": "2022-04-01T02:25:31.364Z"
          // }
          const artist = {
            id: account.id,
            name: account.username,
            walletAddress: account.walletAddress,
            create_date: account.dateCreated,
          };
          const metadata = {
            title,
            description,
            hash: fileHash,
            type,
            file: `ipfs://${fileHash}`,
            artist,
            create_date: time,
          };
          // tokenUri생성하기
          const tokenUriHash = await Ipfs.add(JSON.stringify(metadata)).then((res) => {
            console.log(`tokenUri: ${res.path}`);
            return res.path;
          });
          return { fileHash, tokenUriHash, metadata };
        }
      } catch (e) {
        console.log(e);
        return;
      }
    };

    // NFT 컨트랙트 실행
    /**
     * 생성된 fileHash와 tokenUri를 민팅할 때 사용한다.
     * 민팅시에 해당 값이 중복됐는지 체크함.
     *
     * @param {String} fileHash
     * @param {String} tokenUri
     * @returns
     */
    const sendMintTx = async (fileHash, tokenUriHash, metadata) => {
      if (fileHash && tokenUriHash) {
        const ipfsTokenUri = `${ipfs_apis.ipfs}${tokenUriHash}`;
        const ssafyNftContract = getSsafyNftContract(currentProvider);
        try {
          //ipfsTokenUri로 NFT민팅
          const response = await ssafyNftContract.methods
            .create(nowWalletAddress, fileHash, ipfsTokenUri)
            .send({ from: nowWalletAddress });
          if (response.status) {
            const tokenId = response.events.Transfer.returnValues.tokenId;

            if (tokenId !== 0 && tokenUriHash !== '') {
              try {
                await handleSaveNFT(tokenId, ipfsTokenUri, metadata);
                return true;
              } catch (error) {
                console.log(error);
                return false;
              }
            }
            return false;
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    /**
     * 민팅 종료시 이를 백엔드에 저장한다.
     * @param {String} tokenId
     * @param {String} ipfsTokenUri
     */
    const handleSaveNFT = (tokenId, ipfsTokenUri, metadata) =>
      Axios.post(
        apis.nfts.items,
        {
          id: tokenId,
          tokenUri: ipfsTokenUri,
          ownerAddress: nowWalletAddress,
          fileType: isVideo ? 'video' : 'image',
          name: metadata.title,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
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
