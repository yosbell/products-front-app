import React, { useState } from "react";
import { Box, Image, Text, Checkbox, Flex } from "@chakra-ui/react";
import { Product } from "./product-list";
import DialogProduct from "./dialog-product";

interface ProductCardProps {
  product: Product;
}

const getPreviewApprovedProducts = () => {
  return JSON.parse(localStorage.getItem("approved-products") || "{}");
};
const getInitialApprovedStatus = (id: number) => {
  return getPreviewApprovedProducts()[id] || false;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, image, name, description, price } = product;
  const [approved, setApproved] = useState(getInitialApprovedStatus(id));

  const handleCheckboxChange = () => {
    const newStatus = !approved;
    setApproved(newStatus);
    const previewApprovedProducts = JSON.parse(
      localStorage.getItem("approved-products") || "{}"
    );
    localStorage.setItem(
      "approved-products",
      JSON.stringify({ ...previewApprovedProducts, [id]: newStatus })
    );
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="2"
      className="product-card"
      height={"300px"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Image
        src={image}
        alt={name}
        className="product-image"
        height={"150px"}
        aspectRatio={1.2}
      />
      <Box p="2">
        <Text
          fontWeight="bold"
          fontSize="sm"
          className="product-name"
          lineClamp="1"
        >
          {name}
        </Text>
        <Text
          mt="2"
          className="product-description"
          fontSize={"xs"}
          lineClamp="2"
        >
          {description}
        </Text>
        <Text mt="2" color="teal.500" fontSize="xs" className="product-price">
          ${price}
        </Text>
        <Flex justifyContent={"space-between"}>
          <Checkbox.Root
            mt="2"
            checked={approved}
            onCheckedChange={handleCheckboxChange}
            size={"xs"}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label fontSize={"xs"}>Aproved</Checkbox.Label>
          </Checkbox.Root>
          <DialogProduct product={product} />
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductCard;
