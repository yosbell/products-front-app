"use client";
import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import ProductReviewedList from "./product-reviewed-list";
import { Product } from "@/models/product";
import ProductService from "@/services/product-service";
import ApiClient from "@/utils/api/api-client";

const ProductsReviewPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const productService: ProductService = new ProductService(
    new ApiClient(process.env.NEXT_PUBLIC_API_URL || "", "products")
  );

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const newProducts: Product[] = await productService.getProducts(
          page,
          7
        );
        setProducts((prevProducts: Product[]) => [
          ...prevProducts,
          ...newProducts,
        ]);
        if (newProducts.length < 7) {
          setHasMore(false);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (hasMore) {
      loadProducts();
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
      <ProductReviewedList products={products} isLoading={isLoading} error={error} />
    </Flex>
  );
};

export default ProductsReviewPage;
