import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Grid, Button, Box } from '@mui/material';
import ImageUpload from '../../Compoents/SellPage/ImageUpload';
import ListingDetailsForm from '../../Compoents/SellPage/ListingDetailsForm';

const EditItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        // Add your delete logic here
        console.log(`Deleting listing with id: ${id}`);
        // After delete logic, navigate back to a suitable page, e.g., user listings page
        navigate('/user/listings');
    };

    return (
        <div className='app-content' style={{ justifyContent: 'center' }}>
            <div style={{ padding: '50px 80px 80px 80px', backgroundColor: '#fafafa' }}>
                <Typography variant="h4" fontWeight="bold" mb={6} textAlign='center'>Edit Listing</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <ImageUpload />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ListingDetailsForm />
                        <Box display="flex" justifyContent="flex-end" mt={2} >
                            <Button variant="contained" color="error" onClick={handleDelete} sx={{marginRight: '30px', height: '42.25px'}}>
                                Delete Listing
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default EditItemPage;
