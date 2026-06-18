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

                <div className="border-t border-gray-700 pt-6 pb-2 text-sm text-gray-400 flex flex-col items-center">
                    <p className="mb-2">&copy; {new Date().getFullYear()} FactsnReel. All rights reserved.</p>
                    <p className="mb-4 text-xs text-gray-500 max-w-md mx-auto">
                        All images and content are the property of their respective owners and are used here for educational and informational purposes only.
                    </p>

                    <div className="flex space-x-6 mb-6">
                        <a href="/privacy-policy" className="hover:text-brand-yellow transition-colors">Privacy Policy</a>
                        <a href="/disclosure" className="hover:text-brand-yellow transition-colors">Associate Disclosure</a>
                    </div>
                </div>
            </div>

            {/* Separate Made With Section */}
            <div className="w-full bg-black/40 py-3 text-center border-t border-gray-800">
                <p className="text-gray-300 font-medium tracking-wide">
                    Made with <span className="text-red-500 animate-pulse">❤️</span> by <span className="text-brand-yellow">Gourav Verma</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
