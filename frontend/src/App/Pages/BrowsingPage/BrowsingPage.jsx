import React from 'react';
import FilterSidebar from '../../Compoents/BrowsingPage/FilterBar';
import SearchResults from '../../Compoents/BrowsingPage/SearchResults';

const BrowsePage = () => {
    return (
        <div className='app-content' style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', height: '100%', backgroundColor: '#fafafa', marginBottom: '40px' }}>
            <div style={{display: 'flex', paddingTop: '40px', boxSizing: 'border-box', paddingBottom: '40px'}} >
                <FilterSidebar />
                <SearchResults />
            </div>
        </div>
    );
};

export default BrowsePage;
