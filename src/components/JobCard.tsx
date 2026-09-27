/* src/components/JobCard.tsx */

import { Job } from "../types/jobTypes";
import { formatSalary } from "../utils/formatSalary";

interface JobCardProps {
  job: Job;
  onViewDetails: () => void;
}

const JobCard = ({ job, onViewDetails }: JobCardProps) => {
  const shortDescription =
    job.description?.length > 150
      ? job.description.slice(0, 150) + "..."
      : job.description || "No description";

  return (
    <article className="job-row">
      <div className="job-main">
        <div className="job-title-line">
          <h3>{job.title}</h3>
          {job.urgent && <span className="job-badge">Urgent</span>}
        </div>
        <p className="job-company">{job.company || "Independent team"} <span>·</span> {job.jobType}</p>
        <p className="job-description">{shortDescription}</p>
      </div>
      <div className="job-meta">
        <strong>{formatSalary(job.salaryRange.min)} – {formatSalary(job.salaryRange.max)}</strong>
        <span>{job.salaryRange.unit}</span>
      </div>
      <div className="job-location">
        <span className="material-symbols-outlined" aria-hidden="true">location_on</span>
        <span>{job.location.city}{job.location.state ? `, ${job.location.state}` : ""}, {job.location.country}</span>
      </div>
      <button className="row-action" onClick={onViewDetails}>View role <span aria-hidden="true">↗</span></button>
    </article>
  );
};

export default JobCard;
