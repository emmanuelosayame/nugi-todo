import { CompletedTodo } from '.';
import { Todo } from '../../entities/todos';

function Completed({ todos }: { todos: Todo[] }) {
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  const count = completedTodos.length;

  return (
    <div className='w-full pt-7'>
      <h4 className='text-lg text-center'>
        {count} {count > 1 ? 'todos' : 'todo'} completed 🤩
      </h4>
      {/* <button className='text-fgColor-link'>View More</button> */}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 overflow-x-auto px-5 pb-20 w-full mt-3'>
        {completedTodos.map((todo) => (
          <CompletedTodo todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  );
}

export default Completed;
