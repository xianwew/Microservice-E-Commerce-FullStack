import React, {useEffect} from 'react';
import { Container, Box } from '@mui/material';
import UserProfileHeader from '../../Compoents/UserProfilePage/UserProfileHeader';
import UserProfileTabs from '../../Compoents/UserProfilePage/UserProfileTabs';


const UserProfilePage = () => {

    return (
        <div className='app-content' style={{ paddingTop: '20px',  padding: '50px' }}>
            <div style={{padding: '50px', backgroundColor: '#fafafa'}}>
                <UserProfileHeader />
                <UserProfileTabs />
            </div>
        </div>
    );
};

export default UserProfilePage;
