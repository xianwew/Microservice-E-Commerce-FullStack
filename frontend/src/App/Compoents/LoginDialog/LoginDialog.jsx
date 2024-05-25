import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Tabs, Tab, Box } from '@mui/material';
import { doLogin } from '../../keycloak/keycloak';
import keycloakInstance from '../../keycloak/keycloak';

const LoginDialog = ({ open, onClose }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

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
            const response = await fetch(`http://localhost:8080/api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: signupEmail,
                    password: signupPassword,
                    username: signupEmail.split('@')[0] 
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Sign up successful! You can now log in.");
                setTabIndex(0); 
            } else {
                const errorData = await response.json();
                alert(`Sign up failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert("Sign up failed. Please try again.");
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
