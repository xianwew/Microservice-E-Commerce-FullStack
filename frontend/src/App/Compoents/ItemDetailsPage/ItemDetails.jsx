import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';

const ItemDetails = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
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
                        This is the detailed description of the item. It includes all the specifications, features, and other important information about the item.
                    </Typography>
                )}
                {tabIndex === 1 && (
                    <Typography variant="body1">
                        This section contains user feedback and reviews. Users can share their experiences and rate the item.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default ItemDetails;
