import { configureStore } from '@reduxjs/toolkit';
import viewReleaseReducer from './reducers/ViewReleaseReducer'; // Update the path as per your file structure
import releaseStockSlice from './reducers/ReleaseStockReducer'; // Corrected the second import name

const store = configureStore({
  reducer: {
    release: viewReleaseReducer, // Reducer for handling view-related actions
    stock: releaseStockSlice, // Reducer for handling stock-related actions
  },
  // Middleware is automatically added (including `thunk`), but you can customize if needed
});

export default store;
