import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import ItemImageGallery from '../../Compoents/ItemDetailsPage/ItemImageGallery';
import ItemInfo from '../../Compoents/ItemDetailsPage/ItemInfo';
import ItemVariants from '../../Compoents/ItemDetailsPage/ItemVariants';
import AddToCart from '../../Compoents/ItemDetailsPage/AddToCart';
import ItemDetails from '../../Compoents/ItemDetailsPage/ItemDetails';

const item = {
    title: 'Example Item Title',
    description: 'This is an example item description. It provides detailed information about the item.',
    price: '$199.99',
    images: [
        'https://via.placeholder.com/400',
        'https://via.placeholder.com/400',
        'https://via.placeholder.com/400',
        'https://via.placeholder.com/400',
    ],
    variants: [
        'Variant 1',
        'Variant 2',
        'Variant 3',
        'Variant 4',
    ],
};

const ItemDetailsPage = () => {
    return (
        <Container maxWidth="lg" style={{ paddingTop: '20px' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <ItemImageGallery images={item.images} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ItemInfo
                        title={item.title}
                        description={item.description}
                        price={item.price}
                    />
                    <ItemVariants variants={item.variants} />
                    <AddToCart />
                </Grid>
            </Grid>
            <Grid container spacing={4} mt={4}>
                <Grid item xs={12}>
                    <ItemDetails />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ItemDetailsPage;
