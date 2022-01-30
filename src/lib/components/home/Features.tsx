import {
  Text,
  Center,
  Stack,
  Box,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { RiLinksFill, RiShareLine, RiRocket2Fill } from "react-icons/ri";

function Features() {
  return (
    <Center id="features" as="section" mt="12" minH="70vh">
      <Stack spacing="24" direction="column">
        <Heading as="h1" textAlign="center">
          Features
        </Heading>
        <Box as={Stack} direction="column" maxW={300}>
          <Center>
            <IconButton
              aria-label="links"
              rounded="full"
              fontSize="6xl"
              padding="10"
              icon={<RiLinksFill />}
            />
          </Center>
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Beautify Link
          </Text>
          <Text textAlign="center">
            No more need to remember long links, get your dream link now
          </Text>
        </Box>
        <Box as={Stack} direction="column" maxW={300}>
          <Center>
            <IconButton
              aria-label="links"
              rounded="full"
              fontSize="6xl"
              padding="10"
              icon={<RiShareLine />}
            />
          </Center>
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Share Link
          </Text>
          <Text textAlign="center">
            It&apos;s very easy to share links to various social media and
            instant messages, right from the dashboard page No more need to
            remember long links, get your dream link now
          </Text>
        </Box>
        <Box as={Stack} direction="column" maxW={300}>
          <Center>
            <IconButton
              aria-label="links"
              rounded="full"
              fontSize="6xl"
              padding="10"
              icon={<RiRocket2Fill />}
            />
          </Center>
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Monitor Statistics
          </Text>
          <Text textAlign="center">
            Easily monitor the number of users visiting the link
          </Text>
        </Box>
      </Stack>
    </Center>
  );
}

export default Features;
