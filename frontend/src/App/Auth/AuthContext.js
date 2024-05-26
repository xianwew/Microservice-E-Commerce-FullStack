import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { keycloakInstance, KEYCLOAK_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRET } from './keycloak';
import { useDispatch } from 'react-redux';
import { setAuthenticated, logout as reduxLogout } from '../redux/slice/authSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        keycloakInstance.init({ onLoad: 'check-sso', promiseType: 'native' }).then(authenticated => {
            setIsAuthenticated(authenticated);
            if (authenticated) {
                setToken(keycloakInstance.token);
                dispatch(setAuthenticated({ isAuthenticated: true, token: keycloakInstance.token }));
            }
            console.log('keycloak initialized!');
        }).catch(error => {
            console.error('Error initializing Keycloak', error);
        });

        keycloakInstance.onAuthSuccess = () => {
            setIsAuthenticated(true);
            setToken(keycloakInstance.token);
        };

        keycloakInstance.onAuthError = () => {
            setIsAuthenticated(false);
            setToken(null);
        };

        keycloakInstance.onAuthLogout = () => {
            setIsAuthenticated(false);
            setToken(null);
        };

        keycloakInstance.onTokenExpired = () => {
            keycloakInstance.updateToken(30).then(refreshed => {
                if (refreshed) {
                    setToken(keycloakInstance.token);
                }
            }).catch(() => {
                console.error('Failed to refresh token');
                setIsAuthenticated(false);
                setToken(null);
            });
        };
    }, []);

    const login = async (username, password) => {
        const response = await axios.post(`${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`, new URLSearchParams({
            client_id: KEYCLOAK_CLIENT_ID,
            client_secret: KEYCLOAK_CLIENT_SECRET,
            username,
            password,
            grant_type: 'password'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.status === 200) {
            console.log('Login successful', response.data);
            setToken(response.data.access_token);
            setIsAuthenticated(true);
            dispatch(setAuthenticated({ isAuthenticated: true, token: response.data.access_token }));
        } else {
            console.error('Login failed', response.data);
        }
    };

    const logout = () => {
        keycloakInstance.logout();
        setIsAuthenticated(false);
        setToken(null);
        dispatch(reduxLogout());
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);




