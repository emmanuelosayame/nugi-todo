import { useLoaderData, useNavigate, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import {
  Check,
  ChevronLeftIcon,
  CircleEllipsisIcon,
  XIcon,
} from 'lucide-react';
import { Todo, todoMutatationS, TodoMutation } from '../entities/todos';

export default function TodoComponent() {
  const { todoId, todo } = useLoaderData() as {
    todo: Todo | null;
    todoId: string;
  };

  const isNew = todoId === 'new';

  const naivigate = useNavigate();

  const { register, handleSubmit, watch, setValue } = useForm<TodoMutation>({
    defaultValues: {
      title: todo?.title ?? '',
      isCompleted: todo?.isCompleted ?? false,
      todoId,
    },
    resolver: zodResolver(todoMutatationS),
  });

  const updatedAt = todo?.updatedAt ?? new Date();

  const isCompleted = watch().isCompleted;

  const submit = useSubmit();

  return (
    <form
      onSubmit={handleSubmit((data) =>
        submit(data, { method: isNew ? 'POST' : 'PUT' })
      )}
      className=''>
      <div className='flex justify-between w-full pr-3'>
        <button className='flex items-center' onClick={() => naivigate(-1)}>
          <ChevronLeftIcon size={35} />
          <p className='text-base'>Todos</p>
        </button>

        {!isNew && <TodoOptions />}
      </div>
      <div className='px-3 w-full flex flex-col gap-4 items-center'>
        <h5 className='text-sm text-neutral-500'>{format(updatedAt, 'PPp')}</h5>
        <textarea
          rows={5}
          {...register('title')}
          className='text-2xl rounded-[10px] py-3 px-5 w-full border'
          placeholder='Enter Title'
          autoFocus
        />

        <div className='w-full flex items-center justify-center gap-5'>
          <p className='text-lg'>Completed:</p>
          <button
            className={`rounded-[10px] p-1.5 ${
              isCompleted ? 'bg-green-500' : 'bg-white'
            }`}
            onClick={() => setValue('isCompleted', !isCompleted)}>
            {isCompleted ? (
              <Check size={30} className={`stroke-white`} />
            ) : (
              <XIcon size={30} className={`stroke-black`} />
            )}
          </button>
        </div>

        <button
          type='submit'
          className='flex justify-center items-center gap-3 bg-black text-white rounded-[10px]
       p-3 w-full'>
          Save
        </button>
      </div>
    </form>
  );
}

const TodoOptions = () => {
  return (
    <button>
      <CircleEllipsisIcon size={27} className='' />
    </button>
  );
};
