"use client";

import { motion } from "framer-motion";

export default function BloodDropLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-50 to-red-100">
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{
            y: [-20, 0, -20],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            y: {
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            rotate: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        >
          <svg
            width="80"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            <defs>
              <linearGradient id="bloodGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="50%" stopColor="#FF0000" />
                <stop offset="100%" stopColor="#8B0000" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <motion.path
              d="M12 2C12 2 5 10 5 14.5C5 18.09 8.13 21 12 21C15.87 21 19 18.09 19 14.5C19 10 12 2 12 2Z"
              fill="url(#bloodGradient)"
              stroke="#FF0000"
              strokeWidth="0.5"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>
        <motion.div
          className="w-3 h-3 rounded-full bg-red-600 mt-3"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.6, 1],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="text-red-700 font-bold mt-4 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Loading
        </motion.div>
      </motion.div>
    </div>
  );
}
