import Keycloak from 'keycloak-js';

const client = new Keycloak({
    url: 'http://localhost:8080/auth',
    realm: 'ptd-lite',
    clientId: 'user_panel',
});

export default client;