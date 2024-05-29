import React, { useState, useEffect } from 'react';
import FilterSidebar from '../../Compoents/BrowsingPage/FilterSideBar';
import SearchResults from '../../Compoents/BrowsingPage/SearchResults';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import SearchBar from '../../Compoents/SearchBar/SearchBar';
import { useLocation } from 'react-router-dom';
import SearchService from '../../service/SearchService';
import { fetchMainCategories, fetchSubCategories } from '../../service/CategoryService';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const BrowsePage = () => {
    const query = useQuery();
    const searchQuery = query.get('query') || '';
    const mainCategoryQuery = query.get('mainCategory') || 'all';
    const subCategoryQuery = query.get('subCategory') || 'all';
    const minPriceQuery = query.get('minPrice') || '';
    const maxPriceQuery = query.get('maxPrice') || '';
    const stateQuery = query.get('state') || '';
    const countryQuery = query.get('country') || '';

    const [results, setResults] = useState([]);
    const [mainCategories, setMainCategories] = useState([{ id: 'all', name: 'All' }]);
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const mainCategoriesData = await fetchMainCategories();
                setMainCategories([{ id: 'all', name: 'All' }, ...mainCategoriesData]);
            } catch (error) {
                console.error('Error fetching main categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const fetchSubCategoriesForMainCategory = async (mainCategoryId) => {
        try {
            if (mainCategoryId === 'all') {
                setSubCategories([{ id: 'all', name: 'All' }]);
                return;
            }
            const subCategoriesData = await fetchSubCategories(mainCategoryId);
            setSubCategories([{ id: 'all', name: 'All' }, ...subCategoriesData]);
        } catch (error) {
            console.error('Error fetching sub categories:', error);
        }
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const data = await SearchService.searchItems(searchQuery, countryQuery, stateQuery, parseFloat(minPriceQuery), parseFloat(maxPriceQuery), mainCategoryQuery, subCategoryQuery);
                setResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchSearchResults();
    }, [searchQuery, countryQuery, stateQuery, minPriceQuery, maxPriceQuery, mainCategoryQuery, subCategoryQuery]);

    return (
        <div className='app-content' style={{ height: '100%', marginBottom: '40px', paddingTop: '52px' }}>
            <div style={{ backgroundColor: '#f5f5f5', borderRadius: '25px', padding: '40px 20px 20px 0px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Typography variant="h5" mb={2} sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '36px' }}>
                    Search Results
                </Typography>
                <div style={{ padding: '20px 40px', width: '85%', minWidth: "400px" }}>
                    <SearchBar initialQuery={searchQuery} />
                </div>
                <div style={{ display: 'flex', paddingTop: '20px', boxSizing: 'border-box', padding: '10px 20px 40px 20px', width: '100%' }}>
                    <FilterSidebar
                        mainCategories={mainCategories}
                        subCategories={subCategories}
                        setSubCategories={setSubCategories}
                        fetchSubCategories={fetchSubCategoriesForMainCategory}
                    />
                    <SearchResults results={results} />
                </div>
            </div>
        </div>
    );
};

export default BrowsePage;