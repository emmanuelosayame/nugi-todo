import { Outlet } from 'react-router-dom';
import Header from './header';

function RootLayout() {
  return (
    <main className='pt-20 min-h-screen h-full'>
      <Header />
      <Outlet />
    </main>
  );
}

export default RootLayout;
