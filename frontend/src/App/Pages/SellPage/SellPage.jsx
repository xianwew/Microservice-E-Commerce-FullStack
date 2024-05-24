import React from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import ImageUpload from '../../Compoents/SellPage/ImageUpload';
import ListingDetailsForm from '../../Compoents/SellPage/ListingDetailsForm';


const SellPage = () => {
    return (
        <div className='app-content' style={{ justifyContent: 'center' }}>
            <div style={{padding: '50px 80px 80px 80px', backgroundColor: '#fafafa' }}>
                <Typography variant="h4" fontWeight="bold" mb={6} textAlign='center'>Create a New Listing</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <ImageUpload />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ListingDetailsForm />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default SellPage;
