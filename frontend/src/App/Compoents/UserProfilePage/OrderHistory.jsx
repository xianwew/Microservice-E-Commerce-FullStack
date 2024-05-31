import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../../service/OrderSerivce';
import { useSelector } from 'react-redux';

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
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.id) {
            const getUserOrders = async () => {
                try {
                    const fetchedOrders = await fetchUserOrders(user.id);
                    setOrders(fetchedOrders);
                } catch (error) {
                    console.error('Error fetching user orders:', error);
                }
            };

            getUserOrders();
        }
    }, [user]);

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>Order History</Typography>
            <Grid container spacing={2}>
                {orders.map((order) => (
                    <Grid item xs={12} key={order.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Order Date: {new Date(order.createdAt).toLocaleDateString()}</Typography>
                                {order.orderItems.map((item, index) => (
                                    <Box key={index} mt={2}>
                                        <Typography variant="subtitle1">{item.itemName}</Typography>
                                        <Typography variant="body2" color="textSecondary">Price: ${item.price.toFixed(2)}</Typography>
                                        <Typography variant="body2" color="textSecondary">Quantity: {item.quantity}</Typography>
                                    </Box>
                                ))}
                                <Box display="flex" justifyContent="flex-end" mt={2}>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => navigate(`/receipt/${order.id}`)}
                                    >
                                        View Receipt
                                    </Button>
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