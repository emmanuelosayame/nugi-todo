import { Content, Overlay, Root, Trigger } from '@radix-ui/react-dialog';
import { SearchIcon, XIcon } from 'lucide-react';
import { useGetTodosQuery } from '../store/apiSlice';
import { Loading } from '../components/loading';
import { useState } from 'react';
import { debounce, searchOnKeys } from '../utils/helpers';

const Search = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetTodosQuery(undefined, {});

  const allTodos = [...(data?.data ?? [])].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const [keyword, setKeyword] = useState<string>();

  const hitItems = searchOnKeys(allTodos, ['title'], keyword, allTodos);

  if (isLoading) return <Loading />;

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger
        className='md:mr-10 w-[40%] md:w-1/5 rounded-xl border hover:opacity-65 transition-all
       flex py-1.5 pl-3 pr-2 justify-between'>
        <span className='text-sm text-fgColor-muted font-normal'>
          Search Todo
        </span>
        <SearchIcon className='size-4' />
      </Trigger>
      <Overlay className=' bg-black/40 z-30 inset-0 fixed backdrop-blur-sm' />
      <Content
        className='fixed z-50 inset-x-4 rounded-xl h-[50vh]
         max-w-lg md:center-x md:center-y bg-white backdrop-blur-md transition-all pt-5 pb-2 px-3'>
        <div className='flex gap-3'>
          <div className='relative flex-1 h-fit'>
            <input
              placeholder='Search Todo'
              className='bg-black/5 w-full px-3 py-1 rounded-xl border text-base'
              onChange={debounce((e) => {
                setKeyword(e.target.value);
              }, 800)}
            />
            <SearchIcon className='size-4 absolute center-y right-3' />
          </div>
          <div className='flex justify-end p-1 mb-2'>
            <Trigger className=''>
              <XIcon size={24} />
            </Trigger>
          </div>
        </div>

        <div className='flex flex-col overflow-y-auto h-[85%] mt-2 pt-5'>
          {hitItems.map((todo) => (
            <div
              key={todo.id}
              className='py-3 px-4 border-t font-normal transition-all
              hover:bg-black/5 cursor-pointer'
              onClick={() => {
                setOpen(false);
              }}>
              <p>{todo.title}</p>
            </div>
          ))}
        </div>
      </Content>
    </Root>
  );
};

export default Search;
