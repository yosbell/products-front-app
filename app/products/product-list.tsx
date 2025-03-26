"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./product-card";
import { SimpleGrid } from "@chakra-ui/react";
import { Product } from "@/models/product";
import CenterLoading from "@/components/common/center-loading";
import { useAppSelector, useAppDispatch } from "@/libs/redux/hooks";
import {
  fetchProductsAction,
  selectError,
  selectIsLoading,
  selectProducts,
} from "@/libs/redux/slices/productSlice";

const ProductList = () => {
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsAction(1, 10));
  }, []);

  return (
    <SimpleGrid gap="2" minChildWidth="260px" width={"100%"}>
      {isLoading && <CenterLoading />}
      {error && <p>Error loading products</p>}
      {products &&
        products.map((product: Product) => (
          <ProductCard
            key={`product-list-${product.id}`}
            product={product}
          />
        ))}
    </SimpleGrid>
  );
};

export default ProductList;
