import { Flex } from "@chakra-ui/react";
import React from "react";
import { Product } from "@/models/product";
import ProductReviewedCard from "./product-reviewed-card";
import CenterLoading from "@/components/common/center-loading";

interface ProductReviewedListProps {
  products: Product[] | undefined;
  error: any;
  isLoading: boolean;
}

const ProductReviewedList: React.FC<ProductReviewedListProps> = ({
  products,
  isLoading,
  error,
}) => {
  return (
    <React.Fragment>
      <Flex
        gap="2"
        flexDirection={"row"}
        justifyContent={"flex-start"}
        width={"100%"}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        {products && (
          products.map((product: Product, indexInPage: number) => (
            <ProductReviewedCard
              key={`product-review-${indexInPage}`}
              product={product}
            />
          ))
        )}
      </Flex>

      {isLoading && <CenterLoading />}
      {error && <p>Error loading products
        <br />
        {error}S
      </p>}
    </React.Fragment>
  );
};

export default ProductReviewedList;
