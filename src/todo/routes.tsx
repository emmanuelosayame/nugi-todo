import { Suspense } from 'react';
import { Outlet, redirect, RouteObject } from 'react-router-dom';
import RootLayout from '../layout/layout';
import TodoComponent from './todo';
import Store from '../store';
import { API } from '../store/apiSlice';
import { DTOToType, parseFormData } from '../utils/parser';
import { todoMutatationS } from '../entities/todos';

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

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

            await Store.dispatch(API.endpoints.saveTodo.initiate(formData));

            const isNew = formData.todoId === 'new';

            return isNew ? redirect('/todos') : null;
          },
          Component: TodoComponent,
        },
      ],
    },
  ],
};
