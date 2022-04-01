import { useEffect, useState } from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import '../../components/board/Board.css';
import { useParams } from '@reach/router';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import { Link } from '@reach/router';
import { Axios } from '../../core/axios';

import { Viewer } from '@toast-ui/react-editor';
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';

import '@toast-ui/editor/dist/toastui-editor.css';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

const BoardView = () => {
  const { data: wallet } = useSelector(selectors.accountState);
  const [article, setArticle] = useState({});

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
        window.location.href = '/notice';
      })
      .catch((err) => {
        console.log('에러 발생' + err);
      });
  }

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <PanelLayout title="상세정보">
      <section className="container">
        <div className="post-view-wrapper">
          {article ? (
            <div>
              <div className="post-view-row">
                <label>제목</label>
                <label>{article.title}</label>
              </div>
              <div className="post-view-row">
                <label>작성일</label>
                {/* <label>{article.dateCreated.substr(0, 10)}</label> */}
                <label>{article.dateCreated}</label>
              </div>
              <div className="post-view-row">
                <label>수정일</label>
                {article.dateLastUpdated != null && <label>{article.dateLastUpdated}</label>}
                {/* <label>{article.dateLastUpdated.substr(0, 10)}</label> */}
              </div>
              <div className="post-view-row">
                <label>조회수</label>
                <label>{article.views}</label>
              </div>
              <section className="containerWrap">
                {article.contentText && (
                  <Viewer
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                    initialValue={article.contentText}
                    // initialValue="가나다라마바사"
                  />
                )}
              </section>
            </div>
          ) : (
            '해당 게시글을 찾을 수 없습니다.'
          )}
          <Link to="/notice">
            <button className="post-view-go-list-btn">목록으로 돌아가기</button>
          </Link>

          {/* 관리자인지 확인하는 구문 */}
          {wallet != null && wallet.authority == 'ADMIN' && (
            <button className="post-view-delete-btn" onClick={() => Delete()}>
              삭제하기
            </button>
          )}
        </div>
      </section>
    </PanelLayout>
  );
};

export default BoardView;
