import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from '../slice/snackbarSlice';
import windowSizeReducer, { windowSizeActions } from '../slice/windowSizeSlice';
import authReducer from '../slice/authSlice';

const store = configureStore({
    reducer: {
        snackbar: snackbarReducer,
        windowSize: windowSizeReducer,
        auth: authReducer,
    },
});

store.dispatch(windowSizeActions.startListeningToResize());
export default store;
