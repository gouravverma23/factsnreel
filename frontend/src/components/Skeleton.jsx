const Skeleton = ({ className, variant = 'rect' }) => {
    const baseClasses = "bg-dark-border/40 animate-pulse";
    const variantClasses = variant === 'circle' ? 'rounded-full' : 'rounded-lg';

    return (
        <div className={`${baseClasses} ${variantClasses} ${className}`} />
    );
};

export default Skeleton;
