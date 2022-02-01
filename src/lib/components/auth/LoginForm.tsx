import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  FormHelperText,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useState } from "react";

import { login, setSessionToServer } from "lib/helper/supabase";

function LoginForm() {
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
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

    const { session, error } = await login({ email, password });

    if (error) {
      return toast({
        title: "Login Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    await setSessionToServer("SIGNED_IN", session);

    toast({
      title: "Login success",
      description: "You'll be redirected soon",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });

    return setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
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
        <FormHelperText as="a" href="/auth/forgot-password">
          Forgot password?
        </FormHelperText>
      </FormControl>
      <Stack my="4" direction="column" spacing="4">
        <Button onClick={handleLogin} rounded="xl" colorScheme="teal">
          Login
        </Button>
        <Text color="gray" as="a" href="/auth/register">
          Dont have account? register now
        </Text>
      </Stack>
    </Box>
  );
}

export default LoginForm;
