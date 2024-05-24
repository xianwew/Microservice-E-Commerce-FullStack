import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Tabs, Tab, Box } from '@mui/material';

const LoginDialog = ({ open, onClose }) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
            <DialogTitle id="form-dialog-title" sx={{textAlign: 'center', fontWeight: 'bold', fontSize: '36px'}}>Welcome</DialogTitle>
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
                        />
                        <TextField
                            margin="dense"
                            id="login-password"
                            label="Password"
                            type="password"
                            fullWidth
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
                        />
                        <TextField
                            margin="dense"
                            id="signup-password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="signup-confirm-password"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                        />
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{paddingRight: '25px', paddingBottom: '15px'}}>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onClose} color="primary">
                    {tabIndex === 0 ? 'Login' : 'Sign Up'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;
