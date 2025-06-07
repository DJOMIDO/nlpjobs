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
    <Box
      as="section"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      px={4}
      style={{
        backgroundImage: "url('/assets/patterns.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box maxW="4xl" bg="rgba(0,0,0,0.5)" p={8} borderRadius="xl">
        <Heading as="h1" size="4xl" color="white" mb={8}>
          {title}
        </Heading>
        <Text fontSize="2xl" color="white" mb={8}>
          {subtitle}
        </Text>
        <ChakraLink
          href="#home-card-section"
          _hover={{ textDecoration: "none" }}
        >
          <Button size="lg" bg="white" color="black" _hover={{ bg: "#575757" }}>
            Browse Jobs
          </Button>
        </ChakraLink>
      </Box>
    </Box>
  );
};

export default Hero;
