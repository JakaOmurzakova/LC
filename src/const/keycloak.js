import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: 'https://test-api.ab.kg:8443/realms/wallet-watcher/protocol/openid-connect/token',
    clientId: 'wallet-watch-rest-api',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;