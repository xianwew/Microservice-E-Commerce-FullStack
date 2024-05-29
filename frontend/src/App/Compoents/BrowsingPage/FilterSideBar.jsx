import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

const FilterSidebar = ({ mainCategories, subCategories, setSubCategories, fetchSubCategories }) => {
    const [mainCategorySelection, setMainCategorySelection] = useState('all');
    const [subCategorySelection, setSubCategorySelection] = useState('all');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [location, setLocation] = useState({ state: '', country: '' });
    const navigate = useNavigate();

    const [debouncedMainCategorySelection] = useDebounce(mainCategorySelection, 500);
    const [debouncedSubCategorySelection] = useDebounce(subCategorySelection, 500);
    const [debouncedPriceRange] = useDebounce(priceRange, 500);
    const [debouncedLocation] = useDebounce(location, 500);

    const updateQueryParams = () => {
        const params = new URLSearchParams();
        if (debouncedMainCategorySelection !== 'all') params.set('mainCategory', debouncedMainCategorySelection);
        if (debouncedSubCategorySelection !== 'all') params.set('subCategory', debouncedSubCategorySelection);
        if (debouncedPriceRange.min) params.set('minPrice', debouncedPriceRange.min);
        if (debouncedPriceRange.max) params.set('maxPrice', debouncedPriceRange.max);
        if (debouncedLocation.state) params.set('state', debouncedLocation.state);
        if (debouncedLocation.country) params.set('country', debouncedLocation.country);
        navigate({ search: params.toString() });
    };

    useEffect(() => {
        updateQueryParams();
    }, [debouncedMainCategorySelection, debouncedSubCategorySelection, debouncedPriceRange, debouncedLocation]);

    const handleMainCategoryChange = (event) => {
        const selectedMainCategory = event.target.value;
        setMainCategorySelection(selectedMainCategory);
        setSubCategorySelection('all');
        if (selectedMainCategory !== 'all') {
            fetchSubCategories(selectedMainCategory);
        } else {
            setSubCategories([{ id: 'all', name: 'All' }]);
        }
    };

    const handleSubCategoryChange = (event) => {
        setSubCategorySelection(event.target.value);
    };

    const handlePriceChange = (event) => {
        const { name, value } = event.target;
        setPriceRange((prevRange) => {
            const newRange = { ...prevRange, [name]: value };
            if (name === 'min' && newRange.max && value > newRange.max) {
                newRange.max = value;
            } else if (name === 'max' && newRange.min && value < newRange.min) {
                newRange.min = value;
            }
            return newRange;
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
                        <MenuItem value="all">All</MenuItem>
                        {mainCategories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
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
                        disabled={mainCategorySelection === 'all'}
                    >
                        <MenuItem value="all">All</MenuItem>
                        {subCategories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
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