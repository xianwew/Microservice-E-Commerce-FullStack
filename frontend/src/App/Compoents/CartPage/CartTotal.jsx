import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const CartTotal = ({ total }) => {
    return (
        <Box borderColor="grey.300" borderRadius={4} p={2} width="300px" textAlign="center" mb={4} sx={{display: 'flex', flexDirection:'column', border: '2px #dedede solid', backgroundColor: '#dedede'}}>
            <Typography variant="h4">Item(s)</Typography>
            <Typography variant="h6" my={1}>Subtotal: ${total.toFixed(2)}</Typography>
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            <Button variant="contained" color="primary" size="large" fullWidth sx={{ marginTop:'auto', borderRadius: '15px' }}>
                Go to checkout
            </Button>
        </Box>
    );
};

export default CartTotal;
