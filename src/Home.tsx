import { format } from 'date-fns';
import Header from './components/Header';
import { useGetTodosQuery } from './store/apiSlice';
import { Todo } from './types/todo';
import { Loading } from './components/Loading';
import { CheckCircleIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  const { data, isLoading } = useGetTodosQuery(undefined);

  const todos = [...(data?.data ?? [])].sort(
    (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
  );

  const completedTodos = todos.filter((todo) => !!todo.isCompleted);
  const notCompletedTodos = todos.filter((todo) => !todo.isCompleted);

  if (isLoading) return <Loading />;

  return (
    <main className='pt-20'>
      <Header />

      <div className='w-full mt-4'>
        <div className='flex justify-between items-center px-5'>
          <h4 className='text-lg'>
            On Progress{' '}
            <span className='font-normal text-neutral-600'>
              ({notCompletedTodos.length})
            </span>
          </h4>
          {/* <button className='text-fgColor-link'>View More</button> */}
        </div>

        <div className='flex gap-5 overflow-x-auto px-5 w-full mt-3'>
          {notCompletedTodos.map((todo) => (
            <OnProgressTodo todo={todo} key={todo.id} />
          ))}
        </div>

        <div className='flex justify-between items-center px-5 mt-14'>
          <h4 className='text-lg'>
            Completed{' '}
            <span className='font-normal text-neutral-600'>
              ({completedTodos.length})
            </span>
          </h4>
          {/* <button className='text-fgColor-link'>View More</button> */}
        </div>

        <div className='flex flex-col gap-5 overflow-x-auto px-5 pb-20 w-full mt-3'>
          {completedTodos.map((todo) => (
            <CompletedTodo todo={todo} key={todo.id} />
          ))}
        </div>
      </div>

      <Link
        to={'/new'}
        className='flex justify-center items-center gap-3 fixed bottom-4 bg-black text-white rounded-xl
       p-3 center-x w-11/12'>
        <PlusIcon width={30} />
        <p>Create New</p>
      </Link>
    </main>
  );
}

const OnProgressTodo = ({ todo }: { todo: Todo }) => {
  return (
    <div className='bg-white rounded-xl p-4'>
      <div className='w-56'>
        <h6 className='text-lg whitespace-nowrap text-ellipsis'>
          {todo.title}
        </h6>

        <div className='pt-3 border-t mt-2 font-normal'>
          <p className='text-[15px] font-normal text-neutral-600'>
            {format(todo.updatedAt, 'PPp')}
          </p>
        </div>
      </div>
    </div>
  );
};

const CompletedTodo = ({ todo }: { todo: Todo }) => {
  return (
    <div className='bg-white rounded-xl p-4'>
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
    </div>
  );
};

export default Home;
