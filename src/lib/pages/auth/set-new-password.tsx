import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import SetPasswordForm from "lib/components/auth/SetPasswordForm";
import { LS_FP_TOKEN } from "lib/helper/utils";

function SetNewPassword() {
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    if (window && window.localStorage) {
      const at = window.localStorage.getItem(LS_FP_TOKEN);
      setAccessToken(at || "");
    }
  }, []);

  return (
    <Box
      display="flex"
      minH="70vh"
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      {accessToken ? (
        <SetPasswordForm />
      ) : (
        <Box>
          <Heading>Access token not found. Please try again</Heading>
        </Box>
      )}
    </Box>
  );
}

export default SetNewPassword;
