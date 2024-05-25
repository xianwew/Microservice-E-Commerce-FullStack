import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const sampleOrderHistory = [
    {
        orderId: '001',
        orderDate: '2023-05-01',
        items: [
            { title: 'Gaming Laptop', price: '$1,049.99', merchant: 'Tech Store' },
            { title: 'Wireless Mouse', price: '$29.99', merchant: 'Gadgets Galore' }
        ],
    },
    {
        orderId: '002',
        orderDate: '2023-05-05',
        items: [
            { title: 'Smartphone', price: '$799.99', merchant: 'Mobile World' }
        ],
    },
    // Add more sample orders as needed
];

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch order history data from backend API
        // For now, we'll use sample data
        setOrders(sampleOrderHistory);
    }, []);

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>Order History</Typography>
            <Grid container spacing={2}>
                {orders.map((order) => (
                    <Grid item xs={12} key={order.orderId}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Order Date: {order.orderDate}</Typography>
                                {order.items.map((item, index) => (
                                    <Box key={index} mt={2}>
                                        <Typography variant="subtitle1">{item.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">Price: {item.price}</Typography>
                                        <Typography variant="body2" color="textSecondary">Merchant: {item.merchant}</Typography>
                                    </Box>
                                ))}
                                <Box display="flex" justifyContent="flex-end" mt={2}>
                                    <Button variant="contained" color="primary" onClick={() => navigate(`/user/:userId/receipt/${order.orderId}`)}>View Receipt</Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default OrderHistory;
