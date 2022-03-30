import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import PanelLayout from '../../components/layout/PanelLayout';
import { web3, ssafyTokenContract, SSAFY_TOKEN_CONTRACT_ADDRESS } from '../../contracts';

// 내 계좌
const Account = '0x019fd08EBA0560271EDd8821fd07483a6dC38e74';
// 내 계좌 privatekey
const PrivateKey = '0x888804e3288b1f2a0455ed136e1a2c7d55c837d6afe690eb3cab2192b91d6843';

function Main() {
  //set params
  const [receiverAddress, setReceiverAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  const { data: account } = useSelector(selectors.accountState);

  const tokenAddress = SSAFY_TOKEN_CONTRACT_ADDRESS;

  //transfer eth from one account to other
  async function transfer() {
    //get nonce
    const nonce = await web3.eth.getTransactionCount(Account, 'latest');
    const value = parseInt(transferAmount);

    // create transaction data
    const data = ssafyTokenContract.methods.transfer(receiverAddress, value).encodeABI();

    //prepare transaction. fields - to, value, gasPrice, gasLimit, nonce
    const transaction = {
      to: tokenAddress,
      value: '0x00', // used only for eth transfer else 0
      gasLimit: 6721975, //changed after EIP-1559 upgrade
      gasPrice: 0, //changed after EIP-1559 upgrade
      nonce: nonce,
      data: data, //transaction data
    };

    //create signed transaction
    const signTrx = await web3.eth.accounts.signTransaction(transaction, PrivateKey);
    //send signed transaction
    web3.eth.sendSignedTransaction(signTrx.rawTransaction, function (error, hash) {
      if (error) {
        console.log('Something went wrong', error);
      } else {
        console.log('transaction submitted ', hash);
        window.alert('후원을 성공했습니다. Hash : ' + hash);
      }
    });
  }

  return (
    <PanelLayout title="후원">
      <section className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 offset-lg-1 mb-5">
            <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <div className="spacer-single"></div>

                <h5>후원 계좌</h5>
                <div className="de_tab tab_methods">
                  <input
                    type="text"
                    name="account_address"
                    id="account_address"
                    className="form-control"
                    onChange={(event) => setReceiverAddress(event.target.value)}
                    // placeholder="후원을 할 사람의 계좌를 입력하세요. (이후에는 데이터를 들고오게 할 것)"
                    // {Todo : 지금 현재는 자신의 주소를 들고오는 데 이건 프로필에서 눌렀을때 가져오도록 해야 함}
                    value={account.walletAddress}
                  />

                  <div className="de_tab_content pt-3">
                    <h5>후원 금액 (SSF)</h5>
                    <input
                      type="text"
                      name="item_price"
                      id="item_price"
                      className="form-control"
                      onChange={(event) => setTransferAmount(event.target.value)}
                      placeholder="후원 금액을 입력해주세요."
                    />
                  </div>
                </div>
                <div className="spacer-20"></div>
                <button type="submit" onClick={() => transfer()}>
                  후원하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </PanelLayout>
  );
}
export default Main;
