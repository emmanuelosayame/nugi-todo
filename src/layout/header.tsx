import { LoaderIcon, MenuIcon } from 'lucide-react';
import image from '../assets/profile.jpg';
import Search from '../components/search';
import { useNavigation } from 'react-router-dom';

function Header() {
  const navigation = useNavigation();

  return (
    <header
      className='bg-white w-full flex fixed md:absolute top-0 inset-x-0
     items-center gap-4 px-3 py-2.5 border-b'>
      {navigation.state === 'submitting' && (
        <p className='absolute hidden md:block top-4 center-x text-fgColor-muted'>
          Saving...
        </p>
      )}

      <div className='flex-1 flex items-center gap-5'>
        <div
          className='flex gap-2 items-center bg-primary-light/10 
        w-fit py-1 px-5 rounded-full '>
          <img
            src={image}
            className='size-7 rounded-full border object-contain'
          />
          <p className=''>LA</p>
        </div>

        {navigation.state === 'submitting' && (
          <LoaderIcon className='md:hidden size-5 text-black/60' />
        )}
      </div>

      <Search />
      <MenuIcon width={30} className='md:hidden' />
    </header>
  );
}

export default Header;
