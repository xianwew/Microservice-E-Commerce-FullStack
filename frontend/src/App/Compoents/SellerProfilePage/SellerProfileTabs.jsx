import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import SellerItems from './SellerItems';
import SellerFeedback from './SellerFeedback';

const SellerProfileTabs = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Box>
            <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="Items for Sale" />
                <Tab label="Recent Feedbacks" />
            </Tabs>
            <Box mt={2}>
                {tabIndex === 0 && <SellerItems />}
                {tabIndex === 1 && <SellerFeedback />}
            </Box>
        </Box>
    );
};

export default SellerProfileTabs;
