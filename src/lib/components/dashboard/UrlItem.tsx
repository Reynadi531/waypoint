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
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import type { ChangeEvent, FC } from "react";
import { useState } from "react";
import FocusLock from "react-focus-lock";
import { AiFillEye } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";

import { deleteUrl, patchSlug } from "lib/helper/supabase";
import { sanitizeSlug } from "lib/helper/utils";

interface IProps {
  real_url: string;
  slug: string;
  hit: number;
  id: string;
  userId: string;
}

interface IPopform {
  slug: string;
  id: string;
  userId: string;
}

const PopoverForm: FC<IPopform> = ({ slug, id, userId }) => {
  const toast = useToast();
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const [slugEdit, SetSlugEdit] = useState<string>(slug);
  const [errorSlugEdit, SetSlugEditError] = useState<string>("");

  const handleDeleteItem = async () => {
    try {
      SetIsLoading(true);
      await deleteUrl({ id, userId });

      SetIsLoading(false);
      toast({
        title: "Success delete the slug",
        description: "Success delete the slug. Refresh the dashboard soon",
        status: "success",
        duration: 3000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast({
        title: "Error when delete the slug",
        description: String(error),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEditSlug = async () => {
    try {
      SetIsLoading(true);

      if (slugEdit.length === 0) {
        SetIsLoading(false);
        return SetSlugEditError("Slug cannot be empty");
      }

      await patchSlug({
        id,
        slug: sanitizeSlug(slugEdit),
        userId,
      });

      toast({
        title: "Success edit the slug",
        description: "Success edit the slug. Refresh the dashboard soon",
        status: "success",
        duration: 3000,
      });

      return setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      return toast({
        title: "Error when edit the slug",
        description: String(error),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    SetSlugEdit(e.target.value);
  };

  return (
    <Stack spacing="4" direction="column">
      <FormControl>
        <FormLabel htmlFor="slug-edit">Slug:</FormLabel>
        <Input value={slugEdit} onChange={handleInput} id="slug-edit" />
        {errorSlugEdit.length !== 0 ? (
          <FormErrorMessage>{errorSlugEdit}</FormErrorMessage>
        ) : (
          ""
        )}
      </FormControl>
      <Stack direction="row">
        <Button
          onClick={handleEditSlug}
          isLoading={isLoading}
          w="24"
          colorScheme="teal"
        >
          Submit
        </Button>
        <Button
          isLoading={isLoading}
          onClick={handleDeleteItem}
          w="24"
          colorScheme="gray"
        >
          Delete
        </Button>
      </Stack>
    </Stack>
  );
};

const UrlItem: FC<IProps> = ({ real_url, hit, slug, id, userId }) => {
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
              <PopoverForm id={id} userId={userId} slug={slug} />
            </FocusLock>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  );
};

export default UrlItem;
