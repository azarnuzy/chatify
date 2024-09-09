// SkeletonLoader.tsx
const SkeletonLoader = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* Repeating Skeleton Bubble */}
      {[...Array(1)].map((_, index) => (
        <div key={index} className="flex justify-start gap-3">
          <div className="relative p-2 rounded-xl max-w-[70%] sm:max-w-[80%] bg-white dark:bg-gray-700 animate-pulse shadow-xl w-full">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1 w-[90%]"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-1 w-[85%]"></div>
            <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-[80%]"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
