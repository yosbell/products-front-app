"use client";
import React from "react";
import { Box, Spinner } from "@chakra-ui/react";
import useSWRInfinite from "swr/infinite";
import ProductCard from "./product-card";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getKey = (pageIndex: number, previousPageData: any[]) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return `https://67e1958758cc6bf785266944.mockapi.io/api/v1/products?page=${
    pageIndex + 1
  }&limit=7`; // SWR key
};

const ProductsReviewPage: React.FC = () => {
//   const [page, setPage] = useState(1);
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
  });
//   if (!data) return "loading";

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setSize(size + 1);
      //   mutate();
    }
  };

  //   if (error) return <Text>Error loading products</Text>;

  return (
    <Box onScroll={handleScroll} height="95vh" overflowY="auto" p={4}>
      {data?.map((products, page: number) =>
        products.map((product: any, indexInPage: number) => (
          <ProductCard
            key={`product-review-${page}-${indexInPage}`}
            product={product}
          />
        ))
      )}
      {!data && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Spinner />
        </Box>
      )}
    </Box>
  );
};

export default ProductsReviewPage;
