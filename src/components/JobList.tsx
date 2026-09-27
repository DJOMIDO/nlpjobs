/* src/components/JobList.tsx */

import React, { useEffect, useState } from "react";
import { Box, Spinner, Center, Heading, Text } from "@chakra-ui/react";
import { Job } from "../types/jobTypes";
import JobCard from "./JobCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import SearchBar from "./SearchBar";
import { fetchJobs } from "../utils/jobsApi";

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
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const jobsPerPage = 8;

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Jobs are temporarily unavailable. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
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
      updatedJobs = updatedJobs.filter(
        (job) =>
          job.title
            .toLowerCase()
            .includes((filters.keyword ?? "").toLowerCase()) ||
          job.company
            ?.toLowerCase()
            .includes((filters.keyword ?? "").toLowerCase()) ||
          job.location.city
            .toLowerCase()
            .includes((filters.keyword ?? "").toLowerCase()) ||
          job.location.country
            .toLowerCase()
            .includes((filters.keyword ?? "").toLowerCase()) ||
          job.description
            .toLowerCase()
            .includes((filters.keyword ?? "").toLowerCase())
      );
    }

    setFilteredJobs(updatedJobs);
  }, [filters, jobs]);

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
    <Box className="jobs-page">
      <Box className="jobs-shell">
        <Box className="jobs-heading">
          <Box>
            <Text className="section-kicker">The directory</Text>
            <Heading as="h1">Find your next NLP role.</Heading>
          </Box>
          {!loading && !error && <Text className="result-count">{filteredJobs.length} roles indexed</Text>}
        </Box>
        <SearchBar
          onSearch={handleSearch}
          onToggleFilter={toggleFilterVisibility}
          isFilterVisible={isFilterVisible}
          jobs={jobs}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {loading ? (
          <Center py={12}>
            <Spinner size="xl" color="red.500" />
          </Center>
        ) : error ? (
          <Center py={12} color="red.600">
            {error}
          </Center>
        ) : filteredJobs.length === 0 ? (
          <Center py={12}>No jobs match your current filters.</Center>
        ) : (
          <Box className="job-list">
            {currentJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={() => window.open(`/job/${job.id}`, "_blank")}
              />
            ))}
          </Box>
        )}

        <Center className="pagination-wrap">
          <Pagination
            current={currentPage}
            total={filteredJobs.length}
            pageSize={jobsPerPage}
            onChange={handlePageChange}
          />
        </Center>
      </Box>
    </Box>
  );
};

export default JobList;
