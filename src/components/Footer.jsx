const Footer = () => {
    return (
        <footer className="bg-brand-dark text-brand-white py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-brand-yellow mb-2">FactsnReel</h3>
                    <p className="text-gray-400">Facts, Knowledge, and Reels.</p>
                </div>

                <div className="flex justify-center space-x-6 mb-6">
                    <a href="https://www.instagram.com/factsnreel" className="hover:text-brand-yellow transition-colors">Instagram</a>
                    <a href="https://www.facebook.com/factsnreel" className="hover:text-brand-yellow transition-colors">Facebook</a>
                    <a href="https://www.threads.com/@factsnreel" className="hover:text-brand-yellow transition-colors">Threads</a>
                    <a href="mailto:factsnreelinsta@gmail.com" className="hover:text-brand-yellow transition-colors">Email</a>
                </div>

                <div className="border-t border-gray-700 pt-4 text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} FactsnReel. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
