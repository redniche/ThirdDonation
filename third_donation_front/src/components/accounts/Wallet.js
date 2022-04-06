import { getSsafyToeknContract } from '../../contracts';
import { useSelector } from 'react-redux';
import { memo, useState, useEffect } from 'react';
import * as selectors from '../../store/selectors';
import { detectCurrentProvider } from '../../core/ethereum';

/**
 * 지갑에 관한 정보를 표시하는 컴포넌트
 * @returns
 */
const Wallet = () => {
  const [balance, setBalance] = useState('');
  const { data: account } = useSelector(selectors.accountState);

  const getBalance = async () => {
    const currentProvider = detectCurrentProvider();
    const ssafyTokenContract = getSsafyToeknContract(currentProvider);
    const balance = await ssafyTokenContract.methods.balanceOf(account.walletAddress).call();

    setBalance(balance);
  };

  const doCopy = (text) => {
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

  useEffect(() => {
    getBalance();
  }, [account]);

  return (
    <div className="">
      <span className="box-url2">
        <div className="d-flex mb-2 wallet-title">
          <p className="wallet-title-text">내 지갑</p>
        </div>
        <div>
          <div className="mb-2">
            <div className="content-title">잔액</div>
            <div className="mb-0">{balance ? `${balance} SSF` : '로딩 중'}</div>
          </div>
        </div>
        <div>
          <div className="d-wallet mb-0">
            <div className="content-title">주소</div>
            <span id="wallet" className="d-wallet-address">
              {account.walletAddress}
            </span>
            <button
              id="btn_copy"
              title="지갑 주소 복사"
              onClick={() => doCopy(account.walletAddress)}>
              Copy
            </button>
          </div>
        </div>
      </span>
    </div>
  );
};
export default memo(Wallet);
