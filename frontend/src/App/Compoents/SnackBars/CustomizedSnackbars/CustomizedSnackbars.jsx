import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { closeSnackbar, showSnackbar } from '../../../redux/slice/snackbarSlice';

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const { open, vertical, horizontal, message, severity, autoHideDuration } = useSelector(state => state.snackbar);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

