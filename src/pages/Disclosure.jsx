import React from 'react';

const Disclosure = () => {
    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="max-w-3xl mx-auto bg-dark-surface p-8 rounded-2xl shadow-lg border border-dark-border">
                <h1 className="text-3xl font-bold text-white mb-6">Associate Disclosure</h1>

                <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 mb-4">
                        FactsnReel allows us to share interesting facts and knowledge with you. To support the operation of this website, we may participate in affiliate advertising programs.
                    </p>

                    <div className="bg-dark-bg p-6 rounded-xl border border-brand-yellow/20 mb-6">
                        <p className="text-gray-300 font-medium">
                            <span className="text-brand-yellow font-bold">Key Disclosure:</span> When you click on links to various merchants on this site and make a purchase, this can result in this site earning a commission. Affiliate programs and affiliations include, but are not limited to, the Amazon Associate Program.
                        </p>
                    </div>

                    <h2 className="text-xl font-bold text-white mt-6 mb-3">Amazon Associates Disclosure</h2>
                    <p className="text-gray-300 mb-2">
                        FactsnReel is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6 mb-3">How This Affects You</h2>
                    <p className="text-gray-300 mb-2">
                        The price you pay for any products or services is not affected by these affiliate links. You pay the same price as you would if you went directly to the merchant's website. The commission we earn helps us keep the site running and continue providing valuable content.
                    </p>

                    <p className="text-gray-300 mt-6">
                        We only recommend products or services that we believe will add value to our readers. Your trust is important to us.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Disclosure;
