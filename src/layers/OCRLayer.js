import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.ocr.space/parse',
    headers:{'apikey': 'ec942ea55a88957'},
  });

export default api;