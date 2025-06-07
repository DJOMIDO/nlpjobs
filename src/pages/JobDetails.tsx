/* src/pages/JobDetails.tsx */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Job } from "../types/jobTypes";
import { formatSalary } from "../utils/formatSalary";
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

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/.netlify/functions/jobs/${jobId}`);
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (!job) {
    return (
      <Center py={12}>
        <Spinner size="xl" color="red.500" />
      </Center>
    );
  }

  return (
    <Box
      w="full"
      minH="100vh"
      bgImage="url('/assets/sprinkle.svg')"
      position="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      bgColor="gray.50"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Box bg="white" p={8} rounded="md" shadow="md" width="100%" maxW="4xl">
        <Button
          mb={6}
          onClick={() => navigate("/jobs")}
          bg="gray.600"
          _hover={{ bg: "gray.800" }}
          color="white"
          variant="outline"
          size="sm"
        >
          Back to Jobs
        </Button>

        <Heading as="h1" size="xl" mb={6}>
          {job.title}
        </Heading>

        <Stack
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

          <Text color="blue.600" fontWeight="bold">
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
