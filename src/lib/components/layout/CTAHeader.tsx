import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { RiAccountCircleFill } from "react-icons/ri";

function CTAHeader() {
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
          <MenuItem as="a" href="/auth/signup">
            Signup
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default CTAHeader;
