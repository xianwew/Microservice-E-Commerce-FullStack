import React, {useEffect, useState} from 'react';
import { Box, Grid, Typography } from '@mui/material';
import SummuryCard from '../../Compoents/CheckoutPage/SummuryCard';
import AddressBox from '../../Compoents/CheckoutPage/AddressBox';
import PaymentSelection from '../../Compoents/CheckoutPage/PaymentSelection';
import { useDispatch, useSelector } from 'react-redux';
import { loadCartItems } from '../../redux/slice/cartSlice';
import { fetchUserCards } from '../../service/UserService';

const CheckoutPage = () => {
    const user = useSelector((state) => state.auth.user);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (user?.id) {
            dispatch(loadCartItems(user.id));

            const getUserCards = async () => {
                try {
                    const fetchedCards = await fetchUserCards(user.id);
                    setCards(fetchedCards);
                } catch (error) {
                    console.error('Error fetching user cards:', error);
                }
            };

            getUserCards();
        }
    }, [user, dispatch]);

    const calculateTotalPrice = () => {
        return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    if (cart.status === 'loading') {
        return <div>Loading...</div>;
    }

    if (cart.status === 'failed') {
        return <div>Error loading cart</div>;
    }

    return (
        <div className='app-content' style={{ backgroundColor: '#fafafa', width: '100vw' }}>
            <div style={{ padding: '50px', marginTop: '50px', width: '100%', boxSizing: 'border-box' }}>
                <Typography variant="h3" fontWeight='bold' textAlign='center'>Checkout</Typography>
                <Box display="flex" justifyContent="center" padding={4} mt={3}>
                    <Grid container spacing={4} >
                        <Grid item xs={12} md={8}>
                            <PaymentSelection cards={cards} />
                            <hr />
                            <AddressBox address={user?.address} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <SummuryCard items={cart?.items} total={calculateTotalPrice()} />
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

export default CheckoutPage;
