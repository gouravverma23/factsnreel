import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="max-w-3xl mx-auto bg-dark-surface p-8 rounded-2xl shadow-lg border border-dark-border">
                <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
                <p className="text-gray-300 mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 mb-4">
                        At FactsnReel, we value your privacy. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6 mb-3">1. Information We Collect</h2>
                    <p className="text-gray-300 mb-2">
                        We generally do not collect personal information unless you voluntarily provide it (e.g., contacting us via email). However, we may use third-party tools that collect anonymous usage data.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6 mb-3">2. Cookies and Tracking</h2>
                    <p className="text-gray-300 mb-2">
                        We may use cookies to improve your experience. You can choose to disable cookies through your browser settings.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6 mb-3">3. Third-Party Links</h2>
                    <p className="text-gray-300 mb-2">
                        Our website may contain links to external sites. We are not responsible for the privacy practices or content of these third-party websites.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6 mb-3">4. Reviewing This Policy</h2>
                    <p className="text-gray-300 mb-2">
                        We may update this privacy policy from time to time. We encourage you to review this page periodically for any changes.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6 mb-3">5. Contact Us</h2>
                    <p className="text-gray-300 mb-2">
                        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:factsnreelinsta@gmail.com" className="text-brand-yellow hover:underline">factsnreelinsta@gmail.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
