import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { API } from './apiSlice';

const Store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(API.middleware),
});
setupListeners(Store.dispatch);

export default Store;

export type RootState = ReturnType<(typeof Store)['getState']>;
export type AppDispatch = (typeof Store)['dispatch'];
