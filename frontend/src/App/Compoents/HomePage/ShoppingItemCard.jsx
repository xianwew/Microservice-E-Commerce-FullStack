import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ShoppingItemCard = ({ image, title, price }) => {
  return (
    <Card style={{ position: 'relative', maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={title}
        height="200"
        image={image}
        title={title}
      />
      <IconButton
        aria-label="add to favorites"
        style={{ position: 'absolute', top: 10, right: 10 }}
      >
        <FavoriteIcon />
      </IconButton>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-between' }}>
        <Typography variant="body1" color="textSecondary">
          ${price}
        </Typography>
        <Button size="small" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ShoppingItemCard;
