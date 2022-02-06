import {
  Box,
  Flex,
  Text,
  Stack,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import type { ChangeEvent, FC } from "react";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

import { saveUrl, checkSlug } from "lib/helper/supabase";
import { sanitizeSlug } from "lib/helper/utils";
import useStore from "lib/hooks/useStore";
import type { IUser } from "lib/types/IUser";

const AddForm: FC<{ user: IUser | null }> = ({ user }) => {
  const isAdding = useStore((x) => x.isAddingForm);
  const toast = useToast();

  const [slug, setSlug] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const [isSlugError, SetSlugError] = useState<string>("");
  const [isUrlError, SetUrlError] = useState<string>("");

  useStore.subscribe((x) => x.isAddingForm)();

  const addHandler = () => {
    useStore.setState({ isAddingForm: !isAdding });
  };

  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    SetSlugError("");
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    SetUrlError("");
  };

  const resetForm = () => {
    setSlug("");
    setUrl("");
    SetIsLoading(false);
  };

  const checkEmpty = () => {
    if (url.length === 0) {
      SetUrlError("URL Cannot be empty");
    }

    if (slug.length === 0) {
      SetSlugError("Slug Cannot be empty");
    }

    return !!(url.length === 0 && slug.length === 0);
  };

  const trySaveSlug = async () => {
    SetIsLoading(true);
    const { error: errorInsert } = await saveUrl({
      url,
      slug: sanitizeSlug(slug),
      userId: String(user?.id),
    });

    if (errorInsert) {
      resetForm();
      return toast({
        title: "Failed to save the slug",
        description: `Message: ${errorInsert.message}`,
        status: "error",
        position: "top",
        duration: 3000,
      });
    }
    SetIsLoading(false);

    toast({
      title: "Success save slug",
      description: "Slug and link already saved. Try it now",
      status: "success",
      position: "top",
      duration: 3000,
    });

    return setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const preFlightCheck = async () => {
    if (checkEmpty()) {
      return SetIsLoading(false);
    }

    const response = await checkSlug({ slug: sanitizeSlug(slug) });
    if (response.isExist) {
      SetSlugError("Slug already used. Try other slug");
      return SetIsLoading(false);
    }

    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      SetUrlError("URL must starts with https:// or http://");
      return SetIsLoading(false);
    }

    await trySaveSlug();

    return SetIsLoading(false);
  };

  const handleSubmit = async () => {
    SetIsLoading(true);
    await preFlightCheck();
  };

  return (
    <Box display={isAdding ? "initial" : "none"}>
      <Stack spacing="4" direction="column">
        <Flex alignItems="center" flexDirection="row">
          <Text flex="1" fontWeight="bold" fontSize="xl">
            Add Link
          </Text>
          <Button
            aria-label="Back"
            onClick={addHandler}
            leftIcon={<FiArrowLeft />}
          >
            Back
          </Button>
        </Flex>
        <FormControl isInvalid={isUrlError.length !== 0}>
          <FormLabel htmlFor="url">From:</FormLabel>
          <Input
            onChange={handleUrlChange}
            value={url}
            placeholder="https://google.com"
            id="url"
          />
          {isUrlError.length !== 0 ? (
            <FormErrorMessage>{isUrlError}</FormErrorMessage>
          ) : (
            ""
          )}
        </FormControl>

        <FormControl isInvalid={isSlugError.length !== 0}>
          <FormLabel htmlFor="slug">Slug:</FormLabel>
          <InputGroup id="slug">
            <InputLeftAddon>{window.location.host}/</InputLeftAddon>
            <Input
              onChange={handleSlugChange}
              value={slug}
              placeholder="coolkid"
            />
          </InputGroup>
          {isSlugError.length !== 0 ? (
            <FormErrorMessage>{isSlugError}</FormErrorMessage>
          ) : (
            ""
          )}
        </FormControl>
        <Box w="full" py="4">
          <Button
            isLoading={isLoading}
            onClick={handleSubmit}
            colorScheme="teal"
            rounded="xl"
            w="24"
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default AddForm;
