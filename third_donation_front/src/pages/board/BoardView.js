import { useEffect, useState } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { useParams } from '@reach/router';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import { Link } from '@reach/router';
import { Axios } from '../../core/axios';

// import { Table } from 'react-bootstrap';

import { Viewer } from '@toast-ui/react-editor';
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';

import '@toast-ui/editor/dist/toastui-editor.css';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

const BoardView = ({ navigate }) => {
  const { data: wallet } = useSelector(selectors.accountState);
  const [article, setArticle] = useState(null);

  const no = useParams().no;

  function getArticle() {
    Axios.get('/board/article/detail', {
      params: {
        articleId: no,
      },
    })
      .then((data) => data)
      .then(async (res) => {
        setArticle(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log('에러 발생' + err);
      });
  }

  function Delete() {
    Axios.delete('/board/article', {
      params: {
        articleId: no,
        userId: 11,
      },
    })
      .then(async () => {
        navigate('/notice');
      })
      .catch((err) => {
        console.log('에러 발생' + err);
      });
  }

  const thStyle = {
    // width: '30%',
    padding: '30px 0',
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <PanelLayout title="공지사항">
      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            {article ? (
              <>
                {/* <table className="table de-table table-rank"> */}
                <table className="table-notice">
                  <tbody>
                    <tr className="table-notice-tr">
                      <th style={thStyle}>제목</th>
                      <td>{article.title}</td>
                    </tr>
                    <tr className="table-notice-tr">
                      <th style={thStyle}>작성자</th>
                      <td>{article.user.username}</td>
                    </tr>
                    <tr className="table-notice-tr">
                      <th style={thStyle}>작성일</th>
                      <td>{article.dateCreated.substr(0, 10)}</td>
                    </tr>
                    <tr className="table-notice-content">
                      <td colSpan={2}>
                        <section className="containerWrap">
                          {article.contentText && (
                            <Viewer
                              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                              initialValue={article.contentText}
                              // initialValue="가나다라마바사"
                            />
                          )}
                        </section>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-end mt-3">
                  {wallet != null && wallet.authority == 'ADMIN' && (
                    <button className="btn-grey" onClick={() => Delete()}>
                      삭제
                    </button>
                  )}
                  <Link to="/notice">
                    <button className="ms-3 btn-main">목록</button>
                  </Link>
                </div>
              </>
            ) : (
              '해당 게시글을 찾을 수 없습니다.'
            )}
          </div>
        </div>
      </section>
    </PanelLayout>
  );
};

export default BoardView;
