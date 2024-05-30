import React from 'react';
import { Box, Typography, Rating } from '@mui/material';

const FeedbackCard = ({ feedback }) => {
    return (
        <Box border={1} borderColor="grey.300" borderRadius={2} p={2} mb={2}>
            <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="h6" mr={2}>
                    {feedback.userName}
                </Typography>
                <Rating value={feedback.rating} readOnly />
            </Box>
            <Typography variant="body1">
                {feedback.comment}
            </Typography>
        </Box>
    );
};

export default FeedbackCard;
