import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, ButtonBase, Avatar  } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginDialog from '../LoginDialog/LoginDialog';

const Header = () => {
    const sampleAvatarUrl = "https://via.placeholder.com/150";
    const [loginOpen, setLoginOpen] = useState(false);
    const { isAuthenticated, user } = useSelector(state => state.auth); // Assuming auth state contains isAuthenticated and user info
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
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ButtonBase onClick={() => navigate('/')} sx={{ flexGrow: 1, textAlign: 'left', maxWidth: '250px' }}>
                    <Typography variant="h6">
                        Xianwei's Ecommerce Site
                    </Typography>
                </ButtonBase>
                <div>
                    {!isAuthenticated && (
                        <Button color="inherit" onClick={handleLoginOpen}>
                            Login
                        </Button>
                    )}
                    {isAuthenticated && (
                        <>
                            <Button color="inherit" onClick={() => navigate('/sell')}>
                                Sell
                            </Button>
                            <IconButton color="inherit" onClick={() => navigate('/cart')}>
                                <ShoppingCartIcon />
                            </IconButton>
                            <IconButton color="inherit" onClick={() => navigate('/profile')}>
                                <Avatar src={user?.profilePictureUrl || sampleAvatarUrl} alt="User Avatar" />
                            </IconButton>
                        </>
                    )}
                </div>
            </Toolbar>
            <LoginDialog open={loginOpen} onClose={handleLoginClose} />
        </AppBar>
    );
};

export default Header;

