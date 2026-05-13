import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stock: null,
  loading: false,
  error: null,
};

const releaseStockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    fetchStockStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStockSuccess(state, action) {
      state.stock = action.payload;
      state.loading = false;
    },
    fetchStockFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateStockField(state, action) {
      const { field, value } = action.payload;
      if (state.stock) {
        state.stock[field] = value;
      }
    },
  },
});

export const { fetchStockStart, fetchStockSuccess, fetchStockFailure, updateStockField } =
  releaseStockSlice.actions;

export default releaseStockSlice.reducer;
