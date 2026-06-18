const ProductCard = ({ product }) => {
    return (
        <div className="bg-dark-surface rounded-xl overflow-hidden border border-dark-border flex flex-col h-full hover:border-dark-accent hover:shadow-neon transition-all duration-300 group relative">
            <div className="relative pt-[100%] bg-black/40 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="absolute top-0 left-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    loading="lazy"
                />
            </div>

            <div className="p-5 flex flex-col flex-grow relative z-10">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-dark-accent transition-colors">{product.title}</h3>
                {product.author && (
                    <p className="text-xs text-dark-muted mb-2 uppercase tracking-wider">by {product.author}</p>
                )}
                <p className="text-dark-muted text-sm mb-6 flex-grow line-clamp-3">{product.description}</p>

                <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2.5 rounded-lg border border-dark-border text-white font-semibold hover:bg-dark-accent hover:border-dark-accent hover:shadow-neon transition-all duration-300"
                >
                    Buy Now
                </a>
            </div>
        </div>
    );
};

export default ProductCard;
