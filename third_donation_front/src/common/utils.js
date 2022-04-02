export const extractColumn = (arr, column) => arr.map((x) => x[column]);

export const doCopy = (text) => {
  if (!document.queryCommandSupported('copy')) {
    return alert('복사하기가 지원되지 않는 브라우저입니다.');
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.top = 0;
  textarea.style.left = 0;
  textarea.style.position = 'fixed';

  document.body.appendChild(textarea);
  // focus() -> 사파리 브라우저 서포팅
  textarea.focus();
  // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
  textarea.select();

  document.execCommand('copy');

  document.body.removeChild(textarea);
  alert('지갑 주소가 클립보드에 복사되었습니다.');
};
