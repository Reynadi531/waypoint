import { Box, Text, Stack } from "@chakra-ui/react";

import ForgotPasswordForm from "lib/components/auth/ForgotPasswordForm";

function ForgotPassword() {
  return (
    <Box
      display="flex"
      minH="70vh"
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Stack spacing="8" direction="column">
        <Text textAlign="center" fontWeight="bold" fontSize="xl">
          Forgot Password
        </Text>
        <ForgotPasswordForm />
      </Stack>
    </Box>
  );
}

export default ForgotPassword;
