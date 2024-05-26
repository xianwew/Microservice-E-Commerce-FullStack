import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Tabs, Tab, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../Auth/AuthContext';
import { showSnackbar } from '../../redux/slice/snackbarSlice';
import axios from 'axios';

const LoginDialog = ({ open, onClose }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const { login } = useAuth();
    const dispatch = useDispatch();

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleLogin = async (values) => {
        try {
            await login(values.email, values.password);
            dispatch(showSnackbar({ open: true, message: 'Login successful!', severity: 'success' }));
            onClose();
        } catch (error) {
            dispatch(showSnackbar({ open: true, message: 'Login failed. Please check your credentials.', severity: 'error' }));
        }
    };

    const handleSignUp = async (values) => {
        if (values.password !== values.confirmPassword) {
            dispatch(showSnackbar({ open: true, message: "Passwords do not match!", severity: 'error' }));
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/user`, {
                email: values.email,
                password: values.password,
                username: values.username
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) {
                dispatch(showSnackbar({ open: true, message: 'Sign up successful! You can now log in.', severity: 'success' }));
                onClose();
            } else {
                dispatch(showSnackbar({ open: true, message: `Sign up failed: ${response.data.message}`, severity: 'error' }));
            }
        } catch (error) {
            dispatch(showSnackbar({ open: true, message: `Sign up failed: ${error.response ? error.response.data.message : 'Please try again.'}`, severity: 'error' }));
        }
    };

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
        }),
        onSubmit: handleLogin
    });

    const formikSignUp = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required')
        }),
        onSubmit: handleSignUp
    });

    const handleDialogClose = (event, reason) => {
        if (reason !== "backdropClick") {
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleDialogClose}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth
            disableEscapeKeyDown
        >
            <DialogTitle id="form-dialog-title" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '36px' }}>Welcome</DialogTitle>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="login and sign up tabs">
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
                </Tabs>
            </Box>
            <DialogContent sx={{ minWidth: 400 }}>
                {tabIndex === 0 && (
                    <Box component="form" onSubmit={formikLogin.handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="login-email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            {...formikLogin.getFieldProps('email')}
                            error={formikLogin.touched.email && Boolean(formikLogin.errors.email)}
                            helperText={formikLogin.touched.email && formikLogin.errors.email}
                        />
                        <TextField
                            margin="dense"
                            id="login-password"
                            label="Password"
                            type="password"
                            fullWidth
                            {...formikLogin.getFieldProps('password')}
                            error={formikLogin.touched.password && Boolean(formikLogin.errors.password)}
                            helperText={formikLogin.touched.password && formikLogin.errors.password}
                        />
                    </Box>
                )}
                {tabIndex === 1 && (
                    <Box component="form" onSubmit={formikSignUp.handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="signup-username"
                            label="Username"
                            type="text"
                            fullWidth
                            {...formikSignUp.getFieldProps('username')}
                            error={formikSignUp.touched.username && Boolean(formikSignUp.errors.username)}
                            helperText={formikSignUp.touched.username && formikSignUp.errors.username}
                        />
                        <TextField
                            margin="dense"
                            id="signup-email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            {...formikSignUp.getFieldProps('email')}
                            error={formikSignUp.touched.email && Boolean(formikSignUp.errors.email)}
                            helperText={formikSignUp.touched.email && formikSignUp.errors.email}
                        />
                        <TextField
                            margin="dense"
                            id="signup-password"
                            label="Password"
                            type="password"
                            fullWidth
                            {...formikSignUp.getFieldProps('password')}
                            error={formikSignUp.touched.password && Boolean(formikSignUp.errors.password)}
                            helperText={formikSignUp.touched.password && formikSignUp.errors.password}
                        />
                        <TextField
                            margin="dense"
                            id="signup-confirm-password"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            {...formikSignUp.getFieldProps('confirmPassword')}
                            error={formikSignUp.touched.confirmPassword && Boolean(formikSignUp.errors.confirmPassword)}
                            helperText={formikSignUp.touched.confirmPassword && formikSignUp.errors.confirmPassword}
                        />
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ paddingRight: '25px', paddingBottom: '15px' }}>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={tabIndex === 0 ? formikLogin.handleSubmit : formikSignUp.handleSubmit} color="primary">
                    {tabIndex === 0 ? 'Login' : 'Sign Up'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;