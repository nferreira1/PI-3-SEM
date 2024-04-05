"use client";

import { MotionProps, motion } from "framer-motion";

const MotionDivDefault = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  exit = { opacity: 0 },
  transition = { duration: 0.3 },
  ...props
}: {
  children: React.ReactNode;
} & React.PropsWithChildren<
  MotionProps & React.HTMLAttributes<HTMLDivElement>
>) => {
  return (
    <motion.div
      layout
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MotionDivDefault;
