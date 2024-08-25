import { useSearchParams } from 'react-router-dom';
import Progress from '../components/progress';
import { Filters } from '../entities/shared';
import { useGetTodosQuery } from '../store/apiSlice';
import {
  CheckCheck,
  CircleDotDashed,
  CogIcon,
  LoaderIcon,
  LogOutIcon,
} from 'lucide-react';

function SideBar() {
  let [searchParams, setSearchParams] = useSearchParams();
  const filter = (searchParams.get('filter') ?? 'all') as Filters;

  const { data } = useGetTodosQuery(undefined, {});
  const allTodos = data?.data || [];

  const completedTodos = allTodos.filter((todo) => todo.isCompleted);

  return (
    <div className='w-[10%] hidden md:flex h-full flex-col'>
      <h4 className='uppercase text-xl font-bold p-3.5 w-full text-center text-[#0757ba]'>
        Nugi Todo
      </h4>
      <div className='flex-1 border-r'>
        <div className='border-t px-4 pt-5 flex flex-col gap-5'>
          <div className='flex flex-col gap-4 mb-10 w-full'>
            <button
              className={`py-1 w-full flex gap-6 justify-center rounded-[5px]
              transition-all hover:opacity-65 hover:scale-95 ${
                filter === 'all'
                  ? 'bg-[#0757ba] hover:opacity-95 text-white'
                  : 'hover:bg-[#0757ba]/10'
              }`}
              onClick={() => setSearchParams({ filter: 'all' })}>
              <span>All</span>
              <CircleDotDashed className='size-5' />
            </button>
            <button
              className={`py-1 w-full flex gap-3 justify-center rounded-[5px]
              transition-all hover:opacity-65 hover:scale-95 ${
                filter === 'on-progress'
                  ? 'bg-[#0757ba] hover:opacity-95 text-white'
                  : 'hover:bg-[#0757ba]/10'
              }`}
              onClick={() => setSearchParams({ filter: 'on-progress' })}>
              <span>On Progress</span>
              <LoaderIcon className='size-5' />
            </button>
            <button
              className={`py-1 w-full flex gap-3 justify-center rounded-[5px]
              transition-all hover:opacity-65 hover:scale-95 ${
                filter === 'completed'
                  ? 'bg-[#0757ba] hover:opacity-95 text-white'
                  : 'hover:bg-[#0757ba]/10'
              }`}
              onClick={() => setSearchParams({ filter: 'completed' })}>
              <span>Completed</span>
              <CheckCheck className='size-5' />
            </button>
          </div>

          <div className='p-1 flex flex-col gap-1 font-normal mt-10'>
            <h5 className='text-center text-bgColor-muted border-b'>
              Overview
            </h5>
            <p className='pt-1'>
              Completed: {completedTodos.length} / {allTodos.length}
            </p>

            <div className='flex gap-4 items-center'>
              <Progress
                value={80}
                className='h-3 w-11/12 rounded-xl'
                indicatorClassName='bg-progress-gradient'
              />
            </div>
          </div>

          <div className='mt-40 border-t pt-3 flex flex-col gap-5'>
            <button className='flex w-full items-center gap-3 justify-center'>
              <span>Settings</span>
              <CogIcon className='size-5' />
            </button>

            <button className='flex w-full items-center gap-3 justify-center'>
              <span>Sign Out</span>
              <LogOutIcon className='size-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
