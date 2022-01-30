import { Box, Heading, Text, Stack } from "@chakra-ui/react";
import CountUp from "react-countup";

import MotionBox from "../motion/Box";

function Stats() {
  return (
    <Stack
      minH="70vh"
      display="flex"
      spacing="12"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Box textAlign="center">
        <Heading>Statistics</Heading>
        <Text>Some statisctic of waypoint usage</Text>
      </Box>
      <MotionBox rounded="full" animate={{ y: [-100, 0], scale: [0, 1] }}>
        <Heading textAlign="center">Link has been shorten:</Heading>
        <Text textAlign="center" fontSize="2xl" my="8">
          <CountUp end={100} duration={1} /> Links
        </Text>
      </MotionBox>
      <MotionBox rounded="full" animate={{ y: [-100, 0], scale: [0, 1] }}>
        <Heading textAlign="center">Used by:</Heading>
        <Text textAlign="center" fontSize="2xl" my="8">
          <CountUp end={100} duration={1} /> Users
        </Text>
      </MotionBox>
    </Stack>
  );
}

export default Stats;
