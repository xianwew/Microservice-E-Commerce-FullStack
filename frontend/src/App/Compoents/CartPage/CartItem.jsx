import React from 'react';
import { Box, Typography, Link, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
    return (
        <Box display="flex" alignItems="center" p={2} mb={2} borderBottom={1} borderColor="grey.300">
            <Box display="flex" alignItems="center" flexGrow={1}>
                <Box sx={{ width: 100, height: 100, overflow: 'hidden', mr: 2 }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Box>
                    <Typography variant="h6">
                        <Link href={`/item/${item.id}`} underline="hover">{item.title}</Link>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">{item.condition}</Typography>
                    <Typography variant="body2" color="textSecondary">{item.shipping}</Typography>
                    <Typography variant="body2" color="textSecondary">{item.returns}</Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                        <Typography variant="body2" mr={1}>Qty:</Typography>
                        <TextField
                            type="number"
                            value={item.quantity}
                            onChange={(e) => onQuantityChange(item.id, e.target.value)}
                            inputProps={{ min: 1 }}
                            sx={{ width: 80 }}
                        />
                    </Box>
                    <Box display="flex" alignItems="center" mt={1}>
                        <Link href="#" underline="hover" onClick={() => onRemove(item.id)} sx={{ mr: 2 }}>Remove</Link>
                        <Link href="#" underline="hover">Save for later</Link>
                    </Box>
                </Box>
            </Box>
            <Box textAlign="right" ml={2}>
                <Typography variant="h6">{item.price}</Typography>
            </Box>
        </Box>
    );
};

export default CartItem;



