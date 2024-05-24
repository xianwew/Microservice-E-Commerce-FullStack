import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

const SearchBar = () => {
    return (
        <TextField
            variant="outlined"
            placeholder="Search..."
            fullWidth
            sx={{ borderRadius: '25px', overflow: 'hidden', backgroundColor: '#fafafa'}}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <Button variant="contained" color="primary" sx={{ borderRadius: '25px' }}>
                            Search
                        </Button>
                    </InputAdornment>
                ),
                sx: { borderRadius: '25px' },
            }}
        />
    );
}

export default SearchBar;

