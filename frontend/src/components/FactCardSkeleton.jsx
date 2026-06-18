import Skeleton from './Skeleton';

const FactCardSkeleton = () => {
    return (
        <div className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden shadow-2xl relative w-full">
            {/* Image Section Skeleton */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <Skeleton className="w-full h-full rounded-none" />
                <div className="absolute bottom-4 left-6">
                    <Skeleton className="h-6 w-24 rounded-full" />
                </div>
            </div>

            {/* Content Section Skeleton */}
            <div className="p-6 md:p-8 -mt-6 relative z-10">
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-10 w-4/5 mb-6" />

                <div className="w-16 h-1 bg-dark-border/40 rounded-full mb-6" />

                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>

                <div className="mt-8 pt-6 border-t border-dark-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                    </div>
                    <Skeleton className="h-12 w-full md:w-48 rounded-xl" />
                </div>
            </div>
        </div>
    );
};

export default FactCardSkeleton;
