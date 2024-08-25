import { MenuIcon } from 'lucide-react';
import image from '../assets/profile.jpg';
import Search from '../components/search';

function Header() {
  return (
    <header
      className='bg-white w-full flex fixed md:absolute top-0 inset-x-0
     items-center gap-4 px-3 py-2.5 border-b'>
      {/* <h4 className='text-lg font-semibold'>Nugi</h4> */}

      <div className='flex items-center flex-1 gap-2'>
        <img
          src={image}
          className='w-10 h-10 rounded-full border object-contain'
        />
        <div className='leading-3 font-normal text-black/80'>
          <h5 className='text-[17px]'>Hello,</h5>
          <p className='text-lg'>Emmanuel</p>
        </div>
      </div>

      <Search />
      <MenuIcon width={30} className='md:hidden' />
    </header>
  );
}

export default Header;
