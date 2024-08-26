import { Link } from 'react-router-dom';
import { CompletedTodo, OnProgressTodo } from '../routes/home';
import { Todo } from '../entities/todos';

function AllTodos({ todos }: { todos: Todo[] }) {
  const completedTodos = todos.filter((todo) => !!todo.isCompleted);
  const notCompletedTodos = todos.filter((todo) => !todo.isCompleted);

  return (
    <>
      <div className='w-full'>
        {notCompletedTodos.length > 0 && (
          <div className='flex justify-between items-center px-5 mt-4'>
            <h4 className='text-lg'>
              On Progress{' '}
              <span className='font-normal text-neutral-600'>
                ({notCompletedTodos.length})
              </span>
            </h4>
            <Link
              replace
              to={'/todos?filter=on-progress'}
              className='text-fgColor-link transition-all hover:scale-90'>
              View All
            </Link>
          </div>
        )}

        <div className='flex gap-5 overflow-x-auto px-5 w-full mt-3'>
          {notCompletedTodos.slice(0, 5).map((todo) => (
            <OnProgressTodo
              todo={todo}
              key={todo.id}
              scrollDirection='horizontal'
            />
          ))}
        </div>

        <div className='flex justify-between items-center px-5 mt-14'>
          <h4 className='text-lg'>
            Completed{' '}
            <span className='font-normal text-neutral-600'>
              ({completedTodos.length})
            </span>
          </h4>
          <Link
            replace
            to={'/todos?filter=completed'}
            className='text-fgColor-link transition-all hover:scale-90'>
            View All
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 overflow-x-auto px-5 pb-20 w-full mt-3'>
          {completedTodos.slice(0, 5).map((todo) => (
            <CompletedTodo todo={todo} key={todo.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default AllTodos;
