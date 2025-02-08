import { Droplet } from "lucide-react";

export default function AnimatedBloodDrops() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <Droplet
          key={i}
          className={`absolute text-red-500 opacity-20 animate-fall-${i + 1}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `-50px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}
