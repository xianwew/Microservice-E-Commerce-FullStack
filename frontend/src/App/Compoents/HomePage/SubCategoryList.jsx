import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CategoryItemCard from './CategoryItemCard';

const SubCategoryList = ({ title, items }) => {
    return (
        <div style={{ margin: '20px 0px 50px 0px', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <Typography variant="h4" gutterBottom sx={{ marginBottom: '25px', fontWeight: 'bold' }}>
                {title}
            </Typography>
            <Grid container sx={{ backgroundColor: '#fafafa', borderRadius: '25px', minHeight: '300px', overflow: 'hidden' }}>
                {items.map((item, index) => (
                    <Grid item xs={6} md={4} lg={3} key={index} >
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%" >
                            <CategoryItemCard item={item} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default SubCategoryList;
