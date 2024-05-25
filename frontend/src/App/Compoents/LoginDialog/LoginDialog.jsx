import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Tabs, Tab, Box } from '@mui/material';
import { doLogin } from '../../keycloak/keycloak';
import keycloakInstance from '../../keycloak/keycloak';
import axios from 'axios';

const LoginDialog = ({ open, onClose }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
    const [signupUsername, setSignupUsername] = useState('');

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleLogin = () => {
        keycloakInstance.login({
            username: loginEmail,
            password: loginPassword,
            grant_type: 'password',
            client_id: keycloakInstance.clientId,
        });
    };

    const handleSignUp = async () => {
        if (signupPassword !== signupConfirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    
        try {
            const response = await axios.post(`http://localhost:8080/api/user`, {
                email: signupEmail,
                password: signupPassword,
                username: signupEmail // Use email as username
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (response.status === 201) {
                alert("Sign up successful! You can now log in.");
                setTabIndex(0); 
            } 
            else {
                alert(`Sign up failed: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error signing up:', error.response);
            alert(`Sign up failed: ${error.response ? error.response.data.message : 'Please try again.'}`);
        }
    };
    

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
            <DialogTitle id="form-dialog-title" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '36px' }}>Welcome</DialogTitle>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="login and sign up tabs">
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
                </Tabs>
            </Box>
            <DialogContent sx={{ minWidth: 400 }}>
                {tabIndex === 0 && (
                    <Box>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="login-email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="login-password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </Box>
                )}
                {tabIndex === 1 && (
                    <Box>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="signup-username"
                            label="Username"
                            type="text"
                            fullWidth
                            value={signupUsername}
                            onChange={(e) => setSignupUsername(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="signup-email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="signup-password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="signup-confirm-password"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            value={signupConfirmPassword}
                            onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        />
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ paddingRight: '25px', paddingBottom: '15px' }}>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={tabIndex === 0 ? handleLogin : handleSignUp} color="primary">
                    {tabIndex === 0 ? 'Login' : 'Sign Up'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;