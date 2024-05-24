import React, { useState } from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';
import CartItem from '../../Compoents/CartPage/CartItem';
import CartTotal from '../../Compoents/CartPage/CartTotal';
import RecommendationItem from '../../Compoents/CartPage/RecommendationItem';

const sampleCartItems = [
    {
        id: 1,
        title: 'AYANEO AIR Handheld Gaming Console',
        image: 'https://via.placeholder.com/150',
        price: '$499.00',
        quantity: 1,
        condition: 'Open box',
        shipping: 'Free shipping',
        returns: 'Free Returns'
    },
    {
        id: 2,
        title: 'Another Item',
        image: 'https://via.placeholder.com/150',
        price: '$200.00',
        quantity: 2,
        condition: 'New',
        shipping: 'Free shipping',
        returns: 'Free Returns'
    },
];

const sampleRecommendations = [
    {
        id: 1,
        title: 'Recommended Item 1',
        image: 'https://via.placeholder.com/150',
        price: '$350.00',
    },
    {
        id: 2,
        title: 'Recommended Item 2',
        image: 'https://via.placeholder.com/150',
        price: '$450.00',
    },
    // Add more recommended items as needed
];

const Cart = () => {
    const [cartItems, setCartItems] = useState(sampleCartItems);

    const handleQuantityChange = (id, quantity) => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
    };

    const handleRemove = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.price.replace('$', '')), 0);
    };

    return (
        <div className='app-content'>
            <Typography variant="h3" mb={4} sx={{paddingTop: '50px', boxSizing: 'border-box', fontWeight: 'bold', textAlign:'center'}}>Shopping Cart</Typography>
            <Box display="flex" justifyContent="space-between" mb={1} >
                <Box flex={3} mr={2} sx={{backgroundColor: '#fafafa', borderRadius: '25px'}}>
                    {cartItems.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemove}
                        />
                    ))}
                </Box>
                <CartTotal total={calculateTotal()} />
            </Box>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" mb={2}>Recommended for you</Typography>
            <Grid container spacing={2}>
                {sampleRecommendations.map(item => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <RecommendationItem item={item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Cart;

