import React from "react";
import { Image, Text, HStack, Status, Card } from "@chakra-ui/react";
import { Product } from "@/models/product";
import { getProductApprovedStatus } from "@/utils/localStorage";

interface ReviewedProductCardProps {
  product: Product;
}

const ReviewedProductCard: React.FC<ReviewedProductCardProps> = ({
  product,
}) => {
  const { id, image, name, description, price } = product;
  const productStatus = getProductApprovedStatus(id);

  return (
    <Card.Root width={{base: '100%', md: '48%'}} minWidth={'260px'} height={'350px'} overflow="hidden" p={2}>
      <Image
        src={image}
        alt={name}
        className="product-image"
        height={"150px"}
        aspectRatio={1.2}
      />
      <Card.Body p="2">
        <Card.Title>{name}</Card.Title>
        <Card.Description>{description}</Card.Description>
        <Text mt="2" color="teal.500" fontSize="xs">
          ${price}
        </Text>
      </Card.Body>
      <Card.Footer>
        {!productStatus && (
          <HStack gap="2" mt="2">
            <Status.Root colorPalette="red">
              <Status.Indicator />
            </Status.Root>
            <Text>Rejected</Text>
          </HStack>
        )}
        {productStatus && (
          <HStack gap="2" mt="2">
            <Status.Root colorPalette="green">
              <Status.Indicator />
            </Status.Root>
            <Text>Approved</Text>
          </HStack>
        )}
      </Card.Footer>
    </Card.Root>
  );
};

export default ReviewedProductCard;
