/* src/components/Footer.tsx */

import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import footerBg from "../assets/footer_bg.svg";

const Footer = () => {
  return (
    <Box
      as="footer"
      bgImage={`url(${footerBg})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      position="center"
      color="white"
      py={16}
      px={4}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        maxW="6xl"
        mx="auto"
        gap={4}
      >
        <Flex align="center" gap={2}>
          <Image src={logo} alt="logo" height="40px" objectFit="contain" />
        </Flex>

        <Text fontSize="md" textAlign="center">
          &copy; {new Date().getFullYear()} nlp.jobs. All rights reserved.
        </Text>

        <Flex gap={4}>
          <Link
            href="/contact"
            color="white"
            _hover={{ textDecoration: "underline" }}
          >
            Contact Us
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
