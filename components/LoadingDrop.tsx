"use client";

import { motion } from "framer-motion";

export function LoadingDrop() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      {/* Main blood drop */}
      <motion.div
        className="w-8 h-8 bg-primary rounded-t-full relative"
        animate={{
          y: [0, 100],
          scaleY: [0.8, 1, 0.8],
          scaleX: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Ripple effect when drop hits bottom */}
        <motion.div
          className="absolute -bottom-1 left-1/2 w-2 h-2 bg-primary rounded-full"
          animate={{
            scale: [1, 0],
            opacity: [1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1,
          }}
        />
      </motion.div>
    </div>
  );
}
