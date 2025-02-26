"use client";

import { motion } from "framer-motion";

export default function BloodDropLoader() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-red-100 z-50">
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [-20, 0, -20] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <svg
            width="100"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-xl"
          >
            <defs>
              <linearGradient id="bloodGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="50%" stopColor="#FF0000" />
                <stop offset="100%" stopColor="#8B0000" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
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
              initial={{ pathLength: 0, fill: "none" }}
              animate={{ pathLength: 1, fill: "url(#bloodGradient)" }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </svg>
        </motion.div>
        <motion.div
          className="mt-4 text-2xl font-bold text-red-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Loading
        </motion.div>
        <motion.div className="flex space-x-2 mt-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full bg-red-600"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
