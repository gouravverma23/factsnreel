import useScrollAnimation from '../hooks/useScrollAnimation';
import useActiveCard from '../hooks/useActiveCard';

const PostCard = ({ post, onClick }) => {
    const [scrollRef, isVisible] = useScrollAnimation();
    const [activeRef, isActive] = useActiveCard();

    // Merge refs
    const setRefs = (node) => {
        scrollRef.current = node;
        activeRef.current = node;
    };

    return (
        <div
            ref={setRefs}
            onClick={() => onClick && onClick(post)}
            className={`relative group overflow-hidden rounded-xl aspect-[4/3] w-full cursor-pointer shadow-lg transition-all duration-500 hover-scale fade-in-up 
                ${isVisible ? 'visible' : ''} 
                ${isActive ? 'shadow-neon scale-[1.02]' : 'hover:shadow-neon'}`}
        >
            {/* Full Background Image */}
            <img
                src={post.image}
                alt={post.title}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 
                    ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                loading="lazy"
            />

            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 
                ${isActive ? 'opacity-90' : 'opacity-80 group-hover:opacity-90'}`} />

            {/* Content */}
            <div className={`absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-300 
                ${isActive ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>
                <h3 className={`text-2xl font-bold text-white mb-2 drop-shadow-md transition-colors duration-300 
                    ${isActive ? 'text-dark-accent' : 'group-hover:text-dark-accent'}`}>
                    {post.title}
                </h3>
                <p className={`text-gray-300 text-sm line-clamp-2 transition-opacity duration-300 delay-100 
                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {post.description}
                </p>
                <div className={`mt-4 h-1 bg-dark-accent transition-all duration-500 ease-out 
                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </div>
        </div>
    );
};

export default PostCard;
