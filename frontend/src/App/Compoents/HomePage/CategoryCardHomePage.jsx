import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Grid } from '@mui/material';
import BrowseCategory from './BrowseCategory';

const CategoryCardHomePage = ({ categories, onSelectCategory, selectedCategory }) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#fafafa", borderRadius: "25px", display: 'flex' }}>
            <Box minWidth="250px" borderRight="1px solid #ddd" p={2} sx={{width: '10%'}}>
                <Typography variant="h6">Categories</Typography>
                <List>
                    {categories.map((category) => (
                        <ListItem key={category.id} onClick={() => onSelectCategory(category.id)}>
                            <ListItemText primary={category.name} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <div style={{ margin: '20px 0px', width: '90%' }}>
                <BrowseCategory mainCategoryId={selectedCategory} />
            </div>
        </div>
    );
};

export default CategoryCardHomePage;