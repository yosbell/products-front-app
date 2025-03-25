"use client";
import React from "react";
import useSWR from "swr";
import ProductCard from "./product-card";
import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
}

const ProductList = () => {
  const { data, error, isLoading } = useSWR(
    `https://67e1958758cc6bf785266944.mockapi.io/api/v1/products`,
    fetcher
  );
  const products = data as Product[];
  return (
    <Box width={"100%"}>
      <h1>Products Page</h1>
      <p>
        Welcome to the products page. Here you will find a variety of products
        available for purchase.
      </p>
      <SimpleGrid gap="6" minChildWidth="260px" width={"100%"}>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading products</p>}
        {data &&
          products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />

            // <div key={product.id}>
            //     <img src={product.image} alt={product.name} width={200} height={'auto'} style={{aspectRatio: 1}}/>
            //     <h3>{product.name}</h3>
            //     <p>{product.description}</p>
            //     <p>Price: ${product.price}</p>
            // </div>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductList;
