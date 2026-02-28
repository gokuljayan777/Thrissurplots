import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate dynamic metadata based on the slug
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const rawTitle = resolvedParams.slug.replace(/-/g, ' ');
    const title = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);

    return {
        title: `${title} | Thrissur Plots Blog`,
        description: `Read our latest insights on ${title}, focusing on the real estate market in Thrissur, Kerala.`,
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const resolvedParams = await params;

    // Minimal placeholder implementation for a generic post structure based on the URL slug
    const title = resolvedParams.slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Providing a high-quality relevant general image for demonstration
    const imageUrl = "https://images.unsplash.com/photo-1579589882956-2e8c1ab16cff?q=80&w=2000&auto=format&fit=crop";

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-sans pb-24 pt-32">
            <article className="max-w-3xl mx-auto px-6">

                {/* Back Link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center space-x-2 text-gold-500 hover:text-gold-400 transition-colors uppercase tracking-wider text-sm font-semibold mb-10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Blog</span>
                </Link>

                {/* Header Metadata */}
                <header className="mb-12">
                    <div className="flex items-center space-x-4 text-sm font-medium text-gray-500 mb-6 uppercase tracking-widest">
                        <span className="text-gold-400">Market Insights</span>
                        <span>•</span>
                        <span>Oct 12, 2025</span>
                        <span>•</span>
                        <span>5 Min Read</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-8">
                        {title}
                    </h1>

                    <div className="flex items-center space-x-4 bg-[#111] p-4 rounded-xl border border-white/5 inline-flex">
                        <div className="w-12 h-12 rounded-full bg-gold-600/20 border border-gold-500/30 flex items-center justify-center text-gold-500 font-serif font-bold text-xl">
                            TP
                        </div>
                        <div>
                            <div className="text-white font-medium">Thrissur Plots Editorial</div>
                            <div className="text-xs text-gray-400">Real Estate Expert</div>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 100vw, 800px"
                    />
                </div>

                {/* Content Body - Simulated Rich Text using prose-like custom classes */}
                <div className="space-y-8 text-lg font-light leading-relaxed text-gray-300">

                    <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-10 border-l-4 border-gold-500 pl-6 bg-gradient-to-r from-gold-500/10 to-transparent py-4">
                        Thrissur is undergoing a rapid metamorphosis. What was once seen purely as a quiet cultural haven is now fiercely emerging as one of the most lucrative real estate investment hubs in South India.
                    </p>

                    <p>
                        The expansion of infrastructure networks, specifically the widening of National Highway 66 and the development of state-of-the-art commercial micro-markets, has catalyzed land value appreciation across the district. For strategic investors, understanding these micro-market dynamics is the key to maximizing ROI over the next decade.
                    </p>

                    <h3 className="text-2xl md:text-3xl font-serif text-gold-400 font-bold mt-12 mb-6">
                        The Infrastructure Boom
                    </h3>

                    <p>
                        When assessing land value, connectivity remains paramount. The seamless integration of road networks linking the commercial heart of Swaraj Round to rapidly expanding suburban corridors like Kuttanellur, Mannuthy, and Puzhakkal has drastically reduced commute times.
                    </p>

                    <p>
                        This decentralization of commercial activity means that <a href="#" className="text-gold-500 border-b border-gold-500 hover:text-white hover:border-white transition-colors pb-0.5">residential plots</a> previously considered "outskirts" are now prime real estate, attracting massive interest from non-resident Indians (NRIs) seeking secure footholds in their home state.
                    </p>

                    <h3 className="text-2xl md:text-3xl font-serif text-gold-400 font-bold mt-12 mb-6">
                        Zoning and Documentation
                    </h3>

                    <p>
                        Despite the boom, investing blindly carries risks. The importance of verified documentation cannot be overstated. From securing an Encumbrance Certificate (EC) covering the last 30 years to ensuring clear demarcation in the village records (Patta), every buyer must engage in rigorous due diligence.
                    </p>

                    <div className="bg-[#111] border border-white/10 rounded-xl p-8 my-10">
                        <h4 className="text-white font-semibold text-xl mb-4">Investment Checklist:</h4>
                        <ul className="list-disc list-inside space-y-3 text-gray-400">
                            <li>Verify the title deeds and previous ownership history.</li>
                            <li>Ensure the land falls under appropriate residential or commercial zoning (avoiding protected agricultural/wetlands).</li>
                            <li>Confirm access to basic utilities and the width of the approach road.</li>
                        </ul>
                    </div>

                    <p>
                        At Thrissur Plots, we simplify this complex landscape. Our curated portfolio consists only of 100% legally clear, pre-vetted properties, ensuring that your capital is deployed safely and profitably.
                    </p>

                </div>

            </article>
        </div>
    );
}
