import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";

const Header: React.FC = () => {
  return (
    <Flex
      direction={"row"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      p={4}
    >
      <Link href="/">
        <h1>Yosbel.dev</h1>
      </Link>
      <Box flexGrow={1}></Box>{" "}
      <nav>
        {/* <Link href="/">Home</Link> */}
        <Link href="/products-review">Products Review</Link>
      </nav>
    </Flex>
  );
};

export default Header;
