import { Suspense } from 'react';
import { json, Outlet, redirect, RouteObject } from 'react-router-dom';
import RootLayout from '../layout/layout';
import TodoComponent from './:todoId';
import Store from '../store';
import { API } from '../store/apiSlice';
import { DTOToType, parseFormData } from '../utils/parser';
import { todoMutatationS } from '../entities/todos';
import { sonner } from '../components/toaster';
import { delay } from '../utils/helpers';

export const todoRoutes: RouteObject = {
  path: 'todos',
  Component: Outlet,
  children: [
    {
      element: (
        <Suspense>
          <RootLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          lazy: () => import('./home'),
        },
        {
          path: ':todoId',
          loader: async ({ params }) => {
            const todoId = params.todoId!;
            //delay to allow msw initialize
            await delay();
            const { isSuccess, data } =
              todoId === 'new'
                ? { isSuccess: true, data: { data: null } }
                : await Store.dispatch(API.endpoints.getTodo.initiate(todoId));

            if (!isSuccess) throw new Error('Failed to fetch data');

            return { todo: data.data, todoId };
          },
          action: async ({ request }) => {
            const formData =
              await parseFormData<DTOToType<typeof todoMutatationS>>(request);

            await Store.dispatch(
              API.endpoints.saveTodo.initiate(formData, { forceRefetch: true })
            );

            const isNew = formData.todoId === 'new';

            sonner.success(isNew ? 'Created Todo' : 'Saved Todo');

            return isNew ? redirect('/todos') : json({ success: true });
          },
          Component: TodoComponent,
        },
      ],
    },
  ],
};
