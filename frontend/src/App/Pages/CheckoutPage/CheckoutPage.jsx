import React from 'react';
import { Box, Grid, Typography, RadioGroup, FormControlLabel, Radio, Button, Card, CardContent, CardMedia, FormControl, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = React.useState('');
    const [shippingMethod, setShippingMethod] = React.useState('');

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleShippingChange = (event) => {
        setShippingMethod(event.target.value);
    };

    return (
        <div className='app-content' style={{backgroundColor: '#fafafa', width: '100vw'}}>
            <div style={{ padding: '50px', marginTop:'50px' }}>
                <Typography variant="h3" fontWeight='bold' textAlign='center'>Checkout</Typography>
                <Box display="flex" justifyContent="center" padding={4} mt={3} >
                    <Grid container spacing={4} maxWidth="1200px">
                        <Grid item xs={12} md={8} >
                            <Box marginBottom={3}>
                                <Typography variant="h6" fontWeight='bold'>Pay with</Typography>
                                <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
                                    <FormControlLabel value="visa" control={<Radio />} label="Visa ending in 0993" />
                                    <FormControlLabel value="mastercard" control={<Radio />} label="Mastercard ending in 2166" />
                                    <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                                    <FormControlLabel value="googlePay" control={<Radio />} label="Google Pay" />
                                </RadioGroup>
                                <Button variant="outlined" onClick={() => navigate('/user')} sx={{marginTop:'10px'}}>Add new payment method</Button>
                            </Box>
                            <hr/>
                            <Box marginBottom={3}>
                                <Typography variant="h6" fontWeight='bold'>Ship to</Typography>
                                <Typography variant="body1">Xianwei Wu</Typography>
                                <Typography variant="body1">4318 Wakefield Dr</Typography>
                                <Typography variant="body1">Annandale, VA 22003-3611</Typography>
                                <Typography variant="body1">United States</Typography>
                                <Typography variant="body1">(949) 490-8098</Typography>
                                <Button variant="outlined" onClick={() => navigate('/user')} sx={{marginTop:'10px'}}>Change address</Button>
                            </Box>
                            <hr/>
                            <Box marginBottom={3}>
                                <Typography variant="h6" fontWeight='bold'>Delivery</Typography>
                                <RadioGroup value={shippingMethod} onChange={handleShippingChange}>
                                    <FormControlLabel value="economy" control={<Radio />} label="Est. delivery: May 29 - May 31 ($5.99 Economy Shipping)" />
                                    <FormControlLabel value="standard" control={<Radio />} label="Est. delivery: May 29 - May 31 ($17.25 Standard Shipping)" />
                                    <FormControlLabel value="expedited" control={<Radio />} label="Est. delivery: May 28 - May 30 ($38.89 Expedited Shipping)" />
                                </RadioGroup>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Order Summary</Typography>
                                    <Box display="flex" justifyContent="space-between" marginBottom={2}>
                                        <Typography variant="body1">Item 1</Typography>
                                        <Typography variant="body1">$109.99</Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" marginBottom={2}>
                                        <Typography variant="body1">Quantity: 1</Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" marginBottom={2}>
                                        <Typography variant="body1">Subtotal</Typography>
                                        <Typography variant="body1">$109.99</Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" marginBottom={2}>
                                        <Typography variant="body1">Shipping</Typography>
                                        <Typography variant="body1">$5.99</Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" marginBottom={2}>
                                        <Typography variant="body1">Tax</Typography>
                                        <Typography variant="body1">$6.60</Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" marginBottom={2}>
                                        <Typography variant="h6">Order total</Typography>
                                        <Typography variant="h6">$122.58</Typography>
                                    </Box>
                                    <Button variant="contained" color="primary" fullWidth>
                                        Confirm and pay
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

export default CheckoutPage;
