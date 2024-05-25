import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Tabs, Tab, Box } from '@mui/material';
import axios from 'axios';
import { getAdminToken, keycloakConfig } from '../../keycloak/keycloak';

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
  
    const handleLogin = async () => {
      try {
        const params = new URLSearchParams();
        params.append('client_id', keycloakConfig.clientId);
        params.append('grant_type', 'password');
        params.append('username', loginEmail);
        params.append('password', loginPassword);
  
        const response = await axios.post(`${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`, params);
        console.log('Login successful:', response.data);
        onClose();
      } catch (error) {
        console.error('Login error:', error);
      }
    };
  
    const handleSignUp = async () => {
      if (signupPassword !== signupConfirmPassword) {
        console.error('Passwords do not match');
        return;
      }
      try {
        const adminToken = await getAdminToken();
        const userResponse = await axios.post(
          `${keycloakConfig.url}/admin/realms/${keycloakConfig.realm}/users`,
          {
            username: signupEmail,
            email: signupEmail,
            enabled: true,
            credentials: [
              {
                type: 'password',
                value: signupPassword,
                temporary: false
              }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${adminToken}`
            }
          }
        );
        console.log('Sign-up successful:', userResponse.data);
        onClose();
      } catch (error) {
        console.error('Sign-up error:', error);
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