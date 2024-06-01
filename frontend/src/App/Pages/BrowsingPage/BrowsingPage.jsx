import React, { useState, useEffect } from 'react';
import FilterSidebar from '../../Compoents/BrowsingPage/FilterSideBar';
import SearchResults from '../../Compoents/BrowsingPage/SearchResults';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import SearchBar from '../../Compoents/SearchBar/SearchBar';
import { useLocation } from 'react-router-dom';
import SearchService from '../../service/SearchService';
import { fetchMainCategories, fetchSubCategories } from '../../service/CategoryService';
import { useNavigate } from 'react-router-dom';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const BrowsePage = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const location = useLocation();
    
    const [searchQuery, setSearchQuery] = useState(query.get('query') || '');
    const [mainCategoryQuery, setMainCategoryQuery] = useState(query.get('mainCategory') || 'all');
    const [subCategoryQuery, setSubCategoryQuery] = useState(query.get('subCategory') || 'all');
    const [minPriceQuery, setMinPriceQuery] = useState(query.get('minPrice') || '');
    const [maxPriceQuery, setMaxPriceQuery] = useState(query.get('maxPrice') || '');
    const [stateQuery, setStateQuery] = useState(query.get('state') || '');
    const [countryQuery, setCountryQuery] = useState(query.get('country') || '');

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
        fetchSubCategoriesForMainCategory(mainCategoryQuery);
    }, [mainCategoryQuery]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const data = await SearchService.searchItems(
                    searchQuery,
                    countryQuery,
                    stateQuery,
                    parseFloat(minPriceQuery),
                    parseFloat(maxPriceQuery),
                    mainCategoryQuery,
                    subCategoryQuery
                );
                setResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchSearchResults();
    }, [searchQuery, countryQuery, stateQuery, minPriceQuery, maxPriceQuery, mainCategoryQuery, subCategoryQuery]);

    const updateURLParams = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.set('query', searchQuery);
        if (countryQuery) params.set('country', countryQuery);
        if (stateQuery) params.set('state', stateQuery);
        if (minPriceQuery) params.set('minPrice', minPriceQuery);
        if (maxPriceQuery) params.set('maxPrice', maxPriceQuery);
        if (mainCategoryQuery !== 'all') params.set('mainCategory', mainCategoryQuery);
        if (subCategoryQuery !== 'all') params.set('subCategory', subCategoryQuery);

        navigate({ search: params.toString() });
    };

    useEffect(() => {
        updateURLParams();
    }, [searchQuery, countryQuery, stateQuery, minPriceQuery, maxPriceQuery, mainCategoryQuery, subCategoryQuery]);

    return (
        <div className='app-content' style={{ width: '100%', paddingTop: '52px', boxSizing: "border-box" }}>
            <div style={{ borderRadius: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', boxSizing: "border-box" }}>
                <div style={{ padding: '0px 0px 30px 0px', width: '85%', minWidth: "400px" }}>
                    <SearchBar 
                        initialQuery={searchQuery} 
                        setSearchQuery={setSearchQuery}
                        countryQuery={countryQuery}
                        setCountryQuery={setCountryQuery}
                        stateQuery={stateQuery}
                        setStateQuery={setStateQuery}
                        minPriceQuery={minPriceQuery}
                        setMinPriceQuery={setMinPriceQuery}
                        maxPriceQuery={maxPriceQuery}
                        setMaxPriceQuery={setMaxPriceQuery}
                        mainCategoryQuery={mainCategoryQuery}
                        setMainCategoryQuery={setMainCategoryQuery}
                        subCategoryQuery={subCategoryQuery}
                        setSubCategoryQuery={setSubCategoryQuery}
                    />
                </div>
                <div style={{ display: 'flex', paddingTop: '20px', boxSizing: 'border-box', padding: '10px 20px 40px 20px', width: '100%' }}>
                    <FilterSidebar
                        mainCategories={mainCategories}
                        subCategories={subCategories}
                        setSubCategories={setSubCategories}
                        fetchSubCategories={fetchSubCategoriesForMainCategory}
                        mainCategorySelection={mainCategoryQuery}
                        setMainCategorySelection={setMainCategoryQuery}
                        subCategorySelection={subCategoryQuery}
                        setSubCategorySelection={setSubCategoryQuery}
                        priceRange={{ min: minPriceQuery, max: maxPriceQuery }}
                        setPriceRange={({ min, max }) => {
                            setMinPriceQuery(min);
                            setMaxPriceQuery(max);
                        }}
                        locationFilter={{ state: stateQuery, country: countryQuery }}
                        setLocationFilter={({ state, country }) => {
                            setStateQuery(state);
                            setCountryQuery(country);
                        }}
                    />
                    <SearchResults results={results} />
                </div>
            </div>
        </div>
    );
};

export default BrowsePage;