import React, {useState, useEffect} from 'react';
import { Box, Typography, Button, Modal, TextField } from '@mui/material';
import { useAuth } from '../../Auth/AuthContext';
import axios from 'axios';
import { showSnackbar } from '../../redux/slice/snackbarSlice';
import CloudinaryService from '../../service/CloudinaryService';
import { useDispatch } from 'react-redux';
import {decodeToken} from '../../Auth/JwtUtils';
import axiosInstance from '../../service/AxiosConfig';

const UserProfileHeader = () => {
    const { logout, token } = useAuth();
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [file, setFile] = useState(null);

    const defaultProfilePictureUrl = 'https://via.placeholder.com/100'; 

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                const decoded = decodeToken(token);
                const userId = decoded.sub; 
                console.log(userId);
                try {
                    const response = await axiosInstance.get(`/api/user/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const userData = response.data;
                    setUser(userData);
                    setUsername(userData.username);
                    setProfilePicture(userData.profilePictureUrl || defaultProfilePictureUrl);
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            }
        };

        fetchUser();
    }, [token]);

    const handleLogout = () => {
        logout();
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = async () => {
        const formData = new FormData();
        formData.append('username', username);
        if (file) {
            formData.append('profilePicture', file);
        }

        try {
            const response = await axiosInstance.put(`/api/user/${user.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUser(response.data);
            setProfilePicture(response.data.profilePictureUrl || defaultProfilePictureUrl);
            setIsEditing(false);
            console.log('Successfully saved profile');
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Box display="flex" alignItems="center" mb={4}>
            <Box
                component="img"
                src={profilePicture}
                alt="Profile"
                sx={{ width: 100, height: 100, borderRadius: '50%', mr: 2 }}
            />
            <Box>
                <Typography variant="h4">{username}</Typography>
                <Typography variant="body1" color="textSecondary">{user.feedback}</Typography>
            </Box>
            <Box ml="auto">
                <Button variant="outlined" onClick={handleEditProfile}>Edit Profile</Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#e81010',
                        marginLeft: '10px',
                        '&:hover': {
                            backgroundColor: '#c30d0d'
                        }
                    }}
                    onClick={handleLogout}
                >
                    Log Out
                </Button>
            </Box>

            <Modal
                open={isEditing}
                onClose={() => setIsEditing(false)}
                aria-labelledby="edit-profile-modal-title"
                aria-describedby="edit-profile-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    <Typography id="edit-profile-modal-title" variant="h6" component="h2">
                        Edit Profile
                    </Typography>
                    <Box component="form" noValidate autoComplete="off">
                        <TextField
                            fullWidth
                            margin="normal"
                            id="username"
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="profile-picture"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="profile-picture">
                            <Button variant="contained" color="primary" component="span">
                                Upload Profile Picture
                            </Button>
                        </label>
                        <Box mt={2} display="flex" justifyContent="flex-end">
                            <Button variant="contained" color="primary" onClick={handleSaveProfile}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default UserProfileHeader;