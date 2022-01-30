import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" maxWidth="container.xl" transition="0.5s ease-out">
      <Box margin="8">
        <Header />
        <Box as="main" my="12">
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
