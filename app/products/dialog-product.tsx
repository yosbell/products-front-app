import {
  Button,
  Card,
  CloseButton,
  Dialog,
  Image,
  Portal,
  Text,
} from "@chakra-ui/react";
import { Product } from "@/models/product";
import { getProductApprovedStatus } from "@/utils/localStorage";
import ProductStatus from "@/components/product/product-status";

interface DialogProductProps {
  product: Product;
}

const DialogProduct: React.FC<DialogProductProps> = ({ product }) => {
  const { name, description, price, image, id } = product;
  const productStatus = getProductApprovedStatus(id);
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" padding={"2px 8px"}>
          Details
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header padding={"2"}>
              <Dialog.Title>Product:</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Card.Root
                width={'100%'}
                overflow="hidden"
                p={2}
              >
                <Image
                  src={image}
                  alt={name}
                  className="product-image"
                  height={"250px"}
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
                  <ProductStatus
                    status={productStatus ? "approved" : "rejected"}
                  />
                </Card.Footer>
              </Card.Root>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DialogProduct;
