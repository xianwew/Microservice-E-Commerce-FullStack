import React from 'react';
import { Container } from '@mui/material';
import SellerProfileHeader from '../../Compoents/SellerProfilePage/SellerProfilePageHeader';
import SellerProfileTabs from '../../Compoents/SellerProfilePage/SellerProfileTabs';

const seller = {
    username: 'seller123',
    profilePicture: 'https://via.placeholder.com/100',
    rating: 4.5,
    location: 'New York, USA',
};

const SellerProfilePage = () => {
    return (
        <div className='app-content' style={{ paddingTop: '20px', padding: '50px' }}>
            <div style={{ padding: '50px', backgroundColor: '#fafafa' }}>
                <SellerProfileHeader seller={seller} />
                <SellerProfileTabs />
            </div>
        </div>
    );
};

export default SellerProfilePage;
