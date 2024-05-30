import React, { useState, useEffect } from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ShippingMethodSelection = ({ shippingMethods, onShippingMethodChange }) => {
    const [selectedShippingMethod, setSelectedShippingMethod] = useState(shippingMethods.length > 0 ? shippingMethods[0].id : '');

    // useEffect(() => {
    //     if (shippingMethods.length > 0) {
    //         const initialMethod = shippingMethods[0];
    //         setSelectedShippingMethod(initialMethod.id);
    //         onShippingMethodChange(initialMethod.price);
    //     }
    // }, [shippingMethods, onShippingMethodChange]);

    const handleShippingChange = (event) => {
        const selectedMethod = shippingMethods.find(method => method.id === parseInt(event.target.value));
        if (selectedMethod) {
            setSelectedShippingMethod(selectedMethod.id);
            onShippingMethodChange(selectedMethod.price);
        }
    };

    return (
        <Box marginBottom={3}>
            <Typography variant="h6" fontWeight='bold'>Select Shipping Method</Typography>
            <RadioGroup value={selectedShippingMethod} onChange={handleShippingChange}>
                {shippingMethods.map((method, index) => (
                    <FormControlLabel
                        key={index}
                        value={method.id.toString()}
                        control={<Radio />}
                        label={`${method.name} - ${method.price.toFixed(2)} USD (Estimated Delivery: ${method.estimatedDeliveryTime})`}
                    />
                ))}
            </RadioGroup>
        </Box>
    );
};

export default ShippingMethodSelection;