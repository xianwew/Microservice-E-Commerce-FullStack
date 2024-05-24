import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';

const MAX_IMAGES = 5;

const ImageUpload = () => {
    const [coverImage, setCoverImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);

    const handleCoverImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCoverImage(file);
        }
    };

    const handleAdditionalImagesUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.slice(0, MAX_IMAGES - additionalImages.length - (coverImage ? 1 : 0));
        setAdditionalImages(prevImages => [...prevImages, ...newImages]);
    };

    const handleDeleteCoverImage = () => {
        setCoverImage(null);
    };

    const handleDeleteAdditionalImage = (index) => {
        setAdditionalImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    return (
        <Box>
            <Typography variant="h6" mb={2}>Upload Images</Typography>
            <Box mb={2}>
                <Typography variant="subtitle1" mb={1}>Cover Image</Typography>
                <Box
                    component="label"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="150px"
                    height="150px"
                    border="2px dashed #ddd"
                    borderRadius="4px"
                    position="relative"
                    sx={{ cursor: 'pointer' }}
                >
                    {coverImage ? (
                        <>
                            <img
                                src={URL.createObjectURL(coverImage)}
                                alt="cover"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <IconButton
                                onClick={handleDeleteCoverImage}
                                color="secondary"
                                style={{ position: 'absolute', top: 0, right: 0 }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <UploadIcon />
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleCoverImageUpload}
                            />
                        </>
                    )}
                </Box>
            </Box>
            <Box mb={2}>
                <Typography variant="subtitle1" mb={1}>Additional Images</Typography>
                <Box display="flex" flexWrap="wrap" gap="30px">
                    {additionalImages.map((image, index) => (
                        <Box
                            key={index}
                            position="relative"
                            width="150px"
                            height="150px"
                            border="2px dashed #ddd"
                            borderRadius="4px"
                            sx={{ cursor: 'pointer', marginRight: index < additionalImages.length - 1 ? '0' : '0' }}
                        >
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`upload ${index}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <IconButton
                                onClick={() => handleDeleteAdditionalImage(index)}
                                color="secondary"
                                style={{ position: 'absolute', top: 0, right: 0 }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                    {additionalImages.length < (MAX_IMAGES - (coverImage ? 1 : 0)) && (
                        <Box
                            component="label"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width="150px"
                            height="150px"
                            border="2px dashed #ddd"
                            borderRadius="4px"
                            sx={{ cursor: 'pointer' }}
                        >
                            <UploadIcon />
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                multiple
                                onChange={handleAdditionalImagesUpload}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ImageUpload;


