import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/animated.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/elegant-icons/style.css';
import '../node_modules/et-line/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './assets/style.scss';
// 처음에 띄워줄 화면
import App from './components/app';

import reportWebVitals from './reportWebVitals';

// 템플릿에서는 이렇게 되어있는데 왜 안되는지 모르겠음
// //redux store
// import { Provider } from 'react-redux';
// import store from './store';

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root'),
// );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
