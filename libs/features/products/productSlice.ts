import { AppDispatch, RootState } from "@/libs/store";
import { Product } from "@/models/product";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import ProductService from "@/services/product-service";
import ApiClient from "@/utils/api/api-client";

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: any;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    startFetch: (state) => {
      state.isLoading = true;
      state.products = [];
    },
    endFetch: (state) => {
      state.isLoading = false;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, startFetch, endFetch, setError } =
  productSlice.actions;

export const selectProducts = (state: RootState) => state.product.products;
export const selectIsLoading = (state: RootState) => state.product.isLoading;
export const selectError = (state: RootState) => state.product.error;

export const fetchProductsAction =
  (page: number, limit: number) => async (dispatch: AppDispatch) => {
    dispatch(startFetch());
    const productService: ProductService = new ProductService(
      new ApiClient(process.env.NEXT_PUBLIC_API_URL || "", "products")
    );
    productService
      .getProducts(page, limit)
      .then((products: Product[]) => {
        dispatch(setProducts(products));
      })
      .catch((error: any) => {
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(endFetch());
      });
  };

export default productSlice.reducer;
