import {
  createBrowserRouter,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router-dom';

import {authRoutes} from './auth/routes';
import RootRoute from './root';
import {todoRoutes} from './todo/routes';

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: RootRoute,
    children: [authRoutes, todoRoutes],
    ErrorBoundary: ErrorBoundary,
  },
]);

function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-center leading-none">
          <h1 className="font-mono text-2xl">{error.status}</h1>
          <a
            className="inline-block text-xl underline"
            href={`https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${error.status}`}
          >
            {error.statusText}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-center leading-none">
        <h1 className="text-2xl">Opps! Error</h1>
        <div className="text-xl">
          Something went wrong! Please try again later.
        </div>
      </div>
    </div>
  );
}
