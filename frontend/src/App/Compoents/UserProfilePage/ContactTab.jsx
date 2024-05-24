import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const ContactTab = () => {
    return (
        <Box mt={2}>
            <Typography variant="h6" mb={2}>Contact Information</Typography>
            <Box component="form">
                <TextField label="Email Address" fullWidth margin="normal" />
                <TextField label="Phone Number" fullWidth margin="normal" />
                <TextField label="Shipping Address" fullWidth margin="normal" multiline rows={4} />
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>Save Changes</Button>
            </Box>
        </Box>
    );
};

export default ContactTab;
