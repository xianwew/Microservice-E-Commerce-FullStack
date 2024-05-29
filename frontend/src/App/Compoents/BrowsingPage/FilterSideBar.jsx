import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, TextField } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDebounce } from 'use-debounce';


const FilterSidebar = ({ mainCategories, subCategories, setSubCategories, fetchSubCategories }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [mainCategorySelection, setMainCategorySelection] = useState(queryParams.get('mainCategory') || 'all');
    const [subCategorySelection, setSubCategorySelection] = useState(queryParams.get('subCategory') || 'all');
    const [priceRange, setPriceRange] = useState({
        min: queryParams.get('minPrice') || '',
        max: queryParams.get('maxPrice') || ''
    });
    const [locationFilter, setLocationFilter] = useState({
        state: queryParams.get('state') || '',
        country: queryParams.get('country') || ''
    });

    const [debouncedMainCategorySelection] = useDebounce(mainCategorySelection, 500);
    const [debouncedSubCategorySelection] = useDebounce(subCategorySelection, 500);
    const [debouncedPriceRange] = useDebounce(priceRange, 500);
    const [debouncedLocationFilter] = useDebounce(locationFilter, 500);

    const updateQueryParams = () => {
        const params = new URLSearchParams();
        if (debouncedMainCategorySelection !== 'all') params.set('mainCategory', debouncedMainCategorySelection);
        if (debouncedSubCategorySelection !== 'all') params.set('subCategory', debouncedSubCategorySelection);
        if (debouncedPriceRange.min) params.set('minPrice', debouncedPriceRange.min);
        if (debouncedPriceRange.max) params.set('maxPrice', debouncedPriceRange.max);
        if (debouncedLocationFilter.state) params.set('state', debouncedLocationFilter.state);
        if (debouncedLocationFilter.country) params.set('country', debouncedLocationFilter.country);
        navigate({ search: params.toString() });
    };

    useEffect(() => {
        updateQueryParams();
    }, [debouncedMainCategorySelection, debouncedSubCategorySelection, debouncedPriceRange, debouncedLocationFilter]);

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
            let newRange = { ...prevRange, [name]: value };
    
            if (name === 'min') {
                if (!newRange.max || parseFloat(value) > parseFloat(newRange.max)) {
                    newRange.max = value;
                }
                if (value === '') {
                    newRange.max = '';
                }
            } else if (name === 'max') {
                if (!newRange.min || parseFloat(value) < parseFloat(newRange.min)) {
                    newRange.min = value;
                }
                if (value === '') {
                    newRange.min = '';
                }
            }
    
            return newRange;
        });
    };

    const handleLocationChange = (event) => {
        setLocationFilter({
            ...locationFilter,
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
                            <MenuItem key={idx} value={category.id}>
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
                        {subCategories.map((category, idx) => (
                            <MenuItem key={idx} value={category.id}>
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
                            value={locationFilter.state}
                            onChange={handleLocationChange}
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            label="Country"
                            variant="outlined"
                            name="country"
                            value={locationFilter.country}
                            onChange={handleLocationChange}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default FilterSidebar;