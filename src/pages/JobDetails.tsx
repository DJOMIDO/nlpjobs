/* src/pages/JobDetails.tsx */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Job } from "../types/jobTypes";
import { formatSalary } from "../utils/formatSalary";
import { fetchJob } from "../utils/jobsApi";
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";

const JobDetails: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        if (!jobId) throw new Error("Job ID is missing");
        setJob(await fetchJob(jobId));
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("This job could not be loaded.");
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (error) {
    return <Center py={12} color="red.600">{error}</Center>;
  }

  if (!job) {
    return (
      <Center py={12}>
        <Spinner size="xl" color="red.500" />
      </Center>
    );
  }

  return (
    <Box className="detail-page">
      <Box className="detail-shell">
        <Button
          mb={6}
          onClick={() => navigate("/jobs")}
          className="back-button"
          size="sm"
        >
          Back to Jobs
        </Button>

        <Text className="section-kicker">Role detail</Text>
        <Heading as="h1" size="2xl" mb={6}>
          {job.title}
        </Heading>

        <Stack className="detail-content"
          direction="column"
          gap={4}
          align="start"
          fontSize="md"
          lineHeight="tall"
        >
          <Text>
            <strong>Job Type:</strong> {job.jobType}
          </Text>

          <Box>
            <Text fontWeight="semibold" mb={1}>
              Job Description:
            </Text>
            <Text whiteSpace="pre-line">{job.description}</Text>
          </Box>

          <Text className="detail-salary">
            Salary: {formatSalary(job.salaryRange.min)} -{" "}
            {formatSalary(job.salaryRange.max)} {job.salaryRange.unit}
          </Text>

          <Text>
            <strong>Location:</strong> {job.location.city}, {job.location.state}
            , {job.location.country}
          </Text>

          <Text>
            <strong>Experience Required:</strong> {job.experienceRequired}
          </Text>

          <Text>
            <strong>Skills Required:</strong>{" "}
            {job.skillsRequired?.join(", ") || "N/A"}
          </Text>

          <Box height="1px" width="100%" bg="gray.200" my={4} />

          <Text>
            <strong>Company:</strong> {job.company}
          </Text>

          <Text>
            <strong>E-mail:</strong> {job.contact?.email || "N/A"}
          </Text>

          <Text>
            <strong>Tel:</strong> {job.contact?.phone || "N/A"}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default JobDetails;
