import React from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const sampleItems = [
    {
        id: 1,
        title: 'Item 1',
        image: 'https://via.placeholder.com/150',
        price: '$100',
    },
    {
        id: 2,
        title: 'Item 2',
        image: 'https://via.placeholder.com/150',
        price: '$200',
    },
    // Add more items as needed
];

const SellerItems = () => {
    return (
        <Box >
            <Typography variant="h6" mb={2}>Items for Sale</Typography>
            <Grid container spacing={2}>
                {sampleItems.map((item) => (
                    <Grid item xs={12} sm={6} md={3} key={item.id}>
                        <Card sx={{width: '200px'}}>
                            <Box sx={{ width: '200px', height: '200px', overflow: 'hidden' }}>
                                <CardMedia
                                    component="img"
                                    alt={item.title}
                                    image={item.image}
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }} // Ensures the image fits within the box
                                />
                            </Box>
                            <CardContent>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="body2" color="textSecondary">{item.price}</Typography>
                                <Button variant="contained" color="primary" size="small" sx={{ mt: 2 }}>View Details</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SellerItems;


