import type { Metadata } from 'next';
import { ProfileImage, CompanyProfile, ExperienceSection, CoverageAreas, TrustElements, StatsCounter } from './AboutClientComponents';

export const metadata: Metadata = {
    title: 'About Us | Thrissur\'s Local Land Experts',
    description: 'With over a decade of experience, Thrissur Plots is your trusted partner for premium residential, commercial, and agricultural lands in the Cultural Capital of Kerala.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-sans">

            {/* Hero Section */}
            <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[#0a0a0a]">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-transparent to-[#050505] mix-blend-multiply"></div>
                    {/* Subtle gold accent light */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold-500/10 blur-[100px] rounded-full"></div>
                </div>
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                        Building a <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">Heritage</span> <br className="hidden md:block" />
                        in Real Estate
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto">
                        Thrissur's most trusted real estate consultants.
                    </p>
                </div>
            </section>

            {/* Company Profile Section */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <ProfileImage />
                    <CompanyProfile />
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <ExperienceSection />
                </div>
            </section>

            {/* Coverage Areas Section */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <CoverageAreas />
            </section>

            {/* Trust Elements Container */}
            <section className="bg-[#0a0a0a] border-t border-white/5 pt-24 pb-16 relative overflow-hidden">
                {/* Decorative Line */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-600/20 to-transparent"></div>

                <div className="max-w-7xl mx-auto px-6">
                    <TrustElements />
                    <StatsCounter />
                </div>
            </section>



        </div>
    );
}
