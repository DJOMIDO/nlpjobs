/* src/components/Hero.tsx */

import {
  Box,
  Heading,
  Text,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";

const Hero = ({
  title = "Unlock Your Future in NLP",
  subtitle = "Start your journey in natural language processing from here.",
}) => {
  return (
    <Box as="section" className="hero">
      <Box className="hero-inner">
        <Box maxW="42rem">
        <Text className="section-kicker">NLP-focused opportunities</Text>
        <Heading as="h1" size="4xl" mb={5}>
          {title}
        </Heading>
        <Text fontSize="xl" color="var(--muted)" mb={8} maxW="34rem">
          {subtitle}
        </Text>
        <ChakraLink
          href="#home-card-section"
          _hover={{ textDecoration: "none" }}
        >
          <Button size="lg" className="primary-button">
            Browse Jobs
          </Button>
        </ChakraLink>
        </Box>
        <Box className="hero-index" aria-hidden="true">
          <span>01</span>
          <span>specialized</span>
          <span>search</span>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
