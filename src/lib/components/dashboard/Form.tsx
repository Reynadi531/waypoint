import { Box, Flex, Text, Button, Stack, Spinner } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

import useStore from "lib/hooks/useStore";
import useUrl from "lib/hooks/useUrl";
import useUser from "lib/hooks/useUser";
import type { IUrl } from "lib/types/IUrl";

import AddForm from "./AddForm";
import UrlItem from "./UrlItem";

function Form() {
  const isAdding = useStore((x) => x.isAddingForm);
  const user = useUser();
  const { data, isLoading = true } = useUrl(user.data?.id || "");

  useStore.subscribe((x) => x.isAddingForm)();

  const addHandler = () => {
    useStore.setState({ isAddingForm: !isAdding });
  };

  return (
    <Box
      minH="50vh"
      minW="60vw"
      borderWidth="1px"
      borderRadius="xl"
      borderColor="gray.500"
      p={8}
    >
      <Flex
        alignItems="center"
        flexDirection="row"
        display={isAdding ? "none" : "flex"}
      >
        <Text flex="1" fontWeight="bold" fontSize="xl">
          My Links
        </Text>
        <Button
          onClick={addHandler}
          aria-label="Add link"
          leftIcon={<FiPlus />}
        >
          Add
        </Button>
      </Flex>
      {isLoading ? <Spinner size="xl" /> : ""}
      {!isAdding ? (
        <Stack spacing="8" m="5" display={isLoading ? "none" : "initial"}>
          {data.map((x: IUrl) => (
            <UrlItem real_url={x.real_url} hit={x.hit} slug={x.slug} />
          ))}
        </Stack>
      ) : (
        ""
      )}
      <AddForm user={user.data} />
    </Box>
  );
}

export default Form;
