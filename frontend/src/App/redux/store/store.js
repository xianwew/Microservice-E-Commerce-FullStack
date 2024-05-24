import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from '../slice/snackbarSlice';
import windowSizeReducer, { windowSizeActions } from '../slice/windowSizeSlice';

const store = configureStore({
    reducer: {
        snackbar: snackbarReducer,
        windowSize: windowSizeReducer,
    },
});

store.dispatch(windowSizeActions.startListeningToResize());
export default store;
