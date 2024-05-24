import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const CategoryItemCard = ({ item }) => {
    return (
        <Card sx={{maxWidth: '150px', height: '230px', margin: '20px'}}>
            <CardMedia
                component="img"
                alt={item.title}
                image={item.image}
                title={item.title}
            />
            <CardContent>
                <Typography variant="h7">{item.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {item.subtitle}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CategoryItemCard;

