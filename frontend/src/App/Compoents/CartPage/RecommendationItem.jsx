import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const RecommendationItem = ({ item }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                alt={item.title}
                height="140"
                image={item.image}
            />
            <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="textSecondary">{item.price}</Typography>
                <Button variant="contained" color="primary" size="small" sx={{ mt: 2 }}>View Details</Button>
            </CardContent>
        </Card>
    );
};

export default RecommendationItem;


