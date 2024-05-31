import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

// const sampleOrderDetails = {
//     orderId: '001',
//     orderDate: '2023-05-01',
//     items: [
//         { id: 'item1', title: 'Gaming Laptop', quantity: 1, price: 1049.99, merchant: 'Tech Store' },
//         { id: 'item2', title: 'Wireless Mouse', quantity: 2, price: 29.99, merchant: 'Gadgets Galore' }
//     ],
//     total: 1109.97
// };

const OrderReceipt = ({ order }) => {
    const navigate = useNavigate();

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>Order Receipt</Typography>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Order Date: {new Date(order.createdAt).toLocaleDateString()}</Typography>
                    <Divider />
                    <Grid container spacing={2} mt={2}>
                        {order.orderItems.map((item) => (
                            <Grid item xs={12} key={item.id}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="subtitle1" gutterBottom>{item.productName}</Typography>
                                        <Typography variant="body2" color="textSecondary">Quantity: {item.quantity}</Typography>
                                        <Typography variant="body2" color="textSecondary">Price: ${item.price.toFixed(2)}</Typography>
                                        <Typography variant="body2" color="textSecondary">Subtotal: ${(item.quantity * item.price).toFixed(2)}</Typography>
                                        <Button variant="contained" color="primary" onClick={() => navigate(`/item/${item.productId}`)} sx={{ mt: 2 }}>View Details</Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box mt={4} display="flex" justifyContent="space-between">
                        <Typography variant="h6">Total: ${order.totalAmount.toFixed(2)}</Typography>
                        <Button variant="contained" color="primary" onClick={() => navigate('/browse')}>Continue Shopping</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default OrderReceipt;