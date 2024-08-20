import {
  Content,
  Overlay,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-dialog';
import { Menu, SearchIcon, UserCircle2Icon, XIcon } from 'lucide-react';
import { useGetTodosQuery } from '../store/apiSlice';
import { Loading } from '../components/loading';
import { useState } from 'react';
import Fuse from 'fuse.js';
import { debounce } from 'lodash';

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

      <Search />
      <Menu width={30} className='' />
    </header>
  );
}

const Search = () => {
  const { data, isLoading } = useGetTodosQuery(undefined, {});

  const allTodos = [...(data?.data ?? [])].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const [keyword, setKeyword] = useState<string>();

  const fuse = new Fuse(allTodos, { keys: ['title'] });
  const hitItems = keyword
    ? fuse.search(keyword).map((hit) => hit.item)
    : allTodos;

  if (isLoading) return <Loading />;

  return (
    <Root>
      <Trigger>
        <SearchIcon size={20} />
      </Trigger>
      <Portal>
        <Overlay className=' bg-black/40 z-30 inset-0 fixed backdrop-blur-sm' />
        <Content
          className='fixed z-40 inset-x-4 top-10 rounded-[10px] h-[80vh]
                       bg-white backdrop-blur-md transition-all py-2 px-3'>
          <div className='flex justify-end p-1 mb-2'>
            <Trigger>
              <XIcon size={24} />
            </Trigger>
          </div>
          <input
            placeholder='Search Todo'
            className='bg-black/5 w-full p-3 rounded-[10px] border text-base'
            onChange={debounce((e) => {
              setKeyword(e.target.value);
            }, 800)}
          />

          <div className='flex flex-col gap-3 overflow-y-auto h-[83%] mt-2 pt-5'>
            {hitItems.map((todo) => (
              <div key={todo.id} className='py-3 px-4 text-lg border-t'>
                <p>{todo.title}</p>
              </div>
            ))}
          </div>
        </Content>
      </Portal>
    </Root>
  );
};

export default Header;
