import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Image,
  Portal,
  Text,
} from "@chakra-ui/react";
import ProductCard from "./product-card";
import { Product } from "@/models/product";

interface DialogProductProps {
  product: Product;
}

const DialogProduct: React.FC<DialogProductProps> = ({ product }) => {
  const { name, description, price, image } = product;
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
              <ProductCard product={product} />
              {/* <Box p="2">
                <Image
                  src={image}
                  alt={name}
                  className="product-image"
                  height={"250px"}
                  aspectRatio={1.2}
                />
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
                <Text
                  mt="2"
                  color="teal.500"
                  fontSize="xs"
                  className="product-price"
                >
                  ${price}
                </Text>
              </Box> */}
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
