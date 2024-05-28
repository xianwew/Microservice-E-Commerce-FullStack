import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, Button, Autocomplete, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import SearchService from '../../service/SearchService';

const SearchBar = ({ initialQuery = '' }) => {
    const [inputValue, setInputValue] = useState(initialQuery);
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuggestions = async (query) => {
            try {
                const data = await SearchService.fetchSuggestions(query);
                setSuggestions(data);
            } 
            catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        };

        if (inputValue) {
            fetchSuggestions(inputValue);
        } else {
            setSuggestions([]);
        }
    }, [inputValue]);

    const handleSearch = () => {
        if (inputValue.trim() === '') {
            navigate(`/browse`);
        } 
        else {
            navigate(`/browse?query=${inputValue}`);
        }
    };

    const handleAutocompleteChange = (event, newValue) => {
        if (newValue && newValue.title) {
            setInputValue(newValue.title);
            navigate(`/browse?query=${newValue.title}`);
        } else if (newValue && typeof newValue === 'string') {
            setInputValue(newValue);
            navigate(`/browse?query=${newValue}`);
        }
    };

    return (
        <Box style={{ width: '100%', display: 'flex', borderRadius: '25px', overflow: 'hidden', backgroundColor: '#fafafa', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <Autocomplete
                freeSolo
                sx={{ flex: '1', marginRight: '0', borderRadius: '25px 0 0 25px' }}
                options={suggestions}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option?.title || '')}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                onChange={handleAutocompleteChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Search for anything"
                        fullWidth
                        sx={{ overflow: 'hidden', backgroundColor: '#fafafa', borderRadius: '25px 0 0 25px' }}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '25px 0 0 25px' },
                        }}
                    />
                )}
                renderOption={(props, option) => (
                    <li {...props} key={option.id || option}>
                        {typeof option === 'string' ? option : option.title}
                    </li>
                )}
            />
            <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: '0 25px 25px 0', padding: '10px 20px' }}
                onClick={handleSearch}
            >
                Search
            </Button>
        </Box>
    );
};

export default SearchBar;