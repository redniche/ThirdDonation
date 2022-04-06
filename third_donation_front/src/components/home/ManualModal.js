import { Viewer } from '@toast-ui/react-editor';
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';

import '@toast-ui/editor/dist/toastui-editor.css';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

const ManualModal = (props) => {
  const { article, open, close, header } = props;

  console.log('들어옴');

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section style={{ width: '800px' }}>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            {article ? (
              <>
                <table className="table de-table table-rank">
                  <tbody>
                    <tr>
                      <td>
                        <section className="containerWrap">
                          {article.contentText && (
                            <Viewer
                              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                              initialValue={article.contentText}
                            />
                          )}
                        </section>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            ) : (
              '해당 게시글을 찾을 수 없습니다.'
            )}
          </main>
          <footer>
            <button className="close" onClick={close}>
              닫기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ManualModal;
