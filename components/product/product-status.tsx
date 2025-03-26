import { HStack, Status, Text } from "@chakra-ui/react";
import React from "react";

interface ProductStatusProps {
  status: "approved" | "rejected";
}

const ProductStatus: React.FC<ProductStatusProps> = ({ status }) => {
  return (
    <HStack gap="2" mt="2">
      <Status.Root colorPalette={status === "approved" ? "green" : "red"}>
        <Status.Indicator />
      </Status.Root>
      <Text textTransform={"textTransform"}>{status}</Text>
    </HStack>
  );
};

export default ProductStatus;
