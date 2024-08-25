import { useState } from 'react';
import { Todo } from '../../entities/todos';
import { useNavigate } from 'react-router-dom';
import Store from '../../store';
import { API } from '../../store/apiSlice';
import { sonner } from '../../components/toaster';
import { Content, Overlay, Root, Trigger } from '@radix-ui/react-dialog';
import { CircleEllipsisIcon, Trash2Icon } from 'lucide-react';
import { format } from 'date-fns';
import { Spinner } from '../../components/spinner';

const TodoOptions = ({ todo }: { todo: Todo }) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const deleteTodo = async () => {
    try {
      setLoading(true);
      await Store.dispatch(API.endpoints.deleteTodo.initiate(todo.id));
      setLoading(false);
      setTimeout(() => {
        navigate('/todos');
      }, 1200);
      sonner.success('Todo has been deleted');
    } catch (err) {
      setLoading(false);
      sonner.error('Failed TO delete Todo');
    }
  };

  return (
    <div className='relative'>
      <Root>
        <Trigger type='button'>
          <CircleEllipsisIcon size={27} className='' />
        </Trigger>
        <Overlay className=' bg-black/40 z-30 inset-0' />
        <Content
          className='absolute z-40 right-0 top-0 rounded-lg drop-shadow-sm border
           whitespace-nowrap bg-white backdrop-blur-md transition-all'>
          <div className='border-b p-2 font-normal'>
            <h5 className='text-sm text-fgColor-muted '>
              Created: {format(todo.createdAt, 'PPp')}
            </h5>
            <h5 className='text-sm text-fgColor-muted '>
              Last Updated: {format(todo.updatedAt, 'PPp')}
            </h5>
          </div>

          <button
            onClick={deleteTodo}
            type='button'
            className='flex items-center justify-between w-full font-normal
          gap-2 px-3 py-2 text-red-600'>
            {loading ? <Spinner /> : <span>Delete</span>}
            <Trash2Icon size={18} />
          </button>
        </Content>
      </Root>
    </div>
  );
};

export default TodoOptions;
