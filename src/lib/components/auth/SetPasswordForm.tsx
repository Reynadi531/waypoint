import {
  Box,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useState, useEffect } from "react";

import { setNewPassword } from "lib/helper/supabase";
import { LS_FP_TOKEN } from "lib/helper/utils";

function SetPasswordForm() {
  const [password, SetPassword] = useState<string>("");
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (window && window.localStorage) {
      const at = window.localStorage.getItem(LS_FP_TOKEN);
      setAccessToken(at || "");
    }
  }, []);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    SetPassword(e.target.value);
  };

  const handleResetPassword = async () => {
    if (accessToken) {
      const { error } = await setNewPassword({ accessToken, password });
      if (error) {
        toast({
          title: "Access token not found",
          description: "Failed pelase try again",
          status: "error",
          position: "top",
          duration: 3000,
        });
      } else {
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);

        toast({
          title: "Success set new password",
          description: "Please try to login with new password",
          status: "success",
          position: "top",
          duration: 3000,
        });
      }
    }
  };

  const handleSubmit = async () => {
    SetIsLoading(true);

    if (password.length === 0) {
      toast({
        title: "Password cannot be empty",
        description: "Please enter password",
        status: "error",
        position: "top",
        duration: 2000,
      });
    } else {
      await handleResetPassword();

      SetIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? <Spinner size="xl" /> : ""}
      <Box
        p="8"
        rounded="xl"
        borderColor="gray.300"
        borderWidth="1px"
        minW="40vh"
        display={isLoading ? "none" : "initial"}
      >
        <Stack spacing="4" direction="column">
          <FormControl isRequired>
            <FormLabel htmlFor="password">New password:</FormLabel>
            <Input
              onChange={handlePasswordChange}
              value={password}
              id="password"
            />
          </FormControl>
          <Button rounded="xl" onClick={handleSubmit} w="24" colorScheme="teal">
            Submit
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default SetPasswordForm;
