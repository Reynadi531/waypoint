import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { RiAccountCircleFill } from "react-icons/ri";

import { handleLogout } from "lib/helper/supabase";
import useUser from "lib/hooks/useUser";

const NotAuthenticatedMenu = () => {
  return (
    <Box>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="account"
          icon={<RiAccountCircleFill />}
          variant="solid"
          fontSize="lg"
        />
        <MenuList>
          <MenuItem as="a" href="/auth/login">
            Login
          </MenuItem>
          <MenuItem as="a" href="/auth/register">
            Signup
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

const AuthenticatedMenu = () => {
  return (
    <Box>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="account"
          icon={<RiAccountCircleFill />}
          variant="solid"
          fontSize="lg"
        />
        <MenuList>
          <MenuItem as="a" href="/dashboard">
            Dashboard
          </MenuItem>
          <MenuItem as="button" onClick={handleLogout}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

function CTAHeader() {
  const { data } = useUser();
  return <div>{!data ? <NotAuthenticatedMenu /> : <AuthenticatedMenu />}</div>;
}

export default CTAHeader;
