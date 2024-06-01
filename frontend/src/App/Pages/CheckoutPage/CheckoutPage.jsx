import React, {useEffect, useState} from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import SummuryCard from '../../Compoents/CheckoutPage/SummuryCard';
import AddressBox from '../../Compoents/CheckoutPage/AddressBox';
import PaymentSelection from '../../Compoents/CheckoutPage/PaymentSelection';
import { useDispatch, useSelector } from 'react-redux';
import { loadCartItems } from '../../redux/slice/cartSlice';
import { fetchUserCards } from '../../service/UserService';
import ShippingMethodSelection from '../../Compoents/CheckoutPage/ShippingMethodSelection';
import { fetchShippingMethods } from '../../service/CartService';
import { createOrder } from '../../service/OrderSerivce';
import { useNavigate } from 'react-router-dom';
import { showSnackbar } from '../../redux/slice/snackbarSlice';


const CheckoutPage = () => {
    const user = useSelector((state) => state.auth.user);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cards, setCards] = useState([]);
    const [shippingMethods, setShippingMethods] = useState([]);
    const [selectedShippingCost, setSelectedShippingCost] = useState(0);
    const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    useEffect(() => {
        if (user?.id) {
            dispatch(loadCartItems(user.id));

            const getUserCards = async () => {
                try {
                    const fetchedCards = await fetchUserCards(user.id);
                    setCards(fetchedCards);
                    if (fetchedCards.length > 0) {
                        setSelectedPaymentMethod(fetchedCards[0].id);
                    }
                } catch (error) {
                    console.error('Error fetching user cards:', error);
                }
            };

            const getShippingMethods = async () => {
                try {
                    const fetchedMethods = await fetchShippingMethods();
                    setShippingMethods(fetchedMethods);
                    if (fetchedMethods.length > 0) {
                        setSelectedShippingMethod(fetchedMethods[0].id);
                        setSelectedShippingCost(fetchedMethods[0].price); // default to first method
                    }
                } catch (error) {
                    console.error('Error fetching shipping methods:', error);
                }
            };

            getUserCards();
            getShippingMethods();
        }
    }, [user, dispatch]);

    const calculateTotalPrice = () => {
        return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleShippingMethodChange = (price, id) => {
        setSelectedShippingCost(price);
        setSelectedShippingMethod(id);
    };

    const handlePaymentChange = (id) => {
        setSelectedPaymentMethod(id);
    };

    const handleConfirmAndPay = async () => {
        try {
            const orderId = await createOrder(cart.cartId, selectedShippingMethod, selectedPaymentMethod);
            dispatch(showSnackbar({
                open: true,
                message: 'Order successfully created!',
                severity: 'success'
            }));
            navigate(`/receipt/${orderId}`);
        } catch (error) {
            console.error('Error creating order:', error);
            dispatch(showSnackbar({
                open: true,
                message: 'Failed to create order. Please try again.',
                severity: 'error'
            }));
        }
    };

    if (cart.status === 'loading') {
        return <div>Loading...</div>;
    }

    if (cart.status === 'failed') {
        return <div>Error loading cart</div>;
    }

    return (
        <div className='app-content' style={{ backgroundColor: '#fafafa', width: '100vw' }}>
            <div style={{ padding: '50px', width: '100%', boxSizing: 'border-box' }}>
                <Typography variant="h3" fontWeight='bold' textAlign='center'>Checkout</Typography>
                <Box display="flex" justifyContent="center" padding={4} mt={3}>
                    <Grid container spacing={4} maxWidth="1200px">
                        <Grid item xs={12} md={8}>
                            <PaymentSelection cards={cards} onPaymentMethodChange={handlePaymentChange} />
                            <ShippingMethodSelection 
                                shippingMethods={shippingMethods} 
                                onShippingMethodChange={(price, id) => handleShippingMethodChange(price, id)} 
                            />
                            <hr />
                            <AddressBox address={user?.address} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <SummuryCard 
                                items={cart.items} 
                                total={calculateTotalPrice()} 
                                cards={cards} 
                                address={user?.address} 
                                shippingCost={selectedShippingCost} 
                                onConfirmAndPay={handleConfirmAndPay}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

export default CheckoutPage;