import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const feedbacks = [
    { id: 1, user: 'discountprintsupplies', comment: 'Good buyer, prompt payment, valued customer, highly recommended.', time: 'Past 6 months' },
    { id: 2, user: 'dillonlol', comment: 'Quick response and fast payment. Perfect! THANKS!!', time: 'Past 6 months' },
    { id: 3, user: 'houseoftoners', comment: 'Hope to deal with you again. Thank you.', time: 'Past year' },
    // Add more feedbacks as needed
];

const FeedbackTab = () => {
    return (
        <Box mt={2}>
            <Typography variant="h6" mb={2}>Feedback Ratings</Typography>
            <Typography variant="body2" mb={2}>Last 12 months</Typography>
            <Box mb={2}>
                <Typography variant="body2">Positive: 5</Typography>
                <Typography variant="body2">Neutral: 0</Typography>
                <Typography variant="body2">Negative: 0</Typography>
            </Box>
            <Typography variant="h6" mb={2}>All Feedback ({feedbacks.length})</Typography>
            <List>
                {feedbacks.map(feedback => (
                    <ListItem key={feedback.id}>
                        <ListItemText
                            primary={feedback.user}
                            secondary={`${feedback.comment} - ${feedback.time}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default FeedbackTab;
