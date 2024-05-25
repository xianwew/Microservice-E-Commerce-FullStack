import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: 'http://localhost:7080',
    realm: 'master',
    clientId: 'xianwei-ecommerce-monolith-client',
};

export const keycloakInstance = new Keycloak(keycloakConfig);

export const initializeKeycloak = () => {
    return keycloakInstance.init({
        checkLoginIframe: false,
    });
};

export const doLogin = keycloakInstance.login;
export const doLogout = keycloakInstance.logout;
export const getToken = () => keycloakInstance.token;
export const isLoggedIn = () => keycloakInstance.authenticated; 

export default keycloakInstance;



