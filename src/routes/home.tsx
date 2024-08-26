import { API, useGetTodosQuery } from '../store/apiSlice';
import { Loading } from '../components/loading';
import { CheckCircleIcon, PlusIcon } from 'lucide-react';
import { Link, useSearchParams, useSubmit } from 'react-router-dom';
import AllTodos from '../components/all';
import { Todo, todoMutatationS } from '../entities/todos';
import { format } from 'date-fns';
import { ReactElement } from 'react';
import OnProgress from '../components/on-progress';
import Completed from '../components/completed';
import { AnimatePage } from '../components/animation';
import { Filters } from '../entities/shared';
import Store from '../store';
import { DTOToType, parseFormData } from '../utils/parser';

export async function action({ request }: any) {
  const formData =
    await parseFormData<DTOToType<typeof todoMutatationS>>(request);

  await Store.dispatch(API.endpoints.saveTodo.initiate(formData));

  return null;
}

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
        md:left-auto md:right-10 w-11/12 md:w-44 py-1.5'>
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
  const submit = useSubmit();

  const payload = {
    isCompleted: !todo.isCompleted,
    todoId: todo.id,
    title: todo.title,
  };

  const updateStatus = () => submit(payload, { method: 'PUT' });

  return (
    <div
      className='rounded-xl border border-border-muted bg-white px-5 py-2
      transition-all hover:opacity-75'>
      <div
        className={`${scrollDirection === 'vertical' ? '' : 'w-60 md:w-80'}`}>
        <div className='flex items-center justify-between w-full gap-3'>
          <Link
            to={`/todos/${todo.id}`}
            className='text-base whitespace-nowrap text-ellipsis flex-1'>
            {todo.title}
          </Link>

          <div>
            <button
              onClick={updateStatus}
              className='  hover:scale-90
             justify-center items-center rounded-full'>
              <CheckCircleIcon
                className={`${todo.isCompleted ? 'stroke-primary' : 'stroke-black/20'} size-6`}
              />
            </button>
          </div>
        </div>

        <div className='pt-1 border-t mt-1 font-normal'>
          <p className='text-[13px] font-normal text-neutral-600'>
            {format(todo.updatedAt, 'PPp')}
          </p>
        </div>
      </div>
    </div>
  );
};

export const CompletedTodo = ({ todo }: { todo: Todo }) => {
  const submit = useSubmit();

  const payload = {
    isCompleted: false,
    todoId: todo.id,
    title: todo.title,
  };

  const updateStatus = () => submit(payload, { method: 'PUT' });

  return (
    <div
      className='rounded-xl border border-border-muted bg-white px-5 py-2
      transition-all hover:opacity-75'>
      <div className='flex'>
        <Link
          to={`/todos/${todo.id}`}
          className='text-base whitespace-nowrap text-ellipsis flex-1 line-through'>
          {todo.title}
        </Link>

        <div>
          <button
            onClick={updateStatus}
            className='  hover:scale-90
             justify-center items-center rounded-full'>
            <CheckCircleIcon
              className={`${todo.isCompleted ? 'stroke-primary' : 'stroke-black/20'} size-6`}
            />
          </button>
        </div>
      </div>
      <div className='pt-1 border-t mt-1 font-normal'>
        <p className='text-[13px] font-normal text-neutral-600'>
          {format(todo.updatedAt, 'PPp')}
        </p>
      </div>
    </div>
  );
};

export const Component = AnimatePage(Home);
