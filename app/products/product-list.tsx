"use client";
import React from "react";
import useSWR from "swr";
import ProductCard from "./product-card";
import { Grid, SimpleGrid, Text } from "@chakra-ui/react";
import { Product } from "@/models/product";

const fetcher = (url: string) => fetch(url).then((res) => res.json());


const ProductList = () => {
  const { data, error, isLoading } = useSWR(
    `https://67e1958758cc6bf785266944.mockapi.io/api/v1/products?limit=10&page=1`,
    fetcher
  );
  const products = data as Product[];
  return (
    <Grid width={"100%"} gap={2}>
      <Text fontWeight="bold" fontSize="sm" as="h1">
        Products
      </Text>
      <SimpleGrid gap="2" minChildWidth="260px" width={"100%"}>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading products</p>}
        {data &&
          products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </SimpleGrid>
    </Grid>
  );
};

export default ProductList;
