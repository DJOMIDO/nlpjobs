// src/pages/JobDetails.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Job } from "../types/jobTypes";
import { formatSalary } from "../utils/formatSalary";
import "./JobDetails.css";

const JobDetails: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/jobs/${jobId}`);
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (!job) {
    return <div>Loading job details...</div>;
  }

  return (
    <div className="job-details-container">
      <div className="job-details">
        <h1 className="job-details-title">{job.title}</h1>
        <p className="job-details-type">Job Type: {job.jobType}</p>
        <p className="job-details-description">
          Job Description: <br />
          {job.description}
        </p>
        <p className="job-details-salary">
          Salary: {formatSalary(job.salaryRange.min)} -{" "}
          {formatSalary(job.salaryRange.max)} {job.salaryRange.unit}
        </p>
        <p className="job-details-location">
          Location: {job.location.city}, {job.location.state},{" "}
          {job.location.country}
        </p>
        <p className="job-details-experience">
          Experience Required: {job.experienceRequired}
        </p>
        <p className="job-details-skills">
          Skills Required: {job.skillsRequired?.join(", ") || "N/A"}
        </p>
        <p className="job-details-company">Company: {job.company}</p>
        <p className="job-details-email">
          E-mail: {job.contact?.email || "N/A"}
        </p>
        <p className="job-details-tel">Tel: {job.contact?.phone || "N/A"}</p>
      </div>
    </div>
  );
};

export default JobDetails;
