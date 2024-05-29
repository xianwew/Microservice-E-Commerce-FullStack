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
        const currentRefreshToken = localStorage.getItem('refreshToken');
        if (!currentRefreshToken) {
            console.error('No refresh token available');
            return;
        }

        console.log('token refreshed!');
        try {
            const response = await axios.post(`${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`, new URLSearchParams({
                client_id: KEYCLOAK_CLIENT_ID,
                client_secret: KEYCLOAK_CLIENT_SECRET,
                grant_type: 'refresh_token',
                refresh_token: currentRefreshToken
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
                dispatch(setAuthenticated({ isAuthenticated: true, token: newToken }));

                const tokenParsed = decodeToken(newToken); // Assuming you have a parseJwt function
                if (tokenParsed) {
                    const timeout = (tokenParsed.exp * 1000) - Date.now() - 60000;
                    setTimeout(refresh, timeout);
                }
            } else {
                console.error('Token refresh failed', response.data);
                handleLogout(false); // Optionally handle automatic logout if refresh fails
            }
        } catch (error) {
            console.error('Error refreshing token', error);
            handleLogout(false); // Optionally handle automatic logout if refresh fails
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

                const tokenParsed = decodeToken(token);
                if (tokenParsed) {
                    const timeout = (tokenParsed.exp * 1000) - Date.now() - 60000; // Refresh 1 minute before expiry
                    setTimeout(refresh, timeout);
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

                    } else {
                        handleLogout(false);
                    }
                    setLoading(false);
                    console.log('Keycloak initialized!');
                } catch (error) {
                    console.error('Error initializing Keycloak', error);
                    setLoading(false);
                }
            }
            
            const tokenParsed = decodeToken(token);
            if (tokenParsed) {
                const timeout = (tokenParsed.exp * 1000) - Date.now() - 60000; // Refresh 1 minute before expiry
                setTimeout(refresh, timeout);
            }
        };

        initializeKeycloak();
    }, [dispatch]);

    const handleLogout = (shouldReload) => {
        setIsAuthenticated(false);
        setToken(null);
        setRefreshToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        dispatch(reduxLogout());
        if (shouldReload) {
            window.location.reload();
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
            const tokenParsed = decodeToken(newToken);
            if (tokenParsed) {
                const timeout = (tokenParsed.exp * 1000) - Date.now() - 60000; // Refresh 1 minute before expiry
                setTimeout(refresh, timeout);
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
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout, loading, refresh, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);