import {
  createBrowserRouter,
  isRouteErrorResponse,
  Outlet,
  redirect,
  ScrollRestoration,
  useRouteError,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './store';
import { Loading } from './components/loading';
import { todoRoutes } from './todo/routes';

function RootRoute() {
  // const {user} = useLoaderData() as {user: Promise<User | null>};
  return (
    <Provider store={Store}>
      <Loading />
      <Outlet />
      <ScrollRestoration />
    </Provider>
  );
}

function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className='flex flex-1 flex-col justify-center '>
        <div className='text-center leading-none'>
          <h1 className='font-mono text-[25vw]'>{error.status}</h1>
          <a
            className='inline-block text-[8vw] underline'
            href={`https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${error.status}`}>
            {error.statusText}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-1 flex-col justify-center'>
      <div className='text-center leading-none'>
        <h1 className='text-[25vw]'>Error</h1>
        <div className='text-3xl'>
          Something went wrong! Please try again later.
        </div>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: RootRoute,
    loader: () => null,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        index: true,
        loader: async () => {
          // await requireAnonymous();
          return redirect('/todos');
        },
      },
      todoRoutes,
      // authRoutes,
      // businessSetupRoutes,
      // businessRoutes,
    ],
  },
]);
