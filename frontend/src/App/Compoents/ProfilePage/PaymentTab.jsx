import React, { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CardInfoCard from './CardInfoCard';

const PaymentTab = () => {
    const [cards, setCards] = useState([{ id: 1, cardholderName: '', cardNumber: '', expirationDate: '', billingAddress: '' }]);

    const handleAddCard = () => {
        setCards([...cards, { id: Date.now(), cardholderName: '', cardNumber: '', expirationDate: '', billingAddress: '' }]);
    };

    const handleEditCard = (updatedCard) => {
        setCards(cards.map(card => card.id === updatedCard.id ? updatedCard : card));
    };

    const handleRemoveCard = (id) => {
        setCards(cards.filter(card => card.id !== id));
    };

    return (
        <Box component="form" mt={2}>
            <Typography variant="h6" mb={2}>Payment Information</Typography>
            {cards.map((card, index) => (
                <CardInfoCard
                    key={card.id}
                    card={card}
                    onEdit={handleEditCard}
                    onDelete={handleRemoveCard}
                />
            ))}
            <Button variant="contained" color="primary" onClick={handleAddCard} startIcon={<AddIcon />} sx={{ mb: 2 }}>
                Add Another Card
            </Button>
        </Box>
    );
};

export default PaymentTab;
