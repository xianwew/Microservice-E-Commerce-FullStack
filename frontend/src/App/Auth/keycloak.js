import Keycloak from 'keycloak-js';

export const KEYCLOAK_URL = 'http://localhost:8080';
export const KEYCLOAK_REALM = 'XianweiECommerce';
export const KEYCLOAK_CLIENT_ID = 'xianwei-ecommerce';
export const KEYCLOAK_CLIENT_SECRET = 'g5HFcWL6MHBFnrAe9FO0HhlMipOHzFNZ';

let initOptions = {
    url: KEYCLOAK_URL,
    realm: KEYCLOAK_REALM,
    clientId: KEYCLOAK_CLIENT_ID,
    onLoad: 'check-sso',
    KeycloakResponseType: 'code'
}


export const keycloakInstance = new Keycloak(initOptions);