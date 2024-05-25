import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const sampleOrderDetails = {
    orderId: '001',
    orderDate: '2023-05-01',
    items: [
        { id: 'item1', title: 'Gaming Laptop', quantity: 1, price: 1049.99, merchant: 'Tech Store' },
        { id: 'item2', title: 'Wireless Mouse', quantity: 2, price: 29.99, merchant: 'Gadgets Galore' }
    ],
    total: 1109.97
};

const OrderReceipt = () => {
    const { userId, receiptId } = useParams();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        // Fetch order details based on userId and receiptId
        // Replace sampleOrderDetails with actual API call
        setOrderDetails(sampleOrderDetails);
    }, [userId, receiptId]);

    if (!orderDetails) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>Order Receipt</Typography>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Order Date: {orderDetails.orderDate}</Typography>
                    <Divider />
                    <Grid container spacing={2} mt={2}>
                        {orderDetails.items.map((item) => (
                            <Grid item xs={12} key={item.id}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="subtitle1" gutterBottom>{item.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">Quantity: {item.quantity}</Typography>
                                        <Typography variant="body2" color="textSecondary">Price: ${item.price.toFixed(2)}</Typography>
                                        <Typography variant="body2" color="textSecondary">Merchant: {item.merchant}</Typography>
                                        <Typography variant="body2" color="textSecondary">Subtotal: ${(item.quantity * item.price).toFixed(2)}</Typography>
                                        <Button variant="contained" color="primary" onClick={() => navigate(`/item/${item.id}`)} sx={{ mt: 2 }}>View Details</Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box mt={4} display="flex" justifyContent="space-between">
                        <Typography variant="h6">Total: ${orderDetails.total.toFixed(2)}</Typography>
                        <Button variant="contained" color="primary" onClick={() => navigate('/browse')}>Continue Shopping</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default OrderReceipt;
