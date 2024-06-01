import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Rating } from '@mui/material';
import { fetchUserFeedbacks } from '../../service/FeedbackService';
import { useSelector } from 'react-redux';

const feedbacks = [
    { id: 1, user: 'discountprintsupplies', comment: 'Good buyer, prompt payment, valued customer, highly recommended.', time: 'Past 6 months' },
    { id: 2, user: 'dillonlol', comment: 'Quick response and fast payment. Perfect! THANKS!!', time: 'Past 6 months' },
    { id: 3, user: 'houseoftoners', comment: 'Hope to deal with you again. Thank you.', time: 'Past year' },
    // Add more feedbacks as needed
];

const FeedbackTab = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const userId = user?.id;

    useEffect(() => {
        const getUserFeedbacks = async () => {
            try {
                const feedbackData = await fetchUserFeedbacks(userId);
                console.log(feedbackData);
                setFeedbacks(feedbackData);
            } catch (error) {
                setError('Error fetching feedbacks');
            } finally {
                setLoading(false);
            }
        };

        getUserFeedbacks();
    }, [userId]);

    return (
        <Box mt={2}>
            <Typography variant="h6" mb={2}>All Feedback ({feedbacks.length})</Typography>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : error ? (
                <Typography>{error}</Typography>
            ) : (
                <List>
                    {feedbacks.map(feedback => (
                        <Box key={feedback.id} sx={{marginBottom: '20px'}}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '16px', marginRight: '12px' }}>{feedback.userName}</Typography>
                                <Rating
                                    value={feedback.rating}
                                    sx={{ 'transform': 'translateY(-1px)' }}
                                />
                            </div>
                            <ListItemText
                                primary={feedback.username}
                                secondary={`${feedback.comment} - ${new Date(feedback.updatedAt).toLocaleDateString()}`}
                            />
                        </Box>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default FeedbackTab;
