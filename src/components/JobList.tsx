// src/components/JobList.tsx

import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import "./JobList.css"; 

interface Job {
  id: string;
  jobType: string;
  title: string;
  description: string;
  salaryRange: {
    min: number;
    max: number;
    unit: string;
  };
  location: {
    city: string;
    state: string;
    country: string;
  };
  company: string;
  postingDate: string;
  experienceRequired: string;
  skillsRequired: string[];
  contact: {
    email: string;
    phone: string;
  };
  applicationLink: string;
  urgent: boolean;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3001/jobs");
        const data = await response.json();
        setJobs(data);
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
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onViewDetails={() => window.open(`/job/${job.id}`, "_blank")}
        />
      ))}
    </div>
  );
};

export default JobList;
