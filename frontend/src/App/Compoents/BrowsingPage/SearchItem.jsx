import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { decodeToken } from '../../Auth/JwtUtils';
import { useSelector } from 'react-redux';

const SearchItem = ({ result }) => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const decodedToken = decodeToken(token);
    const currentUserId = decodedToken?.sub;

    const handleSellerClick = () => {
        if (result.sellerId === currentUserId) {
            navigate('/profile');
        } else {
            navigate(`/seller-profile/${result.sellerId}`);
        }
    };

    const handleItemClick = () => {
        navigate(`/item/${result.id}/0`);
    };

    const renderStars = (totalRating, numRatings) => {
        if (numRatings === 0) return "No ratings yet";
        const averageRating = totalRating / numRatings;
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= averageRating) {
                stars.push(<StarIcon key={i} sx={{ color: '#FFD700', fontSize: '1rem' }} />);
            } else if (i - 1 < averageRating && averageRating < i) {
                stars.push(<StarHalfIcon key={i} sx={{ color: '#FFD700', fontSize: '1rem' }} />);
            } else {
                stars.push(<StarBorderIcon key={i} sx={{ color: '#FFD700', fontSize: '1rem' }} />);
            }
        }
        return stars;
    };

    return (
        <Grid item xs={12}>
            <Card>
                <Grid container>
                    <Grid item>
                        <CardMedia
                            component="img"
                            alt={result.title}
                            image={result.imageUrl}
                            sx={{
                                width: '250px',
                                height: '250px',
                                objectFit: 'cover',
                            }}
                        />
                    </Grid>
                    <Grid item xs container direction="column" justifyContent="space-between" paddingBottom={1}>
                        <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: '1', paddingBottom: '5px'}}>
                            <div>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{result.title}</Typography>
                                <Typography variant="body1" color="textSecondary" sx={{ fontSize: '18px' }}>{result.shortDescription}</Typography>
                                <Typography variant="h6" color="primary" >${result.price}</Typography>
                            </div>
                            <div>
                                <Typography variant="body2" color="textSecondary">{result.city}, {result.state}, {result.country}</Typography>
                                <div style={{ display: 'flex', alignItems: 'center', minHeight: '30px' }} >
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={handleSellerClick}
                                        sx={{ transform: 'translateY(3px)', marginRight: '20px', paddingLeft: '0px' }}
                                    >
                                        {result.username}
                                    </Button>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {renderStars(result.totalRating, result.numRatings)}
                                        {result.numRatings > 0 && (
                                            <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>
                                                ({(result.totalRating / result.numRatings).toFixed(1)} / {result.numRatings} ratings)
                                            </Typography>
                                        )}
                                    </Box>
                                </div>
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" variant='contained' sx={{ marginLeft: '8px' }} onClick={handleItemClick}>View Details</Button>
                        </CardActions>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

export default SearchItem;