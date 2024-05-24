import React from 'react';
import { Container, Box } from '@mui/material';
import UserProfileHeader from '../../Compoents/ProfilePage/UserProfileHeader';
import UserProfileTabs from '../../Compoents/ProfilePage/UserProfileTabs';

const user = {
    name: 'xia1202',
    profilePicture: 'https://via.placeholder.com/100',
    feedback: '100% positive feedback (98)',
};

const UserProfilePage = () => {
    return (
        <div className='app-content' style={{ paddingTop: '20px',  padding: '50px' }}>
            <div style={{padding: '50px', backgroundColor: '#fafafa'}}>
                <UserProfileHeader user={user} />
                <UserProfileTabs />
            </div>
        </div>
    );
};

export default UserProfilePage;
