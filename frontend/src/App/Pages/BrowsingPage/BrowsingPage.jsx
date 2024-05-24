import React from 'react';
import FilterSidebar from '../../Compoents/BrowsingPage/FilterBar';
import SearchResults from '../../Compoents/BrowsingPage/SearchResults';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import SearchBar from '../../Compoents/SearchBar/SearchBar';

const BrowsePage = () => {
    return (
        <div className='app-content' style={{  height: '100%', marginBottom: '40px', paddingTop: '52px' }}>
            <div style={{ backgroundColor: '#f5f5f5', borderRadius: '25px', padding: '40px 20px 20px 0px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'  }}>
                <Typography variant="h5" mb={2} sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '36px'}}>
                    Search Results
                </Typography>
                <div style={{padding: '20px 40px', width: '85%', minWidth: "400px"}}>
                    <SearchBar />
                </div>
                <div style={{ display: 'flex', paddingTop: '20px', boxSizing: 'border-box', paddingBottom: '40px' }} >
                    <FilterSidebar />
                    <SearchResults />
                </div>
            </div>
        </div>
    );
};

export default BrowsePage;
