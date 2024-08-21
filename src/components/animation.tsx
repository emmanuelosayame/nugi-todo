import React from 'react';
import { motion } from 'framer-motion';
import type { AnimationProps } from 'framer-motion';

export function AnimatePage<P>(
  Component: React.ComponentType<P>,
  { initial, exit, animate, ...animateOptions }: AnimationProps = {
    initial: { opacity: 0 },
    exit: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.04 },
  }
) {
  const AnimatedComponent = (props: any) => {
    return (
      <motion.div
        initial={initial}
        exit={exit}
        animate={animate}
        {...animateOptions}
        className='h-full'>
        <Component {...props} />
      </motion.div>
    );
  };

  return AnimatedComponent;
}
