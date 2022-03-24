import axios from 'axios';

export const API_URL = 'http://j6e207.p.ssafy.io:32090/api';
export const Axios = axios.create();
export const Canceler = axios.CancelToken.source();
