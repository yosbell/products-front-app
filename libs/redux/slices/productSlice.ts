import { AppDispatch, RootState } from "@/libs/redux/store";
import { Product } from "@/models/product";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import ProductService from "@/services/product-service";
import ApiClient from "@/utils/api/api-client";

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: any;
  idProductDeleting: number;
  accProducts: Product[];
  hasMoreAccProducts: boolean;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
  idProductDeleting: -1,
  accProducts: [],
  hasMoreAccProducts: true,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setAccProducts: (state, action: PayloadAction<Product[]>) => {
      state.accProducts = [...state.accProducts, ...action.payload];
    },
    setHasMoreAccProducts: (state, action: PayloadAction<boolean>) => {
      state.hasMoreAccProducts = action.payload;
    },
    startFetch: (state) => {
      state.isLoading = true;
      state.products = [];
      state.error = null;
    },
    endFetch: (state) => {
      state.isLoading = false;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    startDeleting: (state, action: PayloadAction<number>) => {
      state.error = null;
      state.idProductDeleting = action.payload;
    },
    endDeleting: (state) => {
      state.idProductDeleting = -1;
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const {
  setProducts,
  setAccProducts,
  setHasMoreAccProducts,
  startFetch,
  endFetch,
  setError,
  startDeleting,
  endDeleting,
  deleteProduct,
} = productSlice.actions;

export const selectProducts = (state: RootState) => state.product.products;
export const selectIsLoading = (state: RootState) => state.product.isLoading;
export const selectError = (state: RootState) => state.product.error;
export const selectIdProductDeleting = (state: RootState) =>
  state.product.idProductDeleting;
export const selectAccProducts = (state: RootState) =>
  state.product.accProducts;
export const selectHasMoreAccProducts = (state: RootState) =>
  state.product.hasMoreAccProducts;

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

export const fetchAccProductsAction =
  (page: number, limit: number = 7) =>
  async (dispatch: AppDispatch) => {
    dispatch(startFetch());
    const productService: ProductService = new ProductService(
      new ApiClient(process.env.NEXT_PUBLIC_API_URL || "", "products")
    );
    productService
      .getProducts(page, limit)
      .then((products: Product[]) => {
        dispatch(setAccProducts(products));
        if (products.length < 7) {
          setHasMoreAccProducts(false);
        }
      })
      .catch((error: any) => {
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(endFetch());
      });
  };

export const deleteProductAction =
  (id: number) => async (dispatch: AppDispatch) => {
    dispatch(startDeleting(id));
    const productService: ProductService = new ProductService(
      new ApiClient(process.env.NEXT_PUBLIC_API_URL || "", "products")
    );
    productService
      .deleteProduct(id)
      .then(() => {
        dispatch(deleteProduct(id));
      })
      .catch((error: any) => {
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(endDeleting());
      });
  };

export default productSlice.reducer;
