import Keycloak from 'keycloak-js';
import axios from 'axios';

const keycloakConfig = {
  url: 'http://localhost:7080',
  realm: 'master',
  clientId: 'xianwei-ecommerce-monolith-client',
  redirectUri: 'http://localhost:3000',  // Ensure this matches your application URL
};

let keycloakInstance = null;
let isKeycloakInitialized = false;

const initKeycloak = (onAuthenticatedCallback) => {
  if (!isKeycloakInitialized) {
    keycloakInstance = new Keycloak({
      url: keycloakConfig.url,
      realm: keycloakConfig.realm,
      clientId: keycloakConfig.clientId,
      checkLoginIframe: false, // Disable third-party cookies check
    });
    isKeycloakInitialized = true; // Set flag after initialization
  }

  keycloakInstance.init({
    onLoad: 'login-required',
    pkceMethod: 'S256',
    redirectUri: keycloakConfig.redirectUri,  // Set redirectUri
    checkLoginIframe: false, // Disable third-party cookies check
  }).then(authenticated => {
    if (authenticated) {
      onAuthenticatedCallback();
    } else {
      console.warn('User is not authenticated');
    }
  }).catch(err => {
    console.error('Failed to initialize Keycloak', err);
  });

  return keycloakInstance;
};

const getKeycloakInstance = () => keycloakInstance;

const getAdminToken = async () => {
  try {
    const params = new URLSearchParams();
    params.append('client_id', 'admin-cli'); // Use 'admin-cli' to authenticate as an admin
    params.append('username', 'admin'); // Replace with your admin username
    params.append('password', 'admin'); // Replace with your admin password
    params.append('grant_type', 'password');

    const response = await axios.post(`${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`, params);
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to get admin token:', error);
    throw error;
  }
};

export { keycloakConfig, initKeycloak, getKeycloakInstance, getAdminToken };

