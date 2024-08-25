import { useSearchParams } from 'react-router-dom';
import Progress from '../components/progress';
import { Filters } from '../entities/shared';

function SideBar() {
  let [searchParams, setSearchParams] = useSearchParams();
  const filter = (searchParams.get('filter') ?? 'all') as Filters;

  return (
    <div className='w-[10%] hidden md:block'>
      <h4 className='uppercase text-3xl font-semibold p-4'>Nugi Todo</h4>

      <div className='text-lg mt-10 border-t pt-5 flex flex-col gap-5'>
        <div className='flex flex-col gap-4 mb-10 w-1/3 mx-auto'>
          <button
            className={`py-1 rounded-[6px] transition-all ${
              filter === 'all' ? 'bg-[#0757ba] text-white' : ''
            }`}
            onClick={() => setSearchParams({ filter: 'all' })}>
            All
          </button>
          <button
            className={`py-1 rounded-[6px] transition-all ${
              filter === 'on-progress' ? 'bg-[#0757ba] text-white' : ''
            }`}
            onClick={() => setSearchParams({ filter: 'on-progress' })}>
            On Progress
          </button>
          <button
            className={`py-1 rounded-[6px] transition-all ${
              filter === 'completed' ? 'bg-[#0757ba] text-white' : ''
            }`}
            onClick={() => setSearchParams({ filter: 'completed' })}>
            Completed
          </button>
        </div>

        <div className='p-4 flex flex-col gap-5 text-xl'>
          <p>Todos In Progress: 100</p>
          <p>No of Completed Todo: 100</p>

          <div className='flex gap-4 items-center'>
            <p>Progress:</p>
            <Progress
              value={80}
              className='h-14 w-72 rounded-xl'
              indicatorClassName='bg-[#0244D0FD]'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
