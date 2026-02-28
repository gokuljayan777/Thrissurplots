import type { Metadata } from 'next';
import { Hero, Section, KeyPlacesGrid } from './WhyThrissurClientComponents';

export const metadata: Metadata = {
    title: 'Why Invest in Thrissur? | Culture, Growth & Real Estate',
    description: 'Discover why Thrissur, the Cultural Capital of Kerala, is the prime destination for high-yield real estate investments, offering unparalleled infrastructure and heritage.',
};

export default function WhyThrissurPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-sans pb-16">

            {/* Editorial Hero Section */}
            <Hero />

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 space-y-32 py-24">

                {/* Culture & Heritage (Left Image / Right Text) */}
                <Section
                    alignment="left"
                    imageUrl="https://images.unsplash.com/photo-1596423735880-5f2a689b903e?q=80&w=2000&auto=format&fit=crop"
                    title="The Cultural Capital"
                    content={[
                        "Thrissur is world-renowned for its rich heritage, grand festivals like the Thrissur Pooram, and historic temples. This deep-rooted cultural stability creates a uniquely serene and respectable environment for families.",
                        "Investing in a city that balances rapid modernization with profound traditions ensures long-term lifestyle security and enduring property desirability."
                    ]}
                />

                {/* Infrastructure & Growth (Right Image / Left Text) */}
                <Section
                    alignment="right"
                    imageUrl="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2000&auto=format&fit=crop"
                    title="Rising Infrastructure & Growth"
                    content={[
                        "With the expansion of the National Highway 66 (NH 66) bypass and upcoming mega-projects, connectivity in Thrissur is at an all-time high. The city serves as a strategic juncture connecting the northern and southern districts of Kerala.",
                        "This ongoing infrastructural boom acts as a catalyst for exponential land value appreciation, making early investments in commercial corridors and suburban residential rings highly lucrative."
                    ]}
                />

                {/* Key Places Mini-Grid */}
                <KeyPlacesGrid />

                {/* Food & Lifestyle (Left Image / Right Text) */}
                <Section
                    alignment="left"
                    imageUrl="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop"
                    title="A Premium Standard of Living"
                    content={[
                        "Thrissur boasts some of the finest educational institutions, leading multi-specialty healthcare centers, and a vibrant culinary scene. From traditional Kerala cuisine to modern cafes, the lifestyle here is uncompromised.",
                        "The presence of major retail hubs like Lulu Mall further elevates the city's cosmopolitan appeal while retaining its peaceful, suburban charm."
                    ]}
                />

            </div>
        </div>
    );
}
