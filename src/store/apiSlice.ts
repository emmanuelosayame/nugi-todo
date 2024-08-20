import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo } from '../types/todo';

// Define a service using a base URL and expected endpoints
export const API = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getTodos: builder.query<{ data: Todo[]; message: string }, undefined>({
      query: () => `todos`,
    }),
  }),
});

export const { useGetTodosQuery } = API;
