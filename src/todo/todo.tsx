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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm<TodoMutation>({
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
        <button
          type='button'
          className='flex items-center'
          onClick={() => naivigate(-1)}>
          <ChevronLeftIcon size={35} />
          <p className='text-base'>Todos</p>
        </button>

        {!isNew && <TodoOptions />}
      </div>
      <div className='px-3 w-full flex flex-col gap-4 items-center'>
        <h5 className='text-sm text-fgColor-muted'>
          {format(updatedAt, 'PPp')}
        </h5>
        <textarea
          rows={5}
          {...register('title')}
          className='text-2xl rounded-lg py-3 px-5 w-full border font-medium'
          placeholder='Enter Title'
          autoFocus
        />

        <div className='w-full flex items-center justify-center gap-5'>
          <p className='text-lg'>Completed:</p>
          <button
            type='button'
            className={`rounded-[6px] py-1 px-4 shadow border ${
              isCompleted ? 'bg-green-500 border -green-500' : ''
            }`}
            onClick={() =>
              setValue('isCompleted', !isCompleted, { shouldDirty: true })
            }>
            {isCompleted ? (
              <Check size={25} className={`stroke-white`} />
            ) : (
              <XIcon size={25} className={`stroke-black`} />
            )}
          </button>
        </div>

        <button disabled={!isDirty} type='submit' className='button w-full'>
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
