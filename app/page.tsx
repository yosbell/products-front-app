import ProductList from "@/app/products/product-list";
import { Grid, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Grid width={"100%"} gap={2}>
      <Text fontWeight="bold" fontSize="sm" as="h1">
        Products
      </Text>
      <ProductList />
    </Grid>
  );
}
