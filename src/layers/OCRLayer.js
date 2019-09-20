import axios from 'axios';

const ocrApi = axios.create({
    baseURL: 'https://api.ocr.space/parse',
    headers:{'apikey': 'ec942ea55a88957'},
  });

export default ocrApi;