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

function Notice() {
  window.location.href = '/notice';
}

const editorRef = React.createRef();

// const onChangeEditorTextHandler = () => {
//   console.log(editorRef.current.getInstance().getMarkdown());
// };

/**
 * NFT 민팅을 할 수 있는 페이지 컴포넌트
 * @returns
 */
const WrtieNotice = () => {
  return (
    <PanelLayout title="공지사항 작성">
      <section className="container">
        <div className="Notice">
          <div>
            <div>
              <textarea
                type="title"
                className="form-control"
                placeholder="제목을 입력하세요."></textarea>
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
                onClick={() => Notice()}>
                등록하기
              </button>
              <button variant="primary" className="post-view-delete-btn">
                등록취소
              </button>
            </div>
          </div>
        </div>
      </section>
    </PanelLayout>
  );
};

export default WrtieNotice;
