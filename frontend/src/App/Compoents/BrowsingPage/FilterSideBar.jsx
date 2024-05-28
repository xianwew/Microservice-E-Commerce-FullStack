import React, { useState } from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Button, Select, MenuItem, TextField } from '@mui/material';

const filterCategories = [
    {
        title: 'Screen Size',
        options: ['13-13.9 in', '14-14.9 in', '15-15.9 in', '16-16.9 in', 'Not Specified'],
    },
    {
        title: 'Processor',
        options: ['AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9', 'Intel Core i7 11th Gen.', 'Intel Core i7 12th Gen.', 'Intel Core i7 13th Gen.'],
    },
    {
        title: 'Brand',
        options: ['Acer', 'ASUS', 'Dell', 'GIGABYTE', 'HP', 'MSI'],
    },
];

const FilterSidebar = () => {
    const [mainCategories, setMainCategories] = useState(['All']);
    const [subCategories, setSubCategories] = useState(['All']);
    const [mainCategorySelection, setMainCategorySelection] = useState('');
    const [subCategorySelection, setSubCategorySelection] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [location, setLocation] = useState({ state: '', country: '' });

    const handleMainCategoryChange = (event) => {
        setMainCategorySelection(event.target.value);
    };

    const handleSubCategoryChange = (event) => {
        setSubCategorySelection(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPriceRange({
            ...priceRange,
            [event.target.name]: event.target.value
        });
    };

    const handleLocationChange = (event) => {
        setLocation({
            ...location,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Box sx={{ width: "10%", minWidth: '300px', boxSizing: 'border-box', display: 'flex', justifyContent: 'center', paddingTop: '55px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box mb={2}>
                    <Typography variant="h6">Main Category</Typography>
                    <Select
                        value={mainCategorySelection}
                        onChange={handleMainCategoryChange}
                        displayEmpty
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        {mainCategories.map((category, idx) => (
                            <MenuItem key={idx} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </Box>

                <Box mb={2}>
                    <Typography variant="h6">Sub Category</Typography>
                    <Select
                        value={subCategorySelection}
                        onChange={handleSubCategoryChange}
                        displayEmpty
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        {subCategories.map((category, idx) => (
                            <MenuItem key={idx} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </Box>

                <Box mb={2}>
                    <Typography variant="h6">Price</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            label="Min Price"
                            variant="outlined"
                            name="min"
                            value={priceRange.min}
                            onChange={handlePriceChange}
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            label="Max Price"
                            variant="outlined"
                            name="max"
                            value={priceRange.max}
                            onChange={handlePriceChange}
                        />
                    </Box>
                </Box>

                <Box mb={2}>
                    <Typography variant="h6">Location</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            label="State"
                            variant="outlined"
                            name="state"
                            value={location.state}
                            onChange={handleLocationChange}
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            label="Country"
                            variant="outlined"
                            name="country"
                            value={location.country}
                            onChange={handleLocationChange}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default FilterSidebar;

