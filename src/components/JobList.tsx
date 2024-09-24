// src/components/JobList.tsx

import React, { useEffect, useState } from "react";
import { Job } from "../types/jobTypes";
import JobCard from "./JobCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import "./JobList.css";
import Filter from "./Filters";

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<{
    country?: string;
    city?: string;
    urgent?: boolean;
    sortSalary?: "asc" | "desc";
  }>({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const jobsPerPage = 8;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3001/jobs");
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let updatedJobs = jobs;

    if (filters.country) {
      updatedJobs = updatedJobs.filter(
        (job) => job.location.country === filters.country
      );
    }

    if (filters.city) {
      updatedJobs = updatedJobs.filter(
        (job) => filters.city && job.location.city.includes(filters.city)
      );
    }

    if (filters.urgent) {
      updatedJobs = updatedJobs.filter((job) => job.urgent === filters.urgent);
    }

    if (filters.sortSalary === "asc") {
      updatedJobs = updatedJobs.sort(
        (a, b) => a.salaryRange.min - b.salaryRange.min
      );
    } else if (filters.sortSalary === "desc") {
      updatedJobs = updatedJobs.sort(
        (a, b) => b.salaryRange.min - a.salaryRange.min
      );
    }

    setFilteredJobs(updatedJobs);
  }, [filters, jobs]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleFilterChange = (newFilters: {
    country?: string;
    city?: string;
    urgent?: boolean;
    sortSalary?: "asc" | "desc";
  }) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-list-container">
      <div className="filter-btn-container">
        <button className="filter-btn" onClick={toggleFilterVisibility}>
          <span className="material-symbols-outlined">sort</span>
        </button>
      </div>
      {isFilterVisible && (
        <Filter jobs={jobs} onFilterChange={handleFilterChange} />
      )}
      <div className="job-list">
        {currentJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onViewDetails={() => window.open(`/job/${job.id}`, "_blank")}
          />
        ))}
      </div>
      <Pagination
        current={currentPage}
        total={filteredJobs.length}
        pageSize={jobsPerPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default JobList;
