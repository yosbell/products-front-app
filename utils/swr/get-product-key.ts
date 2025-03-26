export const getProductKey = (pageIndex: number, previousPageData: any[]) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${process.env.NEXT_PUBLIC_API_URL}products?page=${
      pageIndex + 1
    }&limit=7`;
  };