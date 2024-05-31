import React, { useEffect, useState } from 'react';
import { Container, Grid, Button, Typography, Box, Divider, TextField } from '@mui/material';
import ItemImageGallery from '../../Compoents/ItemDetailsPage/ItemImageGallery';
import ItemDetails from '../../Compoents/ItemDetailsPage/ItemDetails';
import { fetchItem } from '../../service/ListingsService';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import { fetchSeller } from '../../service/UserService';
import { addItemToCart } from '../../service/CartService';
import { showSnackbar } from '../../redux/slice/snackbarSlice';
import { useDispatch } from 'react-redux';

const ItemDetailsPage = () => {
    const { id, tabIndex: tabIndexParam } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentUserId = useSelector((state) => state.auth.user?.id);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const getItem = async () => {
            try {
                const data = await fetchItem(id);
                setItem(data);
                const sellerData = await fetchSeller(data.sellerId);
                setSeller(sellerData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching item or seller details');
                setLoading(false);
            }
        };

        getItem();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const images = [
        item.imageUrl,
        item.subImageUrl1,
        item.subImageUrl2,
        item.subImageUrl3,
        item.subImageUrl4
    ].filter(Boolean); // Remove any undefined or null values

    const handleSellerClick = () => {
        if (item.sellerId === currentUserId) {
            navigate('/profile');
        } else {
            navigate(`/seller-profile/${item.sellerId}`);
        }
    };

    const itemRating = item.numRatings > 0 ? item.totalRating / item.numRatings : 0;
    const sellerRating = seller && seller.numRatings > 0 ? seller.totalRating / seller.numRatings : 0;

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleAddToCart = async () => {
        try {
            const cartItem = {
                itemId: item.id,
                quantity: parseInt(quantity, 10),
            };
            await addItemToCart(cartItem);
            dispatch(showSnackbar({ open: true, message: 'Item added to cart', severity:'success' })); 
        } 
        catch (error) {
            console.error('Error adding item to cart:', error);
            dispatch(showSnackbar({ open: true, message: 'Failed to add item to cart! ' + error.response.data, severity: 'error' }));
        }
    };

    return (
        <Container className='app-content' style={{ minWidth: '100%' }}>
            <Box sx={{ padding: '40px 60px', width: '100%', boxSizing: 'border-box' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6 }}>
                    <Box sx={{ flex: 1 }}>
                        {images.length > 0 ? (
                            <ItemImageGallery images={images} />
                        ) : (
                            <div>No images available</div>
                        )}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Box>
                            <Typography variant="h3" fontWeight="bold">{item.title}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={2} >
                            <Button onClick={handleSellerClick} sx={{padding: '10px 0px'}}>
                                {item.username}
                            </Button>
                            <Box display="flex" alignItems="center" ml={2}>
                                <Rating value={sellerRating} readOnly />
                                <Typography variant="body2" ml={1}>
                                    ({seller?.numRatings ? seller.numRatings : 0} ratings)
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center" mb={2} sx={{ paddingTop: '10px' }}>
                            <Typography variant="body2" mr={1}>Item Rating</Typography>
                            <Rating value={itemRating} readOnly />
                            <Typography variant="body2" ml={1}>
                                ({item.numRatings} ratings)
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h4" color="primary" mt={2}>${item.price}</Typography>
                        <Typography variant="body2" sx={{paddingTop: '30px'}}>Quantity left: {item.quantity}</Typography>
                        <Box display="flex" alignItems="center" mt={2} mb={2} gap={2}>
                            <TextField
                                type="number"
                                label="Quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                                inputProps={{ min: 1, max: item.quantity }}
                                sx={{ width: '100px' }}
                            />
                            <Button variant="contained" color="primary" sx={{height: '55px'}} onClick={handleAddToCart}>
                                Add to Cart
                            </Button>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Typography sx={{fontWeight: 'bold', fontSize: '20px'}} mt={2}>Description</Typography>
                        <Typography variant="body1" mt={2}>{item.shortDescription}</Typography>
                    </Box>
                </Box>
                <Box mt={4}>
                    <ItemDetails item={item} />
                </Box>
            </Box>
        </Container>
    );
};

export default ItemDetailsPage;