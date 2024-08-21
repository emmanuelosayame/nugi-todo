import {
  Content,
  Overlay,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-dialog';
import { SearchIcon, XIcon } from 'lucide-react';
import { useGetTodosQuery } from '../store/apiSlice';
import { Loading } from '../components/loading';
import { useState } from 'react';
import Fuse from 'fuse.js';
import { debounce } from 'lodash';

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
          className='fixed z-40 inset-x-4 top-10 rounded-lg h-[80vh]
                       bg-white backdrop-blur-md transition-all py-2 px-3'>
          <div className='flex justify-end p-1 mb-2'>
            <Trigger>
              <XIcon size={24} />
            </Trigger>
          </div>
          <input
            placeholder='Search Todo'
            className='bg-black/5 w-full p-3 rounded-lg border text-base'
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

export default Search;
