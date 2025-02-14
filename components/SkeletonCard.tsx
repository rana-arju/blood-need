export default function SkeletonCard() {
  return (
    <div className="border rounded-lg p-4 shadow-sm animate-pulse">
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
}
