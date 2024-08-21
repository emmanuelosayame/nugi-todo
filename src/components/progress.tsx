import { useEffect, useState } from 'react';
import { Indicator, Root } from '@radix-ui/react-progress';

type Props = {
  className?: string;
  indicatorClassName?: string;
  value: number;
};

const Progress = ({ className, indicatorClassName, value }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Root
      className={`ProgressRoot relative overflow-hidden bg-black/20 border ${
        className || 'w-[300px] h-[25px] rounded-lg'
      }`}
      value={progress}>
      <Indicator
        className={`ProgressIndicator w-full h-full ${indicatorClassName || 'bg-white'}`}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Root>
  );
};

export default Progress;
