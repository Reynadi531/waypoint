import {
  Badge,
  Box,
  Stack,
  Text,
  useColorMode,
  Flex,
  IconButton,
  PopoverTrigger,
  Popover,
  PopoverContent,
  Input,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import type { FC } from "react";
import FocusLock from "react-focus-lock";
import { AiFillEye } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";

interface IProps {
  real_url: string;
  slug: string;
  hit: number;
}

const PopoverForm: FC<{ slug: string }> = ({ slug }) => {
  return (
    <Stack spacing="4" direction="column">
      <FormControl>
        <FormLabel htmlFor="slug-edit">Slug:</FormLabel>
        <Input id="slug-edit" defaultValue={slug} />
      </FormControl>
      <Button w="24" colorScheme="teal">
        Submit
      </Button>
    </Stack>
  );
};

const UrlItem: FC<IProps> = ({ real_url, hit, slug }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      p="5"
      bgColor={colorMode === "light" ? "white" : "gray.700"}
      boxShadow="lg"
      rounded="xl"
    >
      <Flex alignItems="center">
        <Stack flex="1" spacing="2">
          <Text fontSize="lg" fontWeight="bold">
            {slug}
          </Text>
          <Text maxW="50vw" as="a" href={real_url} fontSize="md">
            {real_url}
          </Text>
          <Badge rounded="xl" w="12">
            <Stack justifyContent="center" alignItems="center" direction="row">
              <AiFillEye />
              <Text>{hit}</Text>
            </Stack>
          </Badge>
        </Stack>
        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label="edit"
              w="12"
              h="12"
              icon={<BsFillPencilFill />}
            />
          </PopoverTrigger>
          <PopoverContent p="5">
            <FocusLock>
              <PopoverForm slug={slug} />
            </FocusLock>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  );
};

export default UrlItem;
