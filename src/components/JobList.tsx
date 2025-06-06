/* src/components/JobList.tsx */

import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Spinner, Center } from "@chakra-ui/react";
import { Job } from "../types/jobTypes";
import JobCard from "./JobCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import SearchBar from "./SearchBar";
import wave from "../assets/wave.svg";

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
        const response = await fetch("/.netlify/functions/jobs");
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
    <Box
      w="100%"
      minH="100vh"
      bgImage={`url(${wave})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      position="center"
      px={0}
      py={12}
    >
      <Box w="100%" maxW="1200px" mx="auto" px={6}>
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
        ) : (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            gap={6}
            justifyItems="center"
            mt={10}
          >
            {currentJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={() => window.open(`/job/${job.id}`, "_blank")}
              />
            ))}
          </SimpleGrid>
        )}

        <Center mt={8}>
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
