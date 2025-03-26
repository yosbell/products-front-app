"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./product-card";
import { SimpleGrid } from "@chakra-ui/react";
import { Product } from "@/models/product";
import CenterLoading from "@/components/common/center-loading";
import ProductService from "@/services/product-service";
import ApiClient from "@/utils/api/api-client";

const ProductList = () => {
  const [products, serProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const productService: ProductService = new ProductService(
    new ApiClient(process.env.NEXT_PUBLIC_API_URL || "", "products")
  );

  useEffect(() => {
    setIsLoading(true);
    productService
      .getProducts(1, 10)
      .then((products: Product[]) => {
        serProducts(products);
        console.log(products);
      })
      .catch((error: any) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // const products = data as Product[];
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
