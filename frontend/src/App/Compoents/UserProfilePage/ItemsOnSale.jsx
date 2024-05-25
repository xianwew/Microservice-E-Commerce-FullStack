import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, Button, CardActions } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function ItemsOnSale() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const { userId } = useParams(); 

    useEffect(() => {
        // Fake data
        const fakeItems = [
            {
                id: 1,
                title: 'Item 1',
                description: 'Description for item 1',
                price: '$100',
                image: 'https://via.placeholder.com/250',
                dateListed: '2023-05-01',
            },
            {
                id: 2,
                title: 'Item 2',
                description: 'Description for item 2',
                price: '$200',
                image: 'https://via.placeholder.com/250',
                dateListed: '2023-04-20',
            },
            {
                id: 3,
                title: 'Item 3',
                description: 'Description for item 3',
                price: '$300',
                image: 'https://via.placeholder.com/250',
                dateListed: '2023-03-15',
            },
        ];
        setItems(fakeItems);
    }, []);

    const handleEdit = (itemId) => {
        navigate(`/user/${userId}/item/${itemId}/edit`);
    };

    const handleDelete = (itemId) => {
        // Handle delete logic
        setItems(items.filter(item => item.id !== itemId));
    };

    return (
        <Grid container spacing={2} sx={{marginTop: '5px'}}>
            {items.map(item => (
                <Grid item key={item.id} xs={12}>
                    <Card>
                        <Grid container>
                            <Grid item>
                                <CardMedia
                                    component="img"
                                    alt={item.title}
                                    image={item.image}
                                    sx={{
                                        width: '230px',
                                        height: '230px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Grid>
                            <Grid item xs container direction="column" justifyContent="space-between" paddingBottom={1}>
                                <CardContent>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                                    <Typography variant="h6" color="primary">{item.price}</Typography>
                                    <Typography variant="body2" color="textSecondary">Listed on: {new Date(item.dateListed).toLocaleDateString()}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => navigate(`/item/${item.id}`)}>View Details</Button>
                                    <Button size="small" color="secondary" onClick={() => handleEdit(item.id)}>Edit</Button>
                                </CardActions>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default ItemsOnSale;

