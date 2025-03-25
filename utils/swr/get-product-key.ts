export const getProductKey = (pageIndex: number, previousPageData: any[]) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `https://67e1958758cc6bf785266944.mockapi.io/api/v1/products?page=${
      pageIndex + 1
    }&limit=7`;
  };