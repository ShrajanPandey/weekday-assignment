import "./JobCard.css";
import image from "../../assets/LeetCode_logo_black.png";
import fetchJobListings from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useCallback } from "react";
import { addJobs, updateOffset } from "../../redux/JobOpeningsSlice";

/*
 *  Component displaying the job list with infinite scroll
 */
function JobCard() {
    const dispath = useDispatch();
    const offset = useSelector((state) => state.offset);
    const allJobOpenings = useSelector((state) => state.allJobOpenings);

    // infinite scroll implemented using observer and useRef by tracking the last JobCard
    const observer = useRef();
    const lastJobCardRef = useCallback(
        (node) => {
            if (observer.current) {
                observer.current.disconnect();
            }
            observer.current = new IntersectionObserver(async (entries) => {
                if (entries[0].isIntersecting) {
                    dispath(updateOffset());
                    const newJobList = await fetchJobListings(offset);
                    dispath(addJobs(newJobList));
                }
            });

            if (node) {
                observer.current.observe(node);
            }
        },
        [updateOffset, addJobs]
    );

    const generateJobCard = (currentJob) => {
        return (
            <>
                <div>
                    <div className="job-posted">Posted 10 days ago</div>
                </div>
                <div className="description-heading">
                    <img src={image} alt="logo" className="company-logo" />
                    <div className="company-details">
                        <div className="job-heading-info">
                            <h5>Google</h5>
                            <h4>{currentJob.jobRole}</h4>
                        </div>
                        <p className="location">{currentJob.location}</p>
                    </div>
                </div>
                <h4>
                    Estimated Salary:
                    {currentJob.salaryCurrencyCode} {currentJob.minJdSalary}-
                    {currentJob.maxJdSalary} LPA &#9989;
                </h4>
                <div className="job-details-container">
                    <p className="about-company-heading">About Company: </p>
                    <div className="about-company">
                        <div className="detailed-role-description">
                            <h5>About Us: </h5>
                            {currentJob.jobDetailsFromCompany
                                ? currentJob.jobDetailsFromCompany
                                : "Not Provided"}
                        </div>
                        <a className="open-modal">View Job</a>
                    </div>
                    <div>
                        <h4>Minimum Experience: </h4>
                        <h5>
                            {currentJob.minExp
                                ? currentJob.minExp
                                : "Not Provided"}
                        </h5>
                    </div>
                </div>
                <div className="action-buttons">
                    <a className="apply-button" href={currentJob.jdLink}>
                        Easy Apply
                    </a>
                    <a className="referral-button">Unlock referral asks</a>
                </div>
            </>
        );
    };

    const displayJobOpeningsList = () => {
        return allJobOpenings.map((currentJob, index) => {
            if (allJobOpenings.length === index + 1) {
                return (
                    <div
                        ref={lastJobCardRef}
                        className="job-card"
                        key={currentJob.jdUid}
                    >
                        {generateJobCard(currentJob)}
                    </div>
                );
            } else {
                return (
                    <div className="job-card" key={currentJob.jdUid}>
                        {generateJobCard(currentJob)}
                    </div>
                );
            }
        });
    };

    return (
        <>
            <div className="job-list">{displayJobOpeningsList()}</div>
        </>
    );
}

export default JobCard;
