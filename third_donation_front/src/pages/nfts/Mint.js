import React, { useCallback, useState } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';

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

  const [files, setFile] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  // function onChange(e) {
  //   var files = e.target.files;
  //   var filesArr = Array.prototype.slice.call(files);
  //   document.getElementById('file_name').style.display = 'none';
  //   // this.setState({ files: [...this.state.files, ...filesArr] });
  //   setFile(filesArr);
  // }
  const fileRegist = (e) => {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    console.log(filesArr);
    document.getElementById('file_name').style.display = 'none';
    // this.setState({ files: [...this.state.files, ...filesArr] });
    setFile(filesArr);
  };

  const isEmpty = useCallback(() => {
    return (
      files.length == 0 || title.trim() === '' || author.trim() === '' || description.trim() === ''
    );
  }, [files, title, author, description]);

  // render() {
  return (
    <PanelLayout>
      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">작품 등록</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="Minter">
          <h1>작품 NFT 등록</h1>
          {'Connected Address: 지갑 주소 표시'}
          <br />
          <br />
          <br />
          <form>
            {/* <h2>Link to image asset: </h2> */}
            {/* <input
              className="form-control"
              type="text"
              placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
            /> */}
            <h2>파일 업로드</h2>
            <div className="d-create-file mb-3">
              <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
              {files.map((x) => (
                <p key="{index}">{x.name}</p>
              ))}
              <div className="browse">
                <input type="button" id="get_file" className="btn-main" value="파일 찾기" />
                <input id="upload_file" type="file" multiple onChange={fileRegist} />
              </div>
            </div>
            <h2>제목</h2>
            <input
              className="form-control"
              type="text"
              placeholder="제목을 입력해주세요."
              onChange={(event) => setTitle(event.target.value)}
            />
            <h2>작가</h2>
            <input
              className="form-control"
              type="text"
              placeholder="작가명을 입력해주세요."
              onChange={(event) => setAuthor(event.target.value)}
            />
            <h2>설명</h2>
            <input
              className="form-control"
              type="text"
              placeholder="작품 설명을 작성해주세요."
              onChange={(event) => setDescription(event.target.value)}
            />
          </form>
          {isEmpty() && <span>모든 항목을 입력해주세요</span>}
          {!isEmpty() && (
            <>
              <span>NFT Name: {title}</span>
              <br />
              <br />
              <button id="mintButton" className="btn-main">
                작품 등록
              </button>
              <br />
            </>
          )}
        </div>
      </section>
    </PanelLayout>
  );
};

export default Mint;
