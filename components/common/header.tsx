import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";

const Header: React.FC = () => {
  return (
    <Flex
      direction={"row"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      p={4}
      width={"100%"}
      borderBottom={"1px solid #eaeaea"}
    >
      <Link href="/">
        <h1>Yosbel.dev</h1>
      </Link>
      <Box flexGrow={1}></Box>
      <nav>
        {/* <Link href="/">Home</Link> */}
        <Link href="/products-reviewed">Products Reviewed</Link>
      </nav>
    </Flex>
  );
};

export default Header;
