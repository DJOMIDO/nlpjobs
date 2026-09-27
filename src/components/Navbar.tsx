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
      bg="var(--surface)"
      borderBottom="1px solid var(--line)"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        py={3}
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

        <Flex gap={6} align="center">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                color: isActive ? "var(--accent)" : "var(--muted)",
                fontWeight: isActive ? "bold" : "normal",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontSize: "0.78rem",
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
