import axios from 'axios';

export default axios.create({
    baseURL: 'https://test-api.ab.kg:8443/realms/wallet-watcher/protocol/openid-connect/token'
});