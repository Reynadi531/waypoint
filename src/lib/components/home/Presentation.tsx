import {
  Heading,
  Text,
  Center,
  Button,
  Stack,
  IconButton,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import { RiArrowDownLine } from "react-icons/ri";

import MotionBox from "../motion/Box";

function Presentation() {
  return (
    <Center id="presentation" as="section" py="12">
      <Stack
        align="center"
        justifyItems="center"
        alignItems="center"
        maxW="container.sm"
        direction="column"
        spacing="4"
      >
        <MotionBox
          animate={{ scale: [0, 1], y: [-100, 0] }}
          transition={{ ease: "easeIn", duration: 0.2 }}
        >
          <Image width={400} height={400} src="/ilustration.svg" />
        </MotionBox>
        <Heading textAlign="center" as="h1">
          Easy shortlink for everyone
        </Heading>

        <Text textAlign="center" fontWeight="medium" letterSpacing="wider">
          Beautify your link, make it easy to remember, share with others with
          confidence
        </Text>
        <Button as="a" href="/auth/login" rounded="lg">
          Get Started
        </Button>
        <Box py="12">
          <IconButton
            as="a"
            aria-label="arrow down"
            variant="ghost"
            href="#features"
            icon={<RiArrowDownLine />}
          />
        </Box>
      </Stack>
    </Center>
  );
}

export default Presentation;
