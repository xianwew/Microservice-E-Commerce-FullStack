import React from 'react';
import { Box, Avatar, Typography, Rating } from '@mui/material';

const SellerProfileHeader = ({ seller }) => {
    return (
        <Box display="flex" alignItems="center" mb={4}>
            <Avatar src={seller.profilePictureUrl} alt={seller.profilePictureUrl} sx={{ width: 100, height: 100, mr: 2 }} />
            <Box>
                <Typography variant="h5" fontWeight="bold">{seller.username}</Typography>
                <Rating value={seller.rating} readOnly />
                <Typography variant="body1">{seller.address.city}, {seller.address.state}, {seller.address.country}</Typography>
            </Box>
        </Box>
    );
};

export default SellerProfileHeader;
