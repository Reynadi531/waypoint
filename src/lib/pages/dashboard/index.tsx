import { Box, Spinner } from "@chakra-ui/react";

import Form from "lib/components/dashboard/Form";
import useUser from "lib/hooks/useUser";

const Main = () => {
  return <Form />;
};

function Dashboard() {
  const { data, isLoading } = useUser();

  return (
    <Box
      display="flex"
      minH="70vh"
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? <Spinner /> : !data ? <Spinner /> : <Main />}
    </Box>
  );
}

export default Dashboard;
