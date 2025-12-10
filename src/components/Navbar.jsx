import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-dark-bg/80 backdrop-blur-md text-dark-text sticky top-0 z-50 border-b border-dark-border shadow-glass">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-dark-accent hover:text-white transition-colors duration-300 tracking-tighter hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">
                    FactsnReel
                </Link>

                {/* Desktop Menu */}
                <div className="space-x-8 hidden md:flex items-center">
                    <Link to="/" className="hover:text-dark-accent transition-colors duration-300 text-sm font-medium tracking-wide uppercase">Home</Link>
                    <Link to="/posts" className="hover:text-dark-accent transition-colors duration-300 text-sm font-medium tracking-wide uppercase">Posts</Link>
                    <Link to="/store" className="hover:text-dark-accent transition-colors duration-300 text-sm font-medium tracking-wide uppercase">Store</Link>
                    <a href="#contact" className="px-5 py-2 rounded-full border border-dark-accent text-dark-accent hover:bg-dark-accent hover:text-white transition-all duration-300 text-sm font-bold shadow-neon hover:shadow-neon-strong">
                        Contact
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-dark-accent focus:outline-none hover:text-white transition-colors"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col space-y-4 px-4 py-6 bg-dark-surface border-t border-dark-border">
                    <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-dark-accent transition-colors duration-300">Home</Link>
                    <Link to="/posts" onClick={() => setIsOpen(false)} className="hover:text-dark-accent transition-colors duration-300">Posts</Link>
                    <Link to="/store" onClick={() => setIsOpen(false)} className="hover:text-dark-accent transition-colors duration-300">Store</Link>
                    <a href="#contact" onClick={() => setIsOpen(false)} className="text-dark-accent font-bold">Contact Us</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
