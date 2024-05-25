import React from 'react';
import { Container, Box } from '@mui/material';
import OrderReceipt from '../../Compoents/ReceiptPage/OrderReceipt';

const UserReceiptPage = () => {
    return (
        <div className='app-content' style={{ paddingTop: '20px', padding: '50px' }}>
            <Box p={3} sx={{ backgroundColor: '#fafafa', borderRadius: '8px', boxShadow: 3 }}>
                <OrderReceipt />
            </Box>
        </div>
    );
};

export default UserReceiptPage;
