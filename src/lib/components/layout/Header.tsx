import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import Link from "next/link";

import CTAHeader from "./CTAHeader";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <Heading as="h1" size="lg">
        <Link href="/">Waypoint.</Link>
      </Heading>

      <Box marginLeft="auto">
        <Stack spacing="4" direction="row">
          <ThemeToggle />
          <CTAHeader />
        </Stack>
      </Box>
    </Flex>
  );
};

export default Header;
