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
       pt-20 md:pt-16 min-h-screen h-full md:h-screen bg-bgColor-inset relative overflow-y-auto'>
        <Header />
        <div className='md:overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default RootLayout;
