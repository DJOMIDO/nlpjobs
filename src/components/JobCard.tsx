/* src/components/JobCard.tsx */

import {
  Box,
  Badge,
  Heading,
  Text,
  Button,
  Center,
  Stack,
} from "@chakra-ui/react";
import { Job } from "../types/jobTypes";
import { formatSalary } from "../utils/formatSalary";

interface JobCardProps {
  job: Job;
  onViewDetails: () => void;
}

const JobCard = ({ job, onViewDetails }: JobCardProps) => {
  const shortDescription =
    job.description?.length > 150
      ? job.description.slice(0, 150) + "..."
      : job.description || "No description";

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      boxShadow="md"
      bg="white"
      minH="26rem"
      maxW="20rem"
      w="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      position="relative"
      textAlign="center"
    >
      <Box h="1.75rem" position="absolute" top={2} right={2}>
        {job.urgent && (
          <Badge
            bg="red.500"
            _hover={{ bg: "red.300" }}
            color="white"
            fontSize="0.75rem"
            px={2}
            py={1}
            borderRadius="md"
          >
            Apply Now!
          </Badge>
        )}
      </Box>

      <Stack gap={3} mt="1.75rem" flexGrow={1}>
        <Heading as="h3" size="md">
          {job.title}
        </Heading>

        <Text fontWeight="medium">{job.jobType}</Text>

        <Text fontSize="sm" color="gray.600" textAlign="left">
          {shortDescription}
        </Text>

        <Center mt={4}>
          <Text fontWeight="bold" color="blue.500">
            {formatSalary(job.salaryRange.min)} -{" "}
            {formatSalary(job.salaryRange.max)} {job.salaryRange.unit}
          </Text>
        </Center>

        <Center mt={6}>
          <Text fontSize="sm" color="gray.500">
            {job.location.city}
            {job.location.state ? `, ${job.location.state}` : ""},{" "}
            {job.location.country}
          </Text>
        </Center>
      </Stack>

      <Button
        mt={4}
        color="white"
        bg="gray.600"
        _hover={{ bg: "gray.800" }}
        onClick={onViewDetails}
        alignSelf="center"
      >
        View More
      </Button>
    </Box>
  );
};

export default JobCard;
