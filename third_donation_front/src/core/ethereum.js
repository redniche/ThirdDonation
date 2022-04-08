import { navigate } from '@reach/router';

export const connectWallet = () =>
  new Promise((resolve, reject) => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) =>
          resolve({
            walletInstalled: true,
            walletAddress: accounts[0],
          }),
        )
        .catch((error) => reject(error));
    } else {
      resolve({
        walletInstalled: false,
      });
    }
  });

export const detectCurrentProvider = () => {
  let provider;
  if (window.ethereum) {
    provider = window.ethereum;
    // ethereum 관련 아닐 때
  } else if (window.web3) {
    provider = window.web3.currentProvider;
    // metamask가 깔려있지 않을 때 -> 메타마스크 설치 페이지로 이동
  } else {
    alert('메타마스크를 설치하세요!');
    window.open(
      'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      '_blank',
    );
    navigate('/');
  }
  return provider;
};
