import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import ContactTab from './ContactTab';
import FeedbackTab from './FeedbackTab';
import PaymentTab from './PaymentTab';

const UserProfileTabs = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Box>
            <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="Contact" />
                <Tab label="Payment" />
                <Tab label="Feedback" />
            </Tabs>
            {tabIndex === 0 && <ContactTab />}
            {tabIndex === 1 && <PaymentTab />}
            {tabIndex === 2 && <FeedbackTab />}
        </Box>
    );
};

export default UserProfileTabs;
