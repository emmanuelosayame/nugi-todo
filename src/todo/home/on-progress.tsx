import { OnProgressTodo } from '.';
import { Todo } from '../../entities/todos';

function OnProgress({ todos }: { todos: Todo[] }) {
  const notCompletedTodos = todos.filter((todo) => !todo.isCompleted);

  const count = notCompletedTodos.length;

  return (
    <div className='w-full pt-7'>
      <h4 className='text-lg text-center'>
        You have {notCompletedTodos.length} {count > 1 ? 'todos' : 'todo'} to be
        completed
      </h4>
      {/* <button className='text-fgColor-link'>View More</button> */}

      <div className='flex flex-col gap-5 overflow-x-auto px-5 pb-20 w-full mt-3'>
        {notCompletedTodos.map((todo) => (
          <OnProgressTodo todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  );
}

export default OnProgress;
