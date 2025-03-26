"use client";
import React from "react";
import useSWR from "swr";
import ProductCard from "./product-card";
import { SimpleGrid } from "@chakra-ui/react";
import { Product } from "@/models/product";
import { fetcher } from "@/utils/api/fetcher";
import CenterLoading from "@/components/common/center-loading";

const ProductList = () => {
  const { data, error, isLoading } = useSWR(
    `https://67e1958758cc6bf785266944.mockapi.io/api/v1/products?limit=10&page=1`,
    fetcher
  );
  const products = data as Product[];
  return (
    <SimpleGrid gap="2" minChildWidth="260px" width={"100%"}>
      {isLoading && <CenterLoading />}
      {error && <p>Error loading products</p>}
      {products &&
        products.map((product: Product) => (
          <ProductCard key={`product-list-${product.id}`} product={product} />
        ))}
    </SimpleGrid>
  );
};

export default ProductList;
