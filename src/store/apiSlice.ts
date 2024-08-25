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
          body: {
            ...payload,
            isCompleted: JSON.parse(
              ((`${payload?.isCompleted}` || 'false') as string).toLowerCase()
            ),
          },
          method: !isNew ? 'PUT' : 'POST',
        };
      },
      onQueryStarted: async (payload, { dispatch, queryFulfilled }) => {
        const isNew = payload.todoId === 'new';
        console.log(payload);
        if (!isNew) {
          const patchResult = dispatch(
            API.util.updateQueryData('getTodos', undefined, (draft) => {
              Object.assign(draft, {
                ...draft,
                data: [
                  ...draft.data.filter((x) => x.id !== payload.todoId),
                  {
                    updatedAt: new Date(),
                    title: payload.title,
                    id: payload.todoId,
                    isCompleted:
                      ((payload as any).isCompleted as string) === 'true'
                        ? true
                        : false,
                  },
                ],
              });
            })
          );

          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        }
      },
    }),
    deleteTodo: builder.query<{ data: Todo; message: string }, string>({
      query: (todoId) => {
        return {
          url: `todos/${todoId}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const { useGetTodosQuery } = API;
