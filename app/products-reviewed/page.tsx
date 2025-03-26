"use client";
import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import ProductReviewedList from "./product-reviewed-list";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import {
  fetchAccProductsAction,
  selectAccProducts,
  selectError,
  selectHasMoreAccProducts,
  selectIsLoading,
} from "@/libs/redux/slices/productSlice";

const ProductsReviewPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const accProducts = useAppSelector(selectAccProducts);
  const hasMoreAccProducts = useAppSelector(selectHasMoreAccProducts);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasMoreAccProducts) {
      dispatch(fetchAccProductsAction(page, 7));
    }
  }, [page]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Flex
      flexDirection={"column"}
      gap={2}
      onScroll={handleScroll}
      width={"800px"}
      height={"calc(100vh - 145px)"}
      maxHeight={{ base: "2400px", md: "1400px" }}
      overflowY="auto"
      alignItems={"flex-start"}
      flexWrap={"nowrap"}
    >
      <Text fontWeight="bold" fontSize="sm" as="h1">
        Reviewed products
      </Text>
      <ProductReviewedList
        products={accProducts}
        isLoading={isLoading}
        error={error}
      />
    </Flex>
  );
};

export default ProductsReviewPage;
