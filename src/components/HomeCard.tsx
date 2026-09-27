/* src/components/HomeCard.tsx */

import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { Job } from "../types/jobTypes";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Button,
  Spinner,
  Center,
  Text,
} from "@chakra-ui/react";
import { fetchJobs } from "../utils/jobsApi";

const HomeCard: React.FC = () => {
  const [urgentJobs, setUrgentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        const urgentJobs = data.filter((job: Job) => job.urgent).slice(0, 8);
        setUrgentJobs(urgentJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Featured jobs are temporarily unavailable.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  if (loading) {
    return (
      <Center py={12}>
        <Spinner size="xl" color="red.500" />
      </Center>
    );
  }

  if (urgentJobs.length === 0) {
    return (
      <Center py={12}>
        <Text fontSize="lg">{error ?? "No urgent jobs found."}</Text>
      </Center>
    );
  }

  return (
    <Box id="home-card-section" className="home-featured">
      <Box maxW="1200px" mx="auto" px={6}>
        <Box className="section-heading">
          <Box>
            <Text className="section-kicker">Featured now</Text>
            <Heading as="h2" size="2xl">Openings worth a closer look</Heading>
          </Box>
          <Button variant="ghost" className="text-button" onClick={() => navigate("/jobs")}>View all jobs <span aria-hidden="true">→</span></Button>
        </Box>
        <Box className="job-list featured-list">
          {urgentJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onViewDetails={() => window.open(`/job/${job.id}`, "_blank")}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeCard;
