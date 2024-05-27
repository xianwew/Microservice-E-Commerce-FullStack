import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CardInfoCard from './CardInfoCard';
import { fetchUserCards, createUserCard, updateUserCard, deleteUserCard } from '../../service/UserService';
import store from '../../redux/store/store';
import { decodeToken } from '../../Auth/JwtUtils';

const PaymentTab = () => {
    const [cards, setCards] = useState([]);
    const state = store.getState();
    const token = state.auth.token;
    const decoded = decodeToken(token);
    const userId = decoded.sub;

    useEffect(() => {
        const loadCards = async () => {
            try {
                const userCards = await fetchUserCards(userId);
                setCards(userCards);
            } catch (error) {
                console.error('Failed to load cards:', error);
            }
        };

        loadCards();
    }, [userId]);

    const handleAddNewCardComponent = () => {
        const createdCard = { cardholderName: '', cardNumber: '', expirationDate: '', billingAddress: '', type: '' };
        setCards([...cards, createdCard]);
    }

    const handleAddCard = async (newCard) => {
        try {
            const createdCard = await createUserCard(userId, newCard);
            setCards([...cards, createdCard]);
        } catch (error) {
            console.error('Failed to add card:', error);
        }
    };

    const handleEditCard = async (updatedCard) => {
        try {
            const updated = await updateUserCard(userId, updatedCard.id, updatedCard);
            setCards(cards.map(card => card.id === updated.id ? updated : card));
        } catch (error) {
            console.error('Failed to update card:', error);
        }
    };

    const handleRemoveCard = async (id) => {
        try {
            await deleteUserCard(userId, id);
            setCards(cards.filter(card => card.id !== id));
        } catch (error) {
            console.error('Failed to delete card:', error);
        }
    };

    return (
        <Box component="form" mt={2}>
            <Typography variant="h6" mb={2}>Payment Information</Typography>
            {cards.map((card) => (
                <CardInfoCard
                    key={card.id}
                    card={card}
                    onEdit={handleEditCard}
                    onAdd={handleAddCard}
                    onDelete={handleRemoveCard}
                />
            ))}
            <Button variant="contained" color="primary" onClick={handleAddNewCardComponent} startIcon={<AddIcon />} sx={{ mb: 2 }}>
                Add Another Card
            </Button>
        </Box>
    );
};

export default PaymentTab;