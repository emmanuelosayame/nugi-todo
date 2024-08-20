import {
  ActionFunctionArgs,
  useNavigate,
  useParams,
  useSubmit,
} from 'react-router-dom';
// import { useGetTodoQuery } from '../store/apiSlice';
// import { Loading } from '../components/loading';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ChevronLeftIcon, CircleEllipsisIcon } from 'lucide-react';
import { DTOToType, parseFormData } from '../utils/parser';
import Store from '../store';
import { API } from '../store/apiSlice';

export async function action({ request }: ActionFunctionArgs) {
  const formData =
    await parseFormData<DTOToType<typeof todoMutatationS>>(request);

  await Store.dispatch(API.endpoints.saveTodo.initiate(formData));

  return null;
}

const todoMutatationS = z.object({
  title: z.string().min(1, 'required'),
  isCompleted: z.boolean(),
  todoId: z.string(),
});

export type TodoMutation = z.infer<typeof todoMutatationS>;

export default function TodoComponent() {
  const { todoId } = useParams();
  const isNew = todoId === 'new';

  const naivigate = useNavigate();

  // const { data, isLoading } = useGetTodoQuery(todoId!);
  // const todo = data?.data!;

  const { register, handleSubmit } = useForm<TodoMutation>({
    defaultValues: {
      title: '',
      isCompleted: false,
      todoId,
    },
    resolver: zodResolver(todoMutatationS),
  });

  const updatedAt = new Date();

  const submit = useSubmit();

  // if (isLoading) return <Loading />;

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
          className='text-xl rounded-xl py-3 px-5 w-full border'
          placeholder='Enter Title'
          autoFocus
        />

        <button
          className='flex justify-center items-center gap-3 bg-black text-white rounded-xl
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
