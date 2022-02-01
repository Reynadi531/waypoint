import { Box } from "@chakra-ui/react";

import LoginForm from "lib/components/auth/LoginForm";

function login() {
  return (
    <Box
      display="flex"
      minH="70vh"
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <LoginForm />
    </Box>
  );
}

export default login;
