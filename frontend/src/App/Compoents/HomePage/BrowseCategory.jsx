import React from 'react';
import { Box, Container } from '@mui/material';
import SubCategoryList from './SubCategoryList';

const popularItems = [
    { image: 'https://via.placeholder.com/140', title: 'Item 1', subtitle: 'Great Value' },
    { image: 'https://via.placeholder.com/140', title: 'Item 2', subtitle: 'Hot Deal' },
    { image: 'https://via.placeholder.com/140', title: 'Item 3', subtitle: 'Top Pick' },
    { image: 'https://via.placeholder.com/140', title: 'Item 4', subtitle: 'Best Seller' },
];

const exclusiveItems = [
    { image: 'https://via.placeholder.com/140', title: 'Item A', subtitle: 'Exclusive' },
    { image: 'https://via.placeholder.com/140', title: 'Item B', subtitle: 'Limited Offer' },
    { image: 'https://via.placeholder.com/140', title: 'Item C', subtitle: 'New Arrival' },
    { image: 'https://via.placeholder.com/140', title: 'Item D', subtitle: 'Just for You' },
];

const BrowseCategory = () => {
    return (
        <div style={{ borderRadius: '25px', width: '100%', boxSizing: 'border-box'}}>
            <SubCategoryList title="Popular for the Week" items={popularItems} />
            <SubCategoryList title="Exclusive for You" items={exclusiveItems} />
        </div>
    );
};

export default BrowseCategory;
