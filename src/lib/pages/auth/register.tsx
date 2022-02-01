import { Box } from "@chakra-ui/react";

import RegisterForm from "lib/components/auth/RegisterForm";

function register() {
  return (
    <Box
      display="flex"
      minH="70vh"
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <RegisterForm />
    </Box>
  );
}

export default register;
