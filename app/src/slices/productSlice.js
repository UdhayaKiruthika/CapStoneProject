import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    product: {},
    isReviewSubmitted: false,
    reviews: [],
  },
  reducers: {
    productRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },

    productSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    },
    productFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    createReviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    createReviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isReviewSubmitted: true,
      };
    },
    createReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearReviewSubmitted(state, action) {
      return {
        ...state,
        isReviewSubmitted: false,
      };
    },
    clearError(state, action) {
      return { ...state, error: null };
    },
    clearProduct(state, action) {
      return { ...state, product: {} };
    },
  },
});

const { actions, reducer } = productSlice;

export const {
  productRequest,
  productSuccess,
  productFail,
  createReviewRequest,
  createReviewSuccess,
  createReviewFail,
  clearReviewSubmitted,
  clearError,
  clearProduct,
} = actions;
export default reducer;
