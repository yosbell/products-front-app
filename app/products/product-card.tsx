import React, { useState } from "react";
import { Image, Text, Checkbox, Card } from "@chakra-ui/react";
import { Product } from "@/models/product";
import DialogProduct from "./dialog-product";
import {
  getProductApprovedStatus,
  setProductApprovedStatus,
} from "@/utils/localStorage";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, image, name, description, price } = product;
  const [approved, setApproved] = useState(getProductApprovedStatus(id));

  const handleCheckboxChange = () => {
    const newStatus = !approved;
    setApproved(newStatus);
    setProductApprovedStatus(id, newStatus);
  };

  return (
    <Card.Root maxW="sm" overflow="hidden" p={2}>
      <Image
        src={image}
        alt={name}
        height={"150px"}
        aspectRatio={1.2}
      />
      <Card.Body gap="2">
        <Card.Title lineClamp="1">{name}</Card.Title>
        <Card.Description lineClamp="2">{description}</Card.Description>
        <Text mt="2" color="teal.500" fontSize="xs" className="product-price">
          ${price}
        </Text>
      </Card.Body>
      <Card.Footer justifyContent={"space-between"}>
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
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
