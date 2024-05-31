import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { fetchItemFeedbacks } from '../../service/ListingsService';
import FeedbackCard from '../FeedbackCard/FeedbackCard';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { deleteFeedback, updateFeedback } from '../../service/FeedbackService';

const ItemDetails = ({ item }) => {
    const { tabIndex: tabIndexParam } = useParams();
    const [tabIndex, setTabIndex] = useState(parseInt(tabIndexParam) || 0);
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
        navigate(`/item/${item.id}/${newValue}`);
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

    const handleDeleteFeedback = async (feedbackId) => {
        try {
            await deleteFeedback(feedbackId);
            setFeedbacks(feedbacks.filter((feedback) => feedback.id !== feedbackId));
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    const handleUpdateFeedback = async (feedbackId, updatedFeedback) => {
        try {
            const data = await updateFeedback(feedbackId, updatedFeedback);
            setFeedbacks(feedbacks.map((feedback) => (feedback.id === feedbackId ? data : feedback)));
        } catch (error) {
            console.error('Error updating feedback:', error);
        }
    };

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
                                <FeedbackCard
                                    key={feedback.id}
                                    feedback={feedback}
                                    onDelete={handleDeleteFeedback}
                                    onUpdate={handleUpdateFeedback}
                                />
                            ))
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ItemDetails;