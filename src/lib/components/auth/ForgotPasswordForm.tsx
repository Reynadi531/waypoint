import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { useState } from "react";

import { forgetPassword } from "lib/helper/supabase";

function ForgotPasswordForm() {
  const [email, setEmail] = useState<string>("");
  const toast = useToast();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    const { error } = await forgetPassword({ email });
    if (!error) {
      toast({
        title: "Check your email",
        description: "We're sending link to reset your password",
        status: "success",
        duration: 3000,
        position: "top",
      });
    }
  };

  return (
    <Box
      as={Stack}
      flexDirection="column"
      p={5}
      spacing="8"
      rounded="xl"
      borderWidth="1px"
      borderColor="gray.500"
    >
      <FormControl isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          onChange={handleEmailChange}
          value={email}
          id="email"
          type="email"
        />
      </FormControl>
      <Button onClick={handleResetPassword} colorScheme="teal">
        Submit
      </Button>
    </Box>
  );
}

export default ForgotPasswordForm;
