import React from 'react';

import PanelLayout from '../../components/layout/PanelLayout';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

// code-syntax-highlight
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

// color-syntax
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import { Axios } from '../../core/axios';

import { useState } from 'react';
import { Link } from '@reach/router';

const editorRef = React.createRef();

// const onChangeEditorTextHandler = () => {
//   // // console.log(editorRef);
//   console.log(editorRef.current.getInstance().getMarkdown());
//   // console.log(editorRef.getMarkdown());
// };

/**
 * NFT 민팅을 할 수 있는 페이지 컴포넌트
 * @returns
 */
const WrtieNotice = () => {
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  function write() {
    Axios.post(
      '/board/article',
      {
        categoryName: '공지사항',
        contentText: editorRef.current.getInstance().getMarkdown(),
        title: text,
        userId: 11,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(() => {
        // console.log(res);
        window.location.href = '/notice';
      })
      .catch((err) => {
        console.log('에러발생' + err);
      });
  }

  return (
    <PanelLayout title="공지사항 작성">
      <section className="container">
        <div className="Notice">
          <div>
            <div>
              <input
                type="title"
                id="title"
                className="form-control"
                onChange={onChange}
                placeholder="제목을 입력하세요."></input>
              <Editor
                previewStyle="vertical"
                height="79vh"
                initialEditType="markdown"
                ref={editorRef}
                toolbarItems={[
                  ['heading', 'bold', 'italic', 'strike'],
                  ['hr', 'quote'],
                  ['ul', 'ol', 'task', 'indent', 'outdent'],
                  ['table', 'link'],
                  ['code', 'codeblock'],
                ]}
                plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
                // onChange={onChangeEditorTextHandler}
              />
              <button
                variant="primary"
                type="submit"
                className="post-view-go-list-btn"
                onClick={() => write()}>
                등록하기
              </button>
              <Link to="/notice">
                <button variant="primary" className="post-view-delete-btn">
                  등록취소
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PanelLayout>
  );
};

export default WrtieNotice;
