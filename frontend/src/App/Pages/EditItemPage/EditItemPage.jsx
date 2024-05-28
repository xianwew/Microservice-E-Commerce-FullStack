import React, { useState, useEffect }  from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Grid, Button, Box } from '@mui/material';
import ImageUpload from '../../Compoents/SellPage/ImageUpload';
import ListingDetailsForm from '../../Compoents/SellPage/ListingDetailsForm';
import ConfirmDeletion from '../../Compoents/ConfirmDialog/ConfirmDeletion';
import { fetchItem, updateItem, deleteItem } from '../../service/ListingsService';
import { fetchMainCategories, fetchSubCategories } from '../../service/CategoryService';
import { showSnackbar } from '../../redux/slice/snackbarSlice';
import { useDispatch } from 'react-redux';

const EditItemPage = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mainCategories, setMainCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [itemData, setItemData] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            const categories = await fetchMainCategories();
            setMainCategories(categories);
        };

        const loadItem = async () => {
            try {
                const item = await fetchItem(itemId); // Ensure itemId is correctly passed as a Long
                setItemData(item);
                setSelectedMainCategory(item.mainCategoryId);
                const subCategories = await fetchSubCategories(item.mainCategoryId);
                setSubCategories(subCategories);
                setCoverImage(item.imageUrl);
                setAdditionalImages([item.subImageUrl1, item.subImageUrl2, item.subImageUrl3, item.subImageUrl4].filter(Boolean));
            } catch (error) {
                console.error('Failed to fetch item:', error);
            }
        };

        loadCategories();
        loadItem();
    }, [itemId]);

    const handleMainCategoryChange = async (mainCategoryId) => {
        setSelectedMainCategory(mainCategoryId);
        const subCategories = await fetchSubCategories(mainCategoryId);
        setSubCategories(subCategories);
    };

    const handleCoverImageUpload = (file) => {
        setCoverImage(file);
    };

    const handleAdditionalImagesUpload = (files) => {
        setAdditionalImages(files);
    };

    const handleSubmit = async (updatedItemData) => {
        try {
            dispatch(showSnackbar({ open: true, message: 'Updating listing...', severity: 'info' }));
            const updatedListing = await updateItem(itemId, updatedItemData, coverImage, additionalImages);
            console.log('Listing updated:', updatedListing);
            dispatch(showSnackbar({ open: true, message: 'Listing updated successfully!', severity: 'success' }));
            navigate('/');
        } catch (error) {
            console.error('Failed to update listing:', error);
            const errorMessage = error.response?.data || 'Failed to update listing.';
            dispatch(showSnackbar({ open: true, message: errorMessage, severity: 'error' }));
        }
    };

    const handleDelete = async () => {
        try {
            await deleteItem(itemId);
            dispatch(showSnackbar({ open: true, message: 'Listing deleted successfully', severity: 'success' }));
            navigate('/user/listings');
        } catch (error) {
            console.error('Failed to delete listing:', error);
            const errorMessage = error.response?.data || 'Failed to delete listing.';
            dispatch(showSnackbar({ open: true, message: errorMessage, severity: 'error' }));
        } finally {
            setOpenDialog(false);
        }
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    if (!itemData) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div className='app-content' style={{ justifyContent: 'center' }}>
            <div style={{ padding: '50px 80px 80px 80px', backgroundColor: '#fafafa' }}>
                <Typography variant="h4" fontWeight="bold" mb={6} textAlign='center'>Edit Listing</Typography>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{width: '25%', minWidth: '380px'}}>
                        <ImageUpload
                            initialCoverImage={coverImage}
                            initialAdditionalImages={additionalImages}
                            onCoverImageUpload={handleCoverImageUpload}
                            onAdditionalImagesUpload={handleAdditionalImagesUpload}
                        />
                    </div>
                    <div style={{flex: '1'}}>
                        <ListingDetailsForm
                            mainCategories={mainCategories}
                            subCategories={subCategories}
                            onMainCategoryChange={handleMainCategoryChange}
                            selectedMainCategory={selectedMainCategory}
                            onSubmit={handleSubmit}
                            initialData={itemData}
                        />
                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button variant="contained" color="error" onClick={handleOpenDialog} sx={{ marginRight: '30px', height: '42.25px' }}>
                                Delete Listing
                            </Button>
                        </Box>
                    </div>
                </div>
            </div>
            <ConfirmDeletion
                open={openDialog}
                onClose={handleCloseDialog}
                onConfirm={handleDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this item? This action cannot be undone."
            />
        </div>
    );
};

export default EditItemPage;