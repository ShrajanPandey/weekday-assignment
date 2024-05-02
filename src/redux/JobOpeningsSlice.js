import { createSlice } from "@reduxjs/toolkit";

/*
 *   Author - Shrajan Pandey
 *
 *   All states associated with job openings
 */
const initialState = {
    allJobOpenings: [],
    offset: 0,
    loading: false,
    filterCondition: [],
    isMoreOpeningsAvailable: true,
};

export const jobOpeningsSlice = createSlice({
    name: "jobOpenings",
    initialState,
    reducers: {
        updateOffset: (state) => {
            state.offset = state.offset + 9;
        },
        addJobs: (state, action) => {
            const payload = JSON.parse(action.payload);
            state.allJobOpenings = [...state.allJobOpenings, ...payload.jdList];
        },
        startLoading: (state) => {
            state.loading = true;
        },
        stopLoading: (state) => {
            state.loading = false;
        },
        updateAvailablity: (state) => {
            state.isMoreOpeningsAvailable = !state.isMoreOpeningsAvailable;
        },
        addFilterCondition: (state, action) => {
            const payload = action.payload;
            state.filterCondition = [...state.filterCondition, payload];

            state.allJobOpenings = state.allJobOpenings.filter((currentJob) => {
                for (let i = 0; i < state.filterCondition.length; ++i) {
                    const filter = state.filterCondition[i];

                    for (let j = 0; j < filter.values.length; ++j) {
                        const value = filter.values[j];

                        if (filter.mappedFiled === "") {
                            return false;
                        }
                        if (filter.mappedField.toLowerCase() === "minJdSalary".toLowerCase()) {
                            if (
                                value === null ||
                                (parseInt(value) >= parseInt(currentJob.minJdSalary) &&
                                    parseInt(value) <= parseInt(currentJob.maxJdSalary))
                            ) {
                                return true;
                            }
                        } else if (filter.mappedField.toLowerCase() === "minExp".toLowerCase()) {
                            if (value === "Fresher") {
                                value = "0";
                            }

                            if (
                                parseInt(value) >=
                                parseInt(
                                    currentJob[filter.mappedFiled] &&
                                        parseInt(value) <= parseInt(currentJob.maxExp)
                                )
                            ) {
                                return true;
                            }
                        } else if (
                            currentJob[filter.mappedField].toLowerCase() === value.toLowerCase()
                        ) {
                            return true;
                        }
                    }
                }

                return false;
            });
        },
    },
});

export const {
    addJobs,
    filterJobs,
    updateOffset,
    addFilterCondition,
    startLoading,
    stopLoading,
    updateAvailablity,
} = jobOpeningsSlice.actions;

export default jobOpeningsSlice.reducer;
