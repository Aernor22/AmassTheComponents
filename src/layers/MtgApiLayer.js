import axios from 'axios';

const mtgApi = axios.create({
    baseURL: "https://api.magicthegathering.io/v1"
});

export default mtgApi;