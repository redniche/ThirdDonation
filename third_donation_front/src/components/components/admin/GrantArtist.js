import React, { useEffect, useState } from 'react';
import Footer from '../footer';
import { Table, Modal, Button } from 'react-bootstrap';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;
// 증명서 이미지 행 hover 이벤트 방지 설정 (작동 안 됨 - 수정 필요)
/* .table-hover > tbody > tr.anti-hover:hover > td,
  .table-hover > tbody > tr.anti-hover:hover > th {
    background: white;
  } */

// 테스트용 견본 모달. 승인, 거절 버튼 클릭시 재확인 창 띄울지 고민 중...
function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>승인하시겠습니까?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          취소
        </Button>
        <Button variant="primary">확인</Button>
      </Modal.Footer>
    </Modal>
  );
}

const GrantArtist = () => {
  const [data, setData] = useState([]);
  const [detailsShown, setDetailsShown] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  async function getData() {
    const result = await fetch('https://jsonplaceholder.typicode.com/users');
    const getResults = await result.json();
    setData(getResults);
  }

  useEffect(() => {
    getData();
  }, []);

  const toggleShown = (id) => {
    const shownState = detailsShown.slice();
    const index = shownState.indexOf(id);

    if (index >= 0) {
      shownState.splice(index, 1);
      setDetailsShown(shownState);
    } else {
      shownState.push(id);
      setDetailsShown(shownState);
    }
  };

  return (
    <div>
      <GlobalStyles />
      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${'../img/background/subheader.jpg'})` }}>
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">관리자 </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <Table responsive hover>
              <thead>
                <tr>
                  <th>이용자 번호</th>
                  <th>이름</th>
                  <th>장애인 등록번호</th>
                  <th>증명서</th>
                  <th>처리</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item) => (
                    <React.Fragment key={item.id}>
                      <tr className="align-middle">
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>
                          <button onClick={() => toggleShown(item.id)}>문서아이콘</button>
                        </td>
                        <td>
                          <input
                            type="button"
                            className="btn-main d-inline-block me-2"
                            value="승인"
                            onClick={() => setModalShow(true)}
                          />
                          <input type="button" className="btn-main d-inline-block" value="거절" />
                        </td>
                      </tr>
                      {detailsShown.includes(item.id) && (
                        <tr className="anti-hover">
                          <td colSpan={5}>증명서 이미지 여기다가 뿌린다 {item.website}</td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                {!data && (
                  <tr>
                    <td colSpan={5}>데이터가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </section>
      <Footer />
      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};
export default GrantArtist;
