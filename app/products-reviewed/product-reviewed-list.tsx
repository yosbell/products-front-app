import { Flex } from "@chakra-ui/react";
import React from "react";
import { Product } from "@/models/product";
import ProductReviewedCard from "./product-reviewed-card";
import CenterLoading from "@/components/common/center-loading";

interface ProductReviewedListProps {
  data: any[] | undefined;
  size: number;
}

const ProductReviewedList: React.FC<ProductReviewedListProps> = ({
  data,
  size,
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
        {data?.map((products, page: number) =>
          products.map((product: Product, indexInPage: number) => (
            <ProductReviewedCard
              key={`product-review-${page}-${indexInPage}`}
              product={product}
            />
          ))
        )}
      </Flex>

      {(!data || data[size - 1] === undefined) && <CenterLoading />}
    </React.Fragment>
  );
};

export default ProductReviewedList;
