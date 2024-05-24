import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const UserProfileHeader = ({ user }) => {
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
            </Box>
        </Box>
    );
};

export default UserProfileHeader;
