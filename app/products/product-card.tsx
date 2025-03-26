import React, { useState } from "react";
import {
  Image,
  Text,
  Checkbox,
  Card,
  Box,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { Product } from "@/models/product";
import DialogProduct from "./dialog-product";
import {
  getProductApprovedStatus,
  setProductApprovedStatus,
} from "@/utils/localStorage";
import { MdOutlineDelete } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import {
  deleteProductAction,
  selectIdProductDeleting,
} from "@/libs/redux/slices/productSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, image, name, description, price } = product;
  const [approved, setApproved] = useState(getProductApprovedStatus(id));
  const idProductDeleting = useAppSelector(selectIdProductDeleting);
  const dispatch = useAppDispatch();

  const handleCheckboxChange = () => {
    const newStatus = !approved;
    setApproved(newStatus);
    setProductApprovedStatus(id, newStatus);
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProductAction(id));
  };

  return (
    <Card.Root maxW="sm" overflow="hidden" p={2}>
      <Image src={image} alt={name} height={"150px"} aspectRatio={1.2} />
      <Card.Body gap="2">
        <Card.Title lineClamp="1">{name}</Card.Title>
        <Card.Description lineClamp="2">{description}</Card.Description>
        <Text mt="2" color="teal.500" fontSize="xs" className="product-price">
          ${price}
        </Text>
      </Card.Body>
      <Card.Footer>
        <Checkbox.Root
          mt="2"
          checked={approved}
          onCheckedChange={handleCheckboxChange}
          size={"xs"}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label fontSize={"xs"}>Approved</Checkbox.Label>
        </Checkbox.Root>
        <Box flexGrow={1} />
        <Button
          variant="outline"
          size="sm"
          padding={"2px 8px"}
          onClick={handleDeleteProduct}
          disabled={idProductDeleting === id}
        >
          {idProductDeleting === id ? (
            <Spinner size="xs" />
          ) : (
            <MdOutlineDelete />
          )}
          Delete
        </Button>
        <DialogProduct product={product} />
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
