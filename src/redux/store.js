import {configureStore} from '@reduxjs/toolkit';
import jobOpeningsReducer from './JobOpeningsSlice';

export const store = configureStore({
    reducer: jobOpeningsReducer,
})