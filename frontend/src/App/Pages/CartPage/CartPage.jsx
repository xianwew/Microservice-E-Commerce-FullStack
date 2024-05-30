import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Grid, TextField, Link } from '@mui/material';
import CartItem from '../../Compoents/CartPage/CartItem';
import CartTotal from '../../Compoents/CartPage/CartTotal';
import RecommendationItem from '../../Compoents/CartPage/RecommendationItem';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadCartItems, updateCartState } from '../../redux/slice/cartSlice';

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
];


const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items) || []; // Ensure cartItems is always an array
    const currentUserId = useSelector((state) => state.auth.user?.id);

    useEffect(() => {
        if (currentUserId) {
            dispatch(loadCartItems(currentUserId));
        }
    }, [currentUserId, dispatch]);

    const handleQuantityChange = (id, quantity) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        dispatch(updateCartState({ userId: currentUserId, cartItems: updatedItems }));
    };

    const handleRemove = (id) => {
        const updatedItems = cartItems.filter(item => item.id !== id);
        dispatch(updateCartState({ userId: currentUserId, cartItems: updatedItems }));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.quantity * item.price, 0); // Only call reduce if cartItems is defined and not empty
    };

    return (
        <div className='app-content'>
            <Typography variant="h3" mb={4} sx={{ paddingTop: '50px', boxSizing: 'border-box', fontWeight: 'bold', textAlign: 'center' }}>
                Shopping Cart
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={1}>
                <Box flex={3} mr={2} sx={{ backgroundColor: '#fafafa', borderRadius: '25px' }}>
                    {cartItems && cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onQuantityChange={handleQuantityChange}
                                onRemove={handleRemove}
                            />
                        ))
                    ) : (
                        <Typography variant="h6" sx={{ textAlign: 'center', padding: '20px' }}>
                            Your cart is empty.
                        </Typography>
                    )}
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