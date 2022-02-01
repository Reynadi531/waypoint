import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { useState } from "react";

import { register } from "lib/helper/supabase";

function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const toast = useToast();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };
  const handleRegister = async () => {
    if (email.length === 0) {
      return toast({
        title: "Email cannot be empty",
        description: "The email cannont be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    if (password.length === 0) {
      return toast({
        title: "Password cannot be empty",
        description: "The password cannont be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }

    const { error } = await register({ email, password });

    if (error) {
      return toast({
        title: "Register Error",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    return toast({
      title: "Register success",
      description: "Please confirm the email",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box p={5} rounded="xl" borderColor="gray.500" borderWidth="1px">
      <FormControl isRequired as={Stack} flexDirection="column" spacing="4">
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          id="email"
          type="email"
          onChange={handleEmailChange}
        />
        <FormLabel>Password</FormLabel>
        <Input
          onChange={handlePasswordChange}
          value={password}
          id="password"
          type="password"
        />
      </FormControl>
      <Stack my="4" direction="column" spacing="4">
        <Button onClick={handleRegister} rounded="xl" colorScheme="teal">
          Register
        </Button>
        <Text color="gray" as="a" href="/auth/login">
          Already have account? Login now
        </Text>
      </Stack>
    </Box>
  );
}
export default RegisterForm;
