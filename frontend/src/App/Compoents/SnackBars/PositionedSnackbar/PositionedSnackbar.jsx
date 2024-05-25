import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { setSnackbarOpen, closeSnackbar } from '../../../../redux/slice/snackbarSlice'; 

export default function PositionedSnackbar() {
  const dispatch = useDispatch();
  const { open, vertical, horizontal, message, autoHideDuration } = useSelector(state => state.snackbar);

  // const handleClick = (newState) => () => {
  //   dispatch(setSnackbarOpen({ ...newState, open: true }));
  // };

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </Box>
  );
}

