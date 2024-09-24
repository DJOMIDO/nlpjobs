// src/components/JobCard.tsx

import React from "react";
import { Job } from "../types/jobTypes";
import "./JobCard.css";

interface JobCardProps {
  job: Job;
  onViewDetails: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  // 简短描述显示
  const shortDescription =
    job.description.length > 100
      ? job.description.substring(0, 100) + "..."
      : job.description;

  const formatSalary = (salary: number) => salary.toLocaleString();

  return (
    <div className="job-card">
      {job.urgent && <div className="urgent-label">Urgent</div>}
      <h3 className="job-title">{job.title}</h3>
      <p className="job-type">{job.jobType}</p>
      <p className="job-description">{shortDescription}</p>
      <p className="job-salary">
        {formatSalary(job.salaryRange.min)} -{" "}
        {formatSalary(job.salaryRange.max)} {job.salaryRange.unit}
      </p>
      <p className="job-location">
        <span className="material-symbols-outlined">pin_drop</span>
        {job.location.city}
        {job.location.state ? `, ${job.location.state}` : ""},{" "}
        {job.location.country}
      </p>
      <button className="view-details-btn" onClick={onViewDetails}>
        View More
      </button>
    </div>
  );
};

export default JobCard;
