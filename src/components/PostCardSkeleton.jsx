import Skeleton from './Skeleton';

const PostCardSkeleton = () => {
    return (
        <div className="relative overflow-hidden rounded-xl aspect-[4/3] w-full bg-dark-surface border border-dark-border p-6 flex flex-col justify-end gap-2">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <div className="mt-4 h-1 w-full bg-dark-border/40" />
        </div>
    );
};

export default PostCardSkeleton;
