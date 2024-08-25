import { Outlet } from 'react-router-dom';
import Header from './header';
import SideBar from './sidebar';

function RootLayout() {
  return (
    <main
      className={`md:h-screen bg-white flex max-w-screen-[1400px] mx-auto w-full`}>
      <SideBar />
      <div
        className='md:w-[90%] w-full
       pt-20 md:pt-16 min-h-screen h-full bg-bgColor-inset relative overflow-y-auto'>
        <Header />
        <Outlet />
      </div>
    </main>
  );
}

export default RootLayout;
