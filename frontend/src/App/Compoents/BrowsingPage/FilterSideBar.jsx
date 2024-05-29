import React, { useState } from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Button, Select, MenuItem, TextField } from '@mui/material';

const FilterSidebar = ({ mainCategories, subCategories, fetchSubCategories }) => {
    const [mainCategorySelection, setMainCategorySelection] = useState('');
    const [subCategorySelection, setSubCategorySelection] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [location, setLocation] = useState({ state: '', country: '' });

    const handleMainCategoryChange = (event) => {
        const selectedMainCategory = event.target.value;
        setMainCategorySelection(selectedMainCategory);
        fetchSubCategories(selectedMainCategory.id); // Assuming mainCategory is an object with an id property
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
                    <Typography variant="h6" mb={1}>Main Category</Typography>
                    <Select
                        value={mainCategorySelection}
                        onChange={handleMainCategoryChange}
                        displayEmpty
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        {mainCategories.map((category, idx) => (
                            <MenuItem key={idx} value={category}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>

                <Box mb={2}>
                    <Typography variant="h6" mb={1}>Sub Category</Typography>
                    <Select
                        value={subCategorySelection}
                        onChange={handleSubCategoryChange}
                        displayEmpty
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        {subCategories.map((category, idx) => (
                            <MenuItem key={idx} value={category}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>

                <Box mb={2}>
                    <Typography variant="h6" mb={1}>Price</Typography>
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
                    <Typography variant="h6" mb={1}>Location</Typography>
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