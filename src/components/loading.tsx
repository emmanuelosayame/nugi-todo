import { useNavigation } from 'react-router-dom';

export function Loading() {
  const navigation = useNavigation();
  const active = navigation.state === 'loading';

  return (
    active && (
      <div
        role='progressbar'
        aria-hidden={!active}
        aria-valuetext={'Loading'}
        className='fixed inset-x-0 top-0 z-50 h-1'>
        <style>
          {`
          @keyframes star {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100vw);
    }
}
          `}
        </style>
        <div
          className={`from-bgColor-transparent to-bgColor-accent-emphasis h-full w-20 animate-[star_1s_linear_infinite] rounded-full bg-gradient-to-r transition-all`}
        />
      </div>
    )
  );
}
