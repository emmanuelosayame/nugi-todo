import { Menu, Search, UserCircle2Icon } from 'lucide-react';

function Header() {
  return (
    <header
      className='bg-white w-full flex fixed top-0 inset-x-0
     items-center gap-4 px-3 py-2.5 border-b'>
      {/* <h4 className='text-lg font-semibold'>Nugi</h4> */}

      <div className='flex items-center flex-1'>
        <UserCircle2Icon width={50} />
        <div className='leading-4'>
          <h5 className='text-lg'>Hello,</h5>
          <p className='text-[17px]'>Emmanuel</p>
        </div>
      </div>

      <Search width={30} />
      <Menu width={30} className='' />
    </header>
  );
}

export default Header;
