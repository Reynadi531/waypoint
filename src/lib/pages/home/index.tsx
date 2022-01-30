import { Box } from "@chakra-ui/react";

import Features from "lib/components/home/Features";
import Presentation from "lib/components/home/Presentation";
import Stats from "lib/components/home/Stats";

const Home = () => {
  return (
    <Box w="full" minH="70vh">
      <Presentation />
      <Features />
      <Stats />
    </Box>
  );
};

export default Home;
