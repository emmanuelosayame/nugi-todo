import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import RootLayout from '../layout/layout';
import TodoComponent, { action } from '../screens/todo';

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
          action: action,
          Component: TodoComponent,
        },
      ],
    },
  ],
};
