import { CompletedTodo, OnProgressTodo } from '.';
import { Todo } from '../../entities/todos';

function AllTodos({ todos }: { todos: Todo[] }) {
  const completedTodos = todos.filter((todo) => !!todo.isCompleted);
  const notCompletedTodos = todos.filter((todo) => !todo.isCompleted);

  return (
    <>
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
          {/* <button className='text-fgColor-link'>View More</button> */}
        </div>

        <div className='flex flex-col gap-5 overflow-x-auto px-5 pb-20 w-full mt-3'>
          {completedTodos.map((todo) => (
            <CompletedTodo todo={todo} key={todo.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default AllTodos;
