import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';

const deliveryAreas = [
    'Local',
    'National',
    'International'
];

const ListingDetailsForm = ({ mainCategories, subCategories, onMainCategoryChange, selectedMainCategory }) => {
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    useEffect(() => {
        setSelectedSubCategory('');
    }, [selectedMainCategory]);

    return (
        <Box component="form">
            <Typography variant="h6" mb={2}>Listing Details</Typography>
            <TextField
                label="Listing Title"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Brief Description"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Long Description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
            <TextField
                label="Price"
                type="number"
                fullWidth
                margin="normal"
            />
            <TextField
                label="City"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Country"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Main Category"
                select
                fullWidth
                margin="normal"
                value={selectedMainCategory}
                onChange={(e) => onMainCategoryChange(e.target.value)}
            >
                {mainCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Sub Category"
                select
                fullWidth
                margin="normal"
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                disabled={!selectedMainCategory}
            >
                {subCategories.map((subCategory) => (
                    <MenuItem key={subCategory.id} value={subCategory.id}>
                        {subCategory.name}
                    </MenuItem>
                ))}
            </TextField>
            <Button variant="contained" color="primary" size="large" sx={{ mt: 2, float: 'right' }}>
                Submit
            </Button>
        </Box>
    );
};

export default ListingDetailsForm;