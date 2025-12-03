import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories, products } from '../data/store';
import ProductCard from '../components/ProductCard';

const CategoryDetails = () => {
    const { categoryId } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryId]);

    const category = categories.find(c => c.id === categoryId);
    const categoryProducts = products.filter(p => p.categoryId === categoryId);

    if (!category) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Category Not Found</h2>
                <Link to="/store" className="text-brand-yellow hover:underline">Back to Store</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <Link to="/store" className="text-gray-500 hover:text-brand-dark mb-4 inline-block">&larr; Back to Categories</Link>
                <h1 className="text-4xl font-bold text-brand-dark mb-4">{category.title}</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">{category.description}</p>
            </div>

            {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoryProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No products found in this category yet.</p>
                </div>
            )}
        </div>
    );
};

export default CategoryDetails;
