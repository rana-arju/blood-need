import { LoadingDrop } from "@/components/LoadingDrop";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <LoadingDrop />
      <h2 className="mt-4 text-xl font-semibold text-primary animate-pulse">
        Loading...
      </h2>
    </div>
  );
}
