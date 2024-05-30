import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

const SummuryCard = ({ items, total, cards, address }) => {
    const isAddressValid = address && Object.values(address).every(field => field && field !== '');
    const isCardsAvailable = cards && cards.length > 0;
    const isButtonDisabled = !isCardsAvailable || !isAddressValid;

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" fontWeight='bold'>Order Summary</Typography>
                {items.map((item, index) => (
                    <Box key={index} display="flex" justifyContent="space-between" marginBottom={2}>
                        <Typography variant="body1">{item.title} x {item.quantity}</Typography>
                        <Typography variant="body1">${(item.price * item.quantity).toFixed(2)}</Typography>
                    </Box>
                ))}
                <Box display="flex" justifyContent="space-between" marginBottom={2}>
                    <Typography variant="body1">Subtotal</Typography>
                    <Typography variant="body1">${total.toFixed(2)}</Typography>
                </Box>
                <hr style={{ marginTop: '40px' }} />
                <Box display="flex" justifyContent="space-between" marginBottom={2}>
                    <Typography variant="body1">Shipping</Typography>
                    <Typography variant="body1">$5.99</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" marginBottom={2}>
                    <Typography variant="body1">Tax</Typography>
                    <Typography variant="body1">$6.60</Typography>
                </Box>
                <hr style={{ marginTop: '40px' }} />
                <Box display="flex" justifyContent="space-between" marginBottom={2}>
                    <Typography variant="h6">Order total</Typography>
                    <Typography variant="h6">${(total + 5.99 + 6.60).toFixed(2)}</Typography>
                </Box>
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    disabled={isButtonDisabled}
                >
                    Confirm and pay
                </Button>
            </CardContent>
        </Card>
    );
}

export default SummuryCard;