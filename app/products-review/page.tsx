"use client";
import React from "react";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import useSWRInfinite from "swr/infinite";
import ReviewedProductCard from "./reviewed-product-card";
import { fetcher } from "@/utils/api/fetcher";
import { getProductKey } from "@/utils/swr/get-product-key";

const ProductsReviewPage: React.FC = () => {
  const { data, size, setSize } = useSWRInfinite(getProductKey, fetcher, {
    revalidateFirstPage: false,
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setSize(size + 1);
    }
  };

  return (
    <Flex flexDirection={"column"} gap={2} onScroll={handleScroll} width={"800px"} height={'calc(100vh - 145px)'} maxHeight={{base: 2400, md: '1400px'}} overflowY="auto" alignItems={"flex-start"} flexWrap={"nowrap"}>
      <Text fontWeight="bold" fontSize="sm" as="h1">
        Reviewed products
      </Text>
      <Flex gap="2" flexDirection={'row'} justifyContent={'flex-start'} width={"100%"} alignItems={"center"} flexWrap={"wrap"}>
        {data?.map((products, page: number) =>
          products.map((product: any, indexInPage: number) => (
            <ReviewedProductCard
              key={`product-review-${page}-${indexInPage}`}
              product={product}
            />
          ))
        )}
      </Flex>

      {(!data || data[size - 1] === undefined) && (
        <Box display="flex" justifyContent="center" mt={4} width={'100%'}>
          <Spinner />
        </Box>
      )}
    </Flex>
  );
};

export default ProductsReviewPage;
