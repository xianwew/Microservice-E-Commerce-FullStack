import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Grid } from '@mui/material';
import CategoryItemCard from './CategoryItemCard';

const categories = [
    'Home Living',
    'Women\'s Clothing',
    'Men\'s Clothing',
    'Bags & Accessories',
    'Sports & Outdoors',
    'Electronics & Gadgets',
    'Appliances & Services',
    'Toys & Instruments',
    'Automotive & Parts',
    'Home Decor',
];

const subCat = [
    { image: 'https://via.placeholder.com/100', title: 'Daily Deals', subtitle: 'Great Value Items' },
    { image: 'https://via.placeholder.com/100', title: 'iFashion', subtitle: 'Trendy Styles' },
    { image: 'https://via.placeholder.com/100', title: 'Popular Picks', subtitle: 'Top Rated Brands' },
];

const CategoryCard = () => {
    return (
        <div style={{display:"flex", flexDirection:"row", width:"100%", backgroundColor:"#fafafa", borderRadius:"25px"}}>
            <Box minWidth="250px" borderRight="1px solid #ddd" p={2}>
                <Typography variant="h6">Categories</Typography>
                <List>
                    {categories.map((category, index) => (
                        <ListItem button key={index}>
                            <ListItemText primary={category} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box minWidth="300px" p={2}>
                <Grid container spacing={2}>
                    {subCat.map((showcase, index) => (
                        <Grid item xs={4} key={index}>
                            <CategoryItemCard item={showcase} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default CategoryCard;