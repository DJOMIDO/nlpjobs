/* src/components/HomeCard.tsx */

import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { Job } from "../types/jobTypes";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  SimpleGrid,
  Button,
  Spinner,
  Center,
  Text,
} from "@chakra-ui/react";

const HomeCard: React.FC = () => {
  const [urgentJobs, setUrgentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/.netlify/functions/jobs");
        const data = await response.json();
        const urgentJobs = data.filter((job: Job) => job.urgent).slice(0, 8);
        setUrgentJobs(urgentJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
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
        <Text fontSize="lg">No urgent jobs found.</Text>
      </Center>
    );
  }

  return (
    <Box
      id="home-card-section"
      w="100%"
      bgImage="url('/assets/sprinkle.svg')"
      bgRepeat="no-repeat"
      bgSize="cover"
      position="center"
      py={12}
      px={0}
    >
      <Box maxW="1200px" mx="auto" px={6}>
        <Heading as="h1" size="4xl" mb={8} textAlign="center" color="white">
          Don’t Miss These Opportunities!
        </Heading>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          gap={6}
          justifyItems="center"
          alignItems="stretch"
        >
          {urgentJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onViewDetails={() => window.open(`/job/${job.id}`, "_blank")}
            />
          ))}
        </SimpleGrid>

        <Center mt={10}>
          <Button
            size="lg"
            bg="black"
            color="white"
            _hover={{ bg: "gray.700" }}
            onClick={() => navigate("/jobs")}
          >
            View All Jobs
          </Button>
        </Center>
      </Box>
    </Box>
  );
};

export default HomeCard;
