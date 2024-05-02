import "./App.css";
import fetchJobListings from "./api";
import JobCard from "./components/JobDescriptionCard/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateOffset, addJobs } from "./redux/JobOpeningsSlice";
import FilterBar from "./components/FilterBar/SearchFilterBar";

/*
 *   Author - Shrajan Pandey
 *
 */

function App() {
    const offset = useSelector((state) => state.offset);
    const dispath = useDispatch();

    useEffect(async () => {
        let jobList = await fetchJobListings(offset);
        dispath(addJobs(jobList));
    }, []);

    return (
        <div className="App">
            <FilterBar />
            <JobCard />
        </div>
    );
}

export default App;
