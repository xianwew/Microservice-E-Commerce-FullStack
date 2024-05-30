import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { fetchItemFeedbacks } from '../../service/ListingsService';
import FeedbackCard from '../FeedbackCard/FeedbackCard';

const ItemDetails = ({ item }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    useEffect(() => {
        const getFeedbacks = async () => {
            try {
                const data = await fetchItemFeedbacks(item.id);
                setFeedbacks(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching feedbacks');
                setLoading(false);
            }
        };

        if (tabIndex === 1) {
            getFeedbacks();
        }
    }, [tabIndex, item.id]);

    return (
        <Box mt={4}>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="item details tabs">
                <Tab label="Details" />
                <Tab label="Feedbacks" />
            </Tabs>
            <Box mt={2}>
                {tabIndex === 0 && (
                    <Typography variant="body1">
                        {item.longDescription}
                    </Typography>
                )}
                {tabIndex === 1 && (
                    <Box>
                        {loading ? (
                            <Typography>Loading...</Typography>
                        ) : error ? (
                            <Typography>{error}</Typography>
                        ) : feedbacks.length === 0 ? (
                            <Typography>No feedbacks available for this item.</Typography>
                        ) : (
                            feedbacks.map((feedback) => (
                                <FeedbackCard key={feedback.id} feedback={feedback} />
                            ))
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ItemDetails;
