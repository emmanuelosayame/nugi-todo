import { MenuIcon } from 'lucide-react';
import image from '../assets/profile.jpg';
import Search from '../components/search';

function Header() {
  return (
    <header
      className='bg-white w-full flex fixed md:absolute top-0 inset-x-0
     items-center gap-4 px-3 py-2.5 border-b'>
      {/* <h4 className='text-lg font-semibold'>Nugi</h4> */}

      <div className=' flex-1'>
        <div
          className='flex gap-2 items-center bg-primary-light/10 
        w-fit py-1 px-5 rounded-full '>
          <img
            src={image}
            className='size-7 rounded-full border object-contain'
          />
          <p className=''>LA</p>
        </div>
      </div>

      <Search />
      <MenuIcon width={30} className='md:hidden' />
    </header>
  );
}

export default Header;
