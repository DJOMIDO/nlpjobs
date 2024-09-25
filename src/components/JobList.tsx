// src/components/JobList.tsx

import React, { useEffect, useState } from "react";
import { Job } from "../types/jobTypes";
import JobCard from "./JobCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import "./JobList.css";
import SearchBar from "./SearchBar";

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<{
    country?: string;
    city?: string;
    urgent?: boolean;
    keyword?: string;
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

    if (filters.keyword) {
      updatedJobs = updatedJobs.filter((job) =>
        job.title.toLowerCase().includes((filters.keyword ?? "").toLowerCase()) ||
        job.company?.toLowerCase().includes((filters.keyword ?? "").toLowerCase()) ||
        job.location.city.toLowerCase().includes((filters.keyword ?? "").toLowerCase()) ||
        job.location.country.toLowerCase().includes((filters.keyword ?? "").toLowerCase()) ||
        job.description.toLowerCase().includes((filters.keyword ?? "").toLowerCase())
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
    keyword?: string;
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

  const handleSearch = (query: string) => {
    handleFilterChange({ keyword: query });
  };

  return (
    <div className="job-list-container">
      <SearchBar
        onSearch={handleSearch}
        onToggleFilter={toggleFilterVisibility}
        isFilterVisible={isFilterVisible}
        jobs={jobs}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
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
