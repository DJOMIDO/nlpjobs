// src/components/HomeCard.tsx

import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { Job } from "../types/jobTypes";
import { useNavigate } from "react-router-dom";
import "./HomeCard.css";

const HomeCard: React.FC = () => {
  const [urgentJobs, setUrgentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3001/jobs");
        const data = await response.json();
        const urgentJobs = data.filter((job: Job) => job.urgent).slice(0, 8);
        setUrgentJobs(urgentJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-card-container" id="home-card-section">
      <h2 className="home-title">Most Urgent Jobs</h2>
      <div className="job-list">
        {urgentJobs.map((job) => (
          <JobCard key={job.id} job={job} onViewDetails={() => window.open(`/job/${job.id}`, "_blank")} />
        ))}
      </div>

      <div className="view-all-btn-container">
        <button className="view-all-btn" onClick={() => navigate("/jobs")}>
          View All Jobs
        </button>
      </div>
    </div>
  );
};

export default HomeCard;
