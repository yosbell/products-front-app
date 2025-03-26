"use client";
import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/utils/api/fetcher";
import { getProductKey } from "@/utils/swr/get-product-key";
import ProductReviewedList from "./product-reviewed-list";

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
      <ProductReviewedList
        data={data}
        size={size}
      />
    </Flex>
  );
};

export default ProductsReviewPage;
