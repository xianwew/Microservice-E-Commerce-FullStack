import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CardInfoCard from './CardInfoCard';
import { fetchUserCards, createUserCard, updateUserCard, deleteUserCard } from '../../service/UserService';
import store from '../../redux/store/store';
import { decodeToken } from '../../Auth/JwtUtils';
import { v4 as uuidv4 } from 'uuid';

const PaymentTab = () => {
    const [cards, setCards] = useState([]);
    const state = store.getState();
    const token = state.auth.token;
    const decoded = decodeToken(token);
    const userId = decoded.sub;

    useEffect(() => {
        const loadCards = async () => {
            try {
                let userCards = await fetchUserCards(userId);
                userCards = userCards.map((userCard) => ({
                    ...userCard,
                    tempId: uuidv4(),
                }));
                setCards(userCards);
            } catch (error) {
                console.error('Failed to load cards:', error);
            }
        };

        loadCards();
    }, [userId]);

    const handleAddNewCardComponent = () => {
        const newCard = { tempId: uuidv4(), cardholderName: '', cardNumber: '', expirationDate: '', billingAddress: '', type: '' };
        setCards([...cards, newCard]);
    };

    const handleAddCard = async (newCard) => {
        try {
            await createUserCard(userId, newCard);
            setCards(cards.map(card => (card.tempId === newCard.tempId ? newCard : card)));
        } catch (error) {
            console.error('Failed to add card:', error);
        }
    };

    const handleEditCard = async (updatedCard) => {
        try {
            await updateUserCard(userId, updatedCard.id, updatedCard);
            setCards(cards.map(card => (card.tempId === updatedCard.tempId ? updatedCard : card)));
        } catch (error) {
            console.error('Failed to update card:', error);
        }
    };

    const handleRemoveCard = async (id, tempId) => {
        try {
            await deleteUserCard(userId, id);
            setCards(cards.filter(card => card.tempId !== tempId));
        } catch (error) {
            console.error('Failed to delete card:', error);
        }
    };

    return (
        <Box component="form" mt={2}>
            <Typography variant="h6" mb={2}>Payment Information</Typography>
            {cards.map((card) => (
                <CardInfoCard
                    key={card.tempId}
                    card={card}
                    onEdit={handleEditCard}
                    onAdd={handleAddCard}
                    onDelete={handleRemoveCard}
                />
            ))}
            <Button variant="contained" color="primary" onClick={handleAddNewCardComponent} startIcon={<AddIcon />} sx={{ mb: 2, float: 'right', marginTop: '10px' }}>
                Add Another Card
            </Button>
        </Box>
    );
};

export default PaymentTab;