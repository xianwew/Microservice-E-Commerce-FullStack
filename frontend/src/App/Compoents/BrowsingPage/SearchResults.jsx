import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';

const sampleResults = [
    {
        image: 'https://via.placeholder.com/150',
        title: 'MSI Bravo 15 Gaming Laptop 15.6" 144Hz RTX 4060',
        price: '$1,049.99',
        description: 'Brand New - MSI',
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Lenovo LOQ Laptop, 15.6" FHD IPS 144Hz, i7-13650HX, 16GB, 512GB SSD',
        price: '$940.49',
        description: 'Brand New - Lenovo',
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Lenovo LOQ Laptop, 15.6" FHD IPS 144Hz, i7-13650HX, 16GB, 512GB SSD',
        price: '$940.49',
        description: 'Brand New - Lenovo',
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Lenovo LOQ Laptop, 15.6" FHD IPS 144Hz, i7-13650HX, 16GB, 512GB SSD',
        price: '$940.49',
        description: 'Brand New - Lenovo',
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Lenovo LOQ Laptop, 15.6" FHD IPS 144Hz, i7-13650HX, 16GB, 512GB SSD',
        price: '$940.49',
        description: 'Brand New - Lenovo',
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Lenovo LOQ Laptop, 15.6" FHD IPS 144Hz, i7-13650HX, 16GB, 512GB SSD',
        price: '$940.49',
        description: 'Brand New - Lenovo',
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Lenovo LOQ Laptop, 15.6" FHD IPS 144Hz, i7-13650HX, 16GB, 512GB SSD',
        price: '$940.49',
        description: 'Brand New - Lenovo',
    },
];

const SearchResults = () => {
    return (
        <div style={{ flex: '1', padding: '0px 30px 0px 20px', boxSizing: 'border-box'}}>
            <Typography variant="h5" mb={2} sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '36px' }}>
                Search Results
            </Typography>
            <Grid container spacing={2}>
                {sampleResults.map((result, index) => (
                    <Grid item xs={12} key={index}>
                        <Card>
                            <Grid container>
                                <Grid item>
                                    <CardMedia
                                        component="img"
                                        alt={result.title}
                                        image={result.image}
                                        sx={{
                                            width: '250px',
                                            height: '250px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs container direction="column" justifyContent="space-between" paddingBottom={1}>
                                    <CardContent>
                                        <Typography variant="h6">{result.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">{result.description}</Typography>
                                        <Typography variant="h6" color="primary">{result.price}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">View Details</Button>
                                    </CardActions>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default SearchResults;

