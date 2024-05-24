import React from 'react';
import { Box, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

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
    return (
        <div style={{ width: "10%", minWidth: '280px', boxSizing: 'border-box', display: 'flex', justifyContent: 'center', paddingTop: '55px' }}>
            <div>
                {filterCategories.map((category, index) => (
                    <Box key={index} mb={2}>
                        <Typography variant="h6">{category.title}</Typography>
                        <FormGroup>
                            {category.options.map((option, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    control={<Checkbox />}
                                    label={option}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                ))}
            </div>
        </div>
    );
};

export default FilterSidebar;
