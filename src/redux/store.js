import { configureStore } from "@reduxjs/toolkit";
import jobOpeningsReducer from "./JobOpeningsSlice";

/*
 *   Author - Shrajan Pandey
 */

export const store = configureStore({
    reducer: jobOpeningsReducer,
});
