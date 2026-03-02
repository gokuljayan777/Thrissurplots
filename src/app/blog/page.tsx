import type { Metadata } from 'next';
import { BlogGrid } from './BlogClientComponents';

export const metadata: Metadata = {
    title: 'Market Insights & Guides | Thrissur Plots Blog',
    description: 'Stay updated with the latest real estate trends, investment guides, and property market analysis in Thrissur, Kerala.',
};

export default function BlogListingPage() {
    return (
        <div className="min-h-screen bg-primary text-text-main font-sans pb-24 pt-32 transition-colors duration-300">

            {/* Header Section */}
            <section className="px-6 text-center mb-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 dark:from-gold-300 dark:via-gold-500 dark:to-gold-600 tracking-wide mb-6">
                        Market Insights & Guides
                    </h1>
                    <p className="text-lg text-text-muted font-light max-w-2xl mx-auto">
                        Expert analysis, investment strategies, and deep dives into Thrissur&apos;s evolving real estate landscape.
                    </p>
                </div>
            </section>

            {/* Blog Grid Section */}
            <section className="px-6">
                <div className="max-w-7xl mx-auto">
                    <BlogGrid />
                </div>
            </section>

        </div>
    );
}
