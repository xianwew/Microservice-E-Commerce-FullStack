import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, ButtonBase } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginDialog from '../LoginDialog/LoginDialog';
import CustomizedSnackbars from '../SnackBars/CustomizedSnackbars/CustomizedSnackbars';
import { closeSnackbar } from '../../redux/slice/snackbarSlice';

const Header = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const snackbar = useSelector(state => state.snackbar);
    const dispatch = useDispatch();

    const handleLoginOpen = () => {
        setLoginOpen(true);
    };

    const handleLoginClose = () => {
        setLoginOpen(false);
    };

    const navigate = useNavigate();

    return (
        <AppBar sx={{ backgroundColor: '#5696fc', width: '100vw', padding: '0px' }}>
            <CustomizedSnackbars
                open={snackbar.open}
                autoHideDuration={snackbar.autoHideDuration}
                onClose={() => dispatch(closeSnackbar())}
                message={snackbar.message}
                severity={snackbar.severity}
            />
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ButtonBase onClick={() => navigate('/')} sx={{ flexGrow: 1, textAlign: 'left', maxWidth: '250px' }}>
                    <Typography variant="h6">
                        Xianwei's Ecommerce Site
                    </Typography>
                </ButtonBase>
                <div>
                    <Button color="inherit" onClick={handleLoginOpen}>
                        Login
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/sell')}>
                        Sell
                    </Button>
                    <IconButton color="inherit">
                        <ShoppingCartIcon />
                    </IconButton>
                </div>
            </Toolbar>
            <LoginDialog open={loginOpen} onClose={handleLoginClose} />
        </AppBar>
    );
};

export default Header;

