/* src/components/Navbar.tsx */

import { Box, Flex, Image } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import logo from "/assets/logo.svg";
import logoHover from "/assets/logo_hover.svg";
import { useState } from "react";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const links = [
    { to: "/", label: "home" },
    { to: "/jobs", label: "jobs" },
  ];

  return (
    <Box
      as="nav"
      bg="white"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        py={4}
        px={6}
        align="center"
        justify="space-between"
      >
        <Box
          w="7.5rem"
          pos="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          cursor="pointer"
        >
          <Image
            src={isHovered ? logoHover : logo}
            alt="logo"
            w="100%"
            h="auto"
          />
        </Box>

        <Flex gap={8}>
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                color: isActive ? "#ff3131" : "#575757",
                fontWeight: isActive ? "bold" : "normal",
                textTransform: isActive ? "uppercase" : "none",
                fontSize: "1rem",
                textDecoration: "none",
                cursor: "pointer",
              })}
            >
              {label}
            </NavLink>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
