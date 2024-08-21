import { Outlet } from 'react-router-dom';
import Header from './header';
import SideBar from './SideBar';

function RootLayout() {
  return (
    <main
      className={`md:h-screen bg-white flex max-w-screen-[1400px] mx-auto w-full`}>
      <SideBar />
      <div
        className='md:w-[70%] w-full
       pt-20 min-h-screen h-full bg-bgColor-inset relative overflow-y-auto'>
        <Header />
        <Outlet />
      </div>
    </main>
  );
}

export default RootLayout;
