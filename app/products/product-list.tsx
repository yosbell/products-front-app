"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./product-card";
import { SimpleGrid } from "@chakra-ui/react";
import { Product } from "@/models/product";
import CenterLoading from "@/components/common/center-loading";
import ProductService from "@/services/product-service";
import ApiClient from "@/utils/api/api-client";
import { useAppSelector, useAppDispatch } from "@/libs/hooks";
import {
  fetchProductsAction,
  selectError,
  selectIsLoading,
  selectProducts,
} from "@/libs/features/products/productSlice";

const ProductList = () => {
  const [uiVersion, setUIVersion] = useState<number>(0);

  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsAction(1, 10));
  }, [uiVersion]);

  const handleRefreshList = () => {
    setUIVersion((prevUIVersion) => prevUIVersion + 1);
  };

  return (
    <SimpleGrid gap="2" minChildWidth="260px" width={"100%"}>
      {isLoading && <CenterLoading />}
      {error && <p>Error loading products</p>}
      {products &&
        products.map((product: Product) => (
          <ProductCard
            key={`product-list-${product.id}`}
            product={product}
            refreshList={handleRefreshList}
          />
        ))}
    </SimpleGrid>
  );
};

export default ProductList;
