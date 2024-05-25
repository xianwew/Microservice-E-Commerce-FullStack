import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import ContactTab from './ContactTab';
import FeedbackTab from './FeedbackTab';
import PaymentTab from './PaymentTab';
import OrderHistory from './OrderHistory';
import ItemsOnSale from './ItemsOnSale';

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
                <Tab label="Items On Sale" />
                <Tab label="Order History" />
                <Tab label="Feedback" />
            </Tabs>
            {tabIndex === 0 && <ContactTab />}
            {tabIndex === 1 && <PaymentTab />}
            {tabIndex === 2 && <ItemsOnSale />}
            {tabIndex === 3 && <OrderHistory />}
            {tabIndex === 4 && <FeedbackTab />}
        </Box>
    );
};

export default UserProfileTabs;
