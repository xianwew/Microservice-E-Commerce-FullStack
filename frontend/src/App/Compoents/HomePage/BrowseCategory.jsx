import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { fetchSubCategories } from '../../service/CategoryService';
import CategoryItemCard from './CategoryItemCard';

const BrowseCategory = ({ mainCategoryId }) => {
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        if (mainCategoryId) {
            const loadSubCategories = async () => {
                const subCats = await fetchSubCategories(mainCategoryId);
                setSubCategories(subCats);
            };

            loadSubCategories();
        }
    }, [mainCategoryId]);

    if (!mainCategoryId) {
        return null;
    }

    return (
        <Box
            sx={{
                borderRadius: '25px',
                width: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                padding: '16px'
            }}
        >
            {subCategories.map((subCategory) => (
                <Box key={subCategory.id} sx={{ maxWidth: 'calc(33.333% - 16px)' }}>
                    <CategoryItemCard item={{ image: subCategory.imageUrl, title: subCategory.name, subtitle: '' }} />
                </Box>
            ))}
        </Box>
    );
};

export default BrowseCategory;
