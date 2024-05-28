import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { keycloakInstance, KEYCLOAK_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRET } from './keycloak';
import { useDispatch } from 'react-redux';
import { setAuthenticated, logout as reduxLogout } from '../redux/slice/authSlice';
import { decodeToken } from './JwtUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const refresh = async () => {
        try {
            await keycloakInstance.updateToken(30);
            const newToken = keycloakInstance.token;
            const newRefreshToken = keycloakInstance.refreshToken;
            setToken(newToken);
            setRefreshToken(newRefreshToken);
            localStorage.setItem('token', newToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            dispatch(setAuthenticated({ isAuthenticated: true, token: newToken }));
            const tokenParsed = keycloakInstance.tokenParsed;
            if (tokenParsed) {
                setTimeout(refresh, (tokenParsed.exp * 1000) - Date.now() - 60000); // Schedule the next refresh
            }
        } catch (error) {
            console.error('Failed to refresh token', error);
            handleLogout(false); // Prevents page reload on token refresh failure
        }
    };

    useEffect(() => {
        const initializeKeycloak = async () => {
            if (token && refreshToken) {
                keycloakInstance.token = token;
                keycloakInstance.refreshToken = refreshToken;
                setIsAuthenticated(true);
                setLoading(false);
                dispatch(setAuthenticated({ isAuthenticated: true, token }));
                const tokenParsed = keycloakInstance.tokenParsed;
                if (tokenParsed) {
                    setTimeout(refresh, (tokenParsed.exp * 1000) - Date.now());
                }
            } else {
                try {
                    const authenticated = await keycloakInstance.init({ onLoad: 'check-sso' });
                    if (authenticated) {
                        const newToken = keycloakInstance.token;
                        const newRefreshToken = keycloakInstance.refreshToken;
                        setToken(newToken);
                        setRefreshToken(newRefreshToken);
                        localStorage.setItem('token', newToken);
                        localStorage.setItem('refreshToken', newRefreshToken);
                        setIsAuthenticated(true);
                        dispatch(setAuthenticated({ isAuthenticated: true, token: newToken }));
                        const tokenParsed = keycloakInstance.tokenParsed;
                        if (tokenParsed) {
                            setTimeout(refresh, (tokenParsed.exp * 1000) - Date.now());
                        }
                        console.log('Logged in!');
                    } else {
                        handleLogout(false); // Prevents page reload if not authenticated
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
            const newToken = keycloakInstance.token;
            const newRefreshToken = keycloakInstance.refreshToken;
            setToken(newToken);
            setRefreshToken(newRefreshToken);
            localStorage.setItem('token', newToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            setIsAuthenticated(true);
            dispatch(setAuthenticated({ isAuthenticated: true, token: newToken }));
            const tokenParsed = keycloakInstance.tokenParsed;
            if (tokenParsed) {
                setTimeout(refresh, (tokenParsed.exp * 1000) - Date.now());
            }
        };

        keycloakInstance.onAuthError = () => handleLogout(true);
        keycloakInstance.onAuthLogout = () => handleLogout(true);

        keycloakInstance.onTokenExpired = () => {
            keycloakInstance.updateToken(30).then(refreshed => {
                if (refreshed) {
                    const newToken = keycloakInstance.token;
                    const newRefreshToken = keycloakInstance.refreshToken;
                    setToken(newToken);
                    setRefreshToken(newRefreshToken);
                    localStorage.setItem('token', newToken);
                    localStorage.setItem('refreshToken', newRefreshToken);
                    dispatch(setAuthenticated({ isAuthenticated: true, token: newToken }));
                    const tokenParsed = keycloakInstance.tokenParsed;
                    if (tokenParsed) {
                        setTimeout(refresh, (tokenParsed.exp * 1000) - Date.now());
                    }
                }
            }).catch(() => handleLogout(true));
        };
    }, [dispatch, token, refreshToken]);

    const handleLogout = (shouldReload) => {
        setIsAuthenticated(false);
        setToken(null);
        setRefreshToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        dispatch(reduxLogout());
        if (shouldReload) {
            window.location.reload(); // Trigger a page reload after logout
        }
    };

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
            const newToken = response.data.access_token;
            const newRefreshToken = response.data.refresh_token;
            setToken(newToken);
            setRefreshToken(newRefreshToken);
            localStorage.setItem('token', newToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            setIsAuthenticated(true);
            dispatch(setAuthenticated({ isAuthenticated: true, token: newToken }));
            const tokenParsed = keycloakInstance.tokenParsed;
            if (tokenParsed) {
                setTimeout(refresh, (tokenParsed.exp * 1000) - Date.now());
            }
        } else {
            console.error('Login failed', response.data);
        }
    };

    const logout = async () => {
        await axios.post(`${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/logout`, new URLSearchParams({
            client_id: KEYCLOAK_CLIENT_ID,
            client_secret: KEYCLOAK_CLIENT_SECRET,
            refresh_token: refreshToken
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        handleLogout(true); 
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout, loading, refresh }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);