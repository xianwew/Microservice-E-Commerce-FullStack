import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { keycloakInstance, KEYCLOAK_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRET } from './keycloak';
import { useDispatch } from 'react-redux';
import { setAuthenticated, logout as reduxLogout } from '../redux/slice/authSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeKeycloak = async () => {
            if (token && refreshToken) {
                keycloakInstance.token = token;
                keycloakInstance.refreshToken = refreshToken;
                setIsAuthenticated(true);
                setLoading(false);
                dispatch(setAuthenticated({ isAuthenticated: true, token }));
            } 
            else {
                try {
                    const authenticated = await keycloakInstance.init({
                        onLoad: 'check-sso',
                    });
                    if (authenticated) {
                        const token = keycloakInstance.token;
                        const refreshToken = keycloakInstance.refreshToken;
                        setToken(token);
                        setRefreshToken(refreshToken);
                        localStorage.setItem('token', token);
                        localStorage.setItem('refreshToken', refreshToken);
                        setIsAuthenticated(true);
                        dispatch(setAuthenticated({ isAuthenticated: true, token }));
                        console.log('logged in!');
                    } else {
                        setIsAuthenticated(false);
                        setToken(null);
                        setRefreshToken(null);
                        localStorage.removeItem('token');
                        localStorage.removeItem('refreshToken');
                        dispatch(reduxLogout());
                        console.log('logged out!');
                    }
                    setLoading(false);
                    console.log('Keycloak initialized!');
                } catch (error) {
                    console.error('Error initializing Keycloak', error);
                    setLoading(false);
                }
            }
        };

        initializeKeycloak();

        keycloakInstance.onAuthSuccess = () => {
            const token = keycloakInstance.token;
            const refreshToken = keycloakInstance.refreshToken;
            setToken(token);
            setRefreshToken(refreshToken);
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            setIsAuthenticated(true);
            dispatch(setAuthenticated({ isAuthenticated: true, token }));
        };

        keycloakInstance.onAuthError = () => {
            setIsAuthenticated(false);
            setToken(null);
            setRefreshToken(null);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            dispatch(reduxLogout());
        };

        keycloakInstance.onAuthLogout = () => {
            setIsAuthenticated(false);
            setToken(null);
            setRefreshToken(null);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            dispatch(reduxLogout());
        };

        keycloakInstance.onTokenExpired = () => {
            keycloakInstance.updateToken(30).then(refreshed => {
                if (refreshed) {
                    const token = keycloakInstance.token;
                    const refreshToken = keycloakInstance.refreshToken;
                    setToken(token);
                    setRefreshToken(refreshToken);
                    localStorage.setItem('token', token);
                    localStorage.setItem('refreshToken', refreshToken);
                    dispatch(setAuthenticated({ isAuthenticated: true, token }));
                }
            }).catch(() => {
                console.error('Failed to refresh token');
                setIsAuthenticated(false);
                setToken(null);
                setRefreshToken(null);
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                dispatch(reduxLogout());
            });
        };
    }, [dispatch, token, refreshToken]);

    const login = async (username, password) => {
        try {
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
                const token = response.data.access_token;
                const refreshToken = response.data.refresh_token;
                setToken(token);
                setRefreshToken(refreshToken);
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                setIsAuthenticated(true);
                dispatch(setAuthenticated({ isAuthenticated: true, token }));
            } else {
                console.error('Login failed', response.data);
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/logout`, new URLSearchParams({
                client_id: KEYCLOAK_CLIENT_ID,
                client_secret: KEYCLOAK_CLIENT_SECRET,
                refresh_token: refreshToken
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            setIsAuthenticated(false);
            setToken(null);
            setRefreshToken(null);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            dispatch(reduxLogout());
            window.location.reload(); // Trigger a page reload after logout
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);