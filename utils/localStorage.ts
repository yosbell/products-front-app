export const getPreviousApprovedProducts = () => {
  return JSON.parse(localStorage.getItem("approved-products") || "{}");
};
export const getProductApprovedStatus = (id: number) => {
  return getPreviousApprovedProducts()[id] || false;
};

export const setProductApprovedStatus = (id: number, value: boolean) => {
  const previousApprovedStatus = getPreviousApprovedProducts();
  const newApprovedStatus = { ...previousApprovedStatus, [id]: value };
  localStorage.setItem("approved-products", JSON.stringify(newApprovedStatus));
};
