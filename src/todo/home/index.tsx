import { useGetTodosQuery } from '../../store/apiSlice';
import { Loading } from '../../components/loading';
import { CheckCircleIcon, PlusIcon } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import AllTodos from './all';
import { Todo } from '../../entities/todos';
import { format } from 'date-fns';
import { ReactElement } from 'react';
import OnProgress from './on-progress';
import Completed from './completed';
import { AnimatePage } from '../../components/animation';
import { Filters } from '../../entities/shared';

export function Home() {
  let [searchParams, setSearchParams] = useSearchParams();
  const filter = (searchParams.get('filter') ?? 'all') as Filters;

  const { data, isLoading } = useGetTodosQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const todos = [...(data?.data ?? [])].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const renderScreen: { [key in Filters]: ReactElement } = {
    'all': <AllTodos todos={todos} />,
    'on-progress': <OnProgress todos={todos} />,
    'completed': <Completed todos={todos} />,
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <div className='flex px-4 items-center gap-4 md:w-1/2 md:hidden'>
        <button
          className={`py-1 w-full transition-all ${
            filter === 'all' ? 'bg-[#0757ba] text-white rounded-md' : ''
          }`}
          onClick={() => setSearchParams({ filter: 'all' })}>
          All
        </button>
        <button
          className={`py-1 w-full transition-all ${
            filter === 'on-progress' ? 'bg-[#0757ba] text-white rounded-md' : ''
          }`}
          onClick={() => setSearchParams({ filter: 'on-progress' })}>
          On Progress
        </button>
        <button
          className={`py-1 w-full transition-all ${
            filter === 'completed' ? 'bg-[#0757ba] text-white rounded-md' : ''
          }`}
          onClick={() => setSearchParams({ filter: 'completed' })}>
          Completed
        </button>
      </div>

      {renderScreen[filter]}

      <Link
        to={'/todos/new'}
        className='button fixed bottom-4 md:bottom-20 center-x 
        md:left-auto md:right-10 w-11/12 md:w-44 md:py-1.5'>
        <PlusIcon width={30} />
        <p>Create New</p>
      </Link>
    </>
  );
}

export const OnProgressTodo = ({
  todo,
  scrollDirection = 'vertical',
}: {
  todo: Todo;
  scrollDirection?: 'horizontal' | 'vertical';
}) => {
  return (
    <Link
      to={`/todos/${todo.id}`}
      className='rounded-xl border border-border-muted bg-white px-5 py-2
      transition-all hover:opacity-65 hover:scale-95'>
      <div className={`${scrollDirection === 'vertical' ? '' : 'w-56'}`}>
        <h6 className='text-lg whitespace-nowrap text-ellipsis'>
          {todo.title}
        </h6>

        <div className='pt-1 border-t mt-1 font-normal'>
          <p className='text-[15px] font-normal text-neutral-600'>
            {format(todo.updatedAt, 'PPp')}
          </p>
        </div>
      </div>
    </Link>
  );
};

export const CompletedTodo = ({ todo }: { todo: Todo }) => {
  return (
    <Link
      to={`/todos/${todo.id}`}
      className='rounded-xl border border-border-muted bg-white px-5 py-2
      transition-all hover:opacity-65 hover:scale-95'>
      <div className='flex '>
        <h6 className='text-lg whitespace-nowrap text-ellipsis flex-1 line-through'>
          {todo.title}
        </h6>

        <CheckCircleIcon className='stroke-primary' width={20} />
      </div>
      <div className='pt-1 border-t mt-1 font-normal'>
        <p className='text-sm font-normal text-neutral-600'>
          {format(todo.updatedAt, 'PPp')}
        </p>
      </div>
    </Link>
  );
};

export const Component = AnimatePage(Home);
