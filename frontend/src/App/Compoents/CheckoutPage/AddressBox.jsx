import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const AddressBox = ({ address }) => {
    const navigate = useNavigate();
    
    if (!address) {
        return <Typography variant="body1">No address available.</Typography>;
    }

    return (
        <Box marginBottom={3}>
            <Typography variant="h6" fontWeight='bold'>Ship to</Typography>
            <Typography variant="body1">{address.firstName} {address.lastName}</Typography>
            <Typography variant="body1">{address.street}</Typography>
            <Typography variant="body1">{address.city}, {address.state} {address.zipCode}</Typography>
            <Typography variant="body1">{address.country}</Typography>
            <Typography variant="body1">{address.phoneNumber}</Typography>
            <Button variant="outlined" onClick={() => navigate('/profile')} sx={{ marginTop: '10px' }}>Change address</Button>
        </Box>
    );
}

export default AddressBox;