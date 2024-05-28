import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';

const ListingDetailsForm = ({ mainCategories, subCategories, onMainCategoryChange, selectedMainCategory, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [price, setPrice] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [quantity, setQuantity] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    useEffect(() => {
        setSelectedSubCategory('');
    }, [selectedMainCategory]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const itemData = {
            title,
            shortDescription,
            longDescription,
            price,
            city,
            country,
            quantity,
            mainCategoryId: selectedMainCategory,
            subCategoryId: selectedSubCategory,
        };
        onSubmit(itemData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="Listing Title"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                label="Brief Description"
                fullWidth
                margin="normal"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
            />
            <TextField
                label="Long Description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
            />
            <TextField
                label="Price"
                type="number"
                fullWidth
                margin="normal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
                label="Quantity"
                type="number"
                fullWidth
                margin="normal"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    label="City"
                    fullWidth
                    margin="normal"
                    value={city}
                    sx={{ width: '48%', minWidth: '80px' }}
                    onChange={(e) => setCity(e.target.value)}
                />
                <TextField
                    label="Country"
                    fullWidth
                    margin="normal"
                    value={country}
                    sx={{ width: '48%', minWidth: '80px' }}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    label="Main Category"
                    select
                    fullWidth
                    margin="normal"
                    value={selectedMainCategory}
                    sx={{ width: '48%', minWidth: '80px' }}
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
                    sx={{ width: '48%', minWidth: '80px' }}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    disabled={!selectedMainCategory}
                >
                    {subCategories.map((subCategory) => (
                        <MenuItem key={subCategory.id} value={subCategory.id}>
                            {subCategory.name}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <Button variant="contained" color="primary" size="large" sx={{ mt: 2, float: 'right' }} type="submit">
                Submit
            </Button>
        </Box >
    );
};

export default ListingDetailsForm;