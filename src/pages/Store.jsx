import { categories } from '../data/store';
import CategoryCard from '../components/CategoryCard';

const Store = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Store Categories</h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Browse our collection of curated items across various categories.
                    Each category is designed to bring you the best products that align with our mission of knowledge and discovery.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {categories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default Store;
