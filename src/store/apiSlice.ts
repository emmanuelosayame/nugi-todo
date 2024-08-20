import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo, TodoMutation } from '../entities/todos';

// Define a service using a base URL and expected endpoints
export const API = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({ baseUrl: `${window.location.origin}/api/` }),
  endpoints: (builder) => ({
    getTodos: builder.query<{ data: Todo[]; message: string }, undefined>({
      query: () => `todos`,
    }),
    getTodo: builder.query<{ data: Todo; message: string }, string>({
      query: (todoId) => `todos/${todoId}`,
    }),
    saveTodo: builder.query<{ data: Todo; message: string }, TodoMutation>({
      query: ({ todoId, ...payload }) => {
        const isNew = todoId === 'new';

        return {
          url: !isNew ? `todos/${todoId}` : `todos`,
          body: payload,
          method: !isNew ? 'PUT' : 'POST',
        };
      },
    }),
  }),
});

export const { useGetTodosQuery } = API;
