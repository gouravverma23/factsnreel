import { Link } from 'react-router-dom';

const CategoryCard = ({ category, variant = 'default' }) => {
    if (variant === 'text') {
        return (
            <Link
                to={`/store/${category.id}`}
                className="block group relative overflow-hidden rounded-lg bg-dark-surface border border-dark-border hover:border-dark-accent hover:shadow-neon transition-all duration-300"
            >
                <div className="p-6 flex items-center justify-center h-full min-h-[100px]">
                    <h3 className="text-lg font-bold text-white group-hover:text-dark-accent transition-colors tracking-wide text-center">
                        {category.title}
                    </h3>
                </div>
            </Link>
        );
    }

    return (
        <Link to={`/store/${category.id}`} className="block group relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-dark-surface border border-dark-border transition-all duration-300 group-hover:border-dark-accent group-hover:shadow-neon z-0 rounded-lg" />

            <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-t-lg m-0.5">
                <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-90" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-dark-accent transition-colors tracking-wide">{category.title}</h3>
                <div className="h-0.5 w-0 bg-dark-accent group-hover:w-8 transition-all duration-300 ease-out" />
            </div>
        </Link>
    );
};

export default CategoryCard;
