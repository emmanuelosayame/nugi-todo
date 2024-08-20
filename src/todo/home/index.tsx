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

type Filters = 'all' | 'on-progress' | 'completed';

export function Component() {
  let [searchParams, setSearchParams] = useSearchParams();
  const filter = (searchParams.get('filter') ?? 'all') as Filters;

  const { data, isLoading } = useGetTodosQuery(undefined);

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
      <div className='flex px-4 items-center gap-4'>
        <button
          className={`rounded-xl py-2.5 px-6 ${
            filter === 'all' ? 'bg-black text-white' : 'bg-white'
          }`}
          onClick={() => setSearchParams({ filter: 'all' })}>
          All
        </button>
        <button
          className={`rounded-xl py-2.5 px-6 ${
            filter === 'on-progress' ? 'bg-black text-white' : 'bg-white'
          }`}
          onClick={() => setSearchParams({ filter: 'on-progress' })}>
          On Progress
        </button>
        <button
          className={`rounded-xl py-2.5 px-6 ${
            filter === 'completed' ? 'bg-black text-white' : 'bg-white'
          }`}
          onClick={() => setSearchParams({ filter: 'completed' })}>
          Completed
        </button>
      </div>

      {renderScreen[filter]}

      <Link
        to={'/todos/new'}
        className='flex justify-center items-center gap-3 fixed bottom-4 bg-black text-white rounded-xl
       p-3 center-x w-11/12'>
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
    <Link to={`/todos/${todo.id}`} className='bg-white rounded-xl p-4'>
      <div className={`${scrollDirection === 'vertical' ? '' : 'w-56'}`}>
        <h6 className='text-lg whitespace-nowrap text-ellipsis'>
          {todo.title}
        </h6>

        <div className='pt-3 border-t mt-2 font-normal'>
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
    <Link to={`/todos/${todo.id}`} className='bg-white rounded-xl p-4'>
      <div className='flex '>
        <h6 className='text-lg whitespace-nowrap text-ellipsis flex-1 line-through'>
          {todo.title}
        </h6>

        <CheckCircleIcon className='stroke-green-500' width={20} />
      </div>
      <div className='pt-3 border-t mt-2 font-normal'>
        <p className='text-sm font-normal text-neutral-600'>
          {format(todo.updatedAt, 'PPp')}
        </p>
      </div>
    </Link>
  );
};
