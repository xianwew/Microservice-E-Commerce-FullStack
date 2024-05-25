import React from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';

const deliveryAreas = [
    'Local',
    'National',
    'International'
];

const ListingDetailsForm = () => {
    return (
        <Box component="form" >
            <Typography variant="h6" mb={2}>Listing Details</Typography>
            <TextField
                label="Listing Title"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Brief Description"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Long Description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
            <TextField
                label="Price"
                type="number"
                fullWidth
                margin="normal"
            />
            <TextField
                label="City"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Country"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Supported Delivery Area"
                select
                fullWidth
                margin="normal"
            >
                {deliveryAreas.map((area, index) => (
                    <MenuItem key={index} value={area}>
                        {area}
                    </MenuItem>
                ))}
            </TextField>
            <Button variant="contained" color="primary" size="large" sx={{ mt: 2, float: 'right' }}>
                Submit
            </Button>
        </Box>
    );
};

export default ListingDetailsForm;
