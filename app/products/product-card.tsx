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
import ProductService from "@/services/product-service";
import ApiClient from "@/utils/api/api-client";

interface ProductCardProps {
  product: Product;
  refreshList: Function;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, refreshList }) => {
  const { id, image, name, description, price } = product;
  const [approved, setApproved] = useState(getProductApprovedStatus(id));
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCheckboxChange = () => {
    const newStatus = !approved;
    setApproved(newStatus);
    setProductApprovedStatus(id, newStatus);
  };

  const handleDeleteProduct = async () => {
    setIsDeleting(true);
    const productService: ProductService = new ProductService(
      new ApiClient(process.env.NEXT_PUBLIC_API_URL || "", "products")
    );
    try {
      await productService.deleteProduct(id);
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setIsDeleting(false);
      refreshList();
    }
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
          disabled={isDeleting}
        >
          {isDeleting ? <Spinner size="xs" /> : <MdOutlineDelete />}
          Delete
        </Button>
        <DialogProduct product={product} />
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
