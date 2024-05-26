import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useAuth } from '../../Auth/AuthContext';

const UserProfileHeader = ({ user }) => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <Box display="flex" alignItems="center" mb={4}>
            <Box
                component="img"
                src={user.profilePicture}
                alt="Profile"
                sx={{ width: 100, height: 100, borderRadius: '50%', mr: 2 }}
            />
            <Box>
                <Typography variant="h4">{user.name}</Typography>
                <Typography variant="body1" color="textSecondary">{user.feedback}</Typography>
            </Box>
            <Box ml="auto">
                <Button variant="outlined">Edit Profile</Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#e81010',
                        marginLeft: '10px',
                        '&:hover': {
                            backgroundColor: '#c30d0d'
                        }
                    }}
                    onClick={handleLogout}
                >
                    Log Out
                </Button>
            </Box>
        </Box>
    );
};

export default UserProfileHeader;
