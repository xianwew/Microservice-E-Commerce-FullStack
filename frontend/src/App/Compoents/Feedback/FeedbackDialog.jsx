import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Rating, Box, Typography } from '@mui/material';
import { submitFeedback } from '../../service/FeedbackService';

const FeedbackDialog = ({ open, onClose, itemName, itemId, userId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async () => {
        const feedback = {
            rating,
            comment
        };
        try {
            await submitFeedback(itemId, feedback); // Pass itemId to submitFeedback
            onClose();
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent sx={{ minWidth: '500px', padding: '30px', paddingBottom: '5px' }}>
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px', paddingLeft: '0px', paddingTop: '0px' }}>Leave Feedback</DialogTitle>
                <Typography variant="h6" gutterBottom>
                    {itemName}
                </Typography>
                <Rating
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                    size="large"
                />
                <Box display="flex" flexDirection="column" alignItems="center">
                    <TextField
                        margin="dense"
                        label="Your feedback"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        multiline
                        rows={8}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{marginRight: '22px', marginBottom: '20px'}}>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FeedbackDialog;