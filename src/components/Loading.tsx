const SkeletonLine: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={`bg-gray-200 dark:bg-space-800 rounded animate-pulse ${className}`}
  />
);

const Loading: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <SkeletonLine className="h-3 w-16" />
            <SkeletonLine className="h-3 w-24" />
          </div>
          <SkeletonLine className="h-6 w-3/4" />
          <SkeletonLine className="h-4 w-full" />
          <SkeletonLine className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
};

export default Loading;
