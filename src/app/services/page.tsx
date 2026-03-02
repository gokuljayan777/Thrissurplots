import type { Metadata } from 'next';
import { ServicesGrid } from './ServicesClientComponents';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Our Services | Thrissur Plots',
    description: 'Comprehensive real estate solutions in Thrissur. From land buying and selling to investment consultation and documentation support.',
};

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-primary text-text-main font-sans pb-24 transition-colors duration-300">

            {/* Header Section */}
            <section className="relative pt-32 pb-16 px-6 text-center border-b border-border-subtle">
                {/* Subtle Dot Pattern Background */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 border border-gold-600/30 rounded-full px-4 py-1.5 mb-8 bg-secondary/50 backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-600 dark:bg-gold-500"></div>
                        <span className="text-gold-600 dark:text-gold-500 text-xs font-bold tracking-widest uppercase">Premium Real Estate Solutions</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif text-text-main tracking-wide mb-6">
                        Our <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 dark:from-gold-300 dark:via-gold-500 dark:to-gold-600">Bespoke</span> Services
                    </h1>

                    <p className="text-lg md:text-xl text-text-muted font-light max-w-2xl mx-auto leading-relaxed mb-10">
                        Experience premium real estate solutions tailored for the discerning investor. We combine local expertise with world-class service standards.
                    </p>

                    {/* Gradient Line */}
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
                </div>
            </section>

            {/* Services Grid Section */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <ServicesGrid />
                </div>
            </section>

            {/* Premium CTA Banner */}
            <section className="px-6 mt-16">
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-secondary to-primary border border-gold-600/30 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(229,161,45,0.05)]">

                    {/* Decorative glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/10 dark:bg-gold-500/10 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-600/10 dark:bg-gold-500/10 blur-[100px] rounded-full"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-serif text-text-main font-bold mb-4">
                            Ready to secure your legacy?
                        </h2>
                        <p className="text-text-muted text-lg mb-8 font-light">
                            Speak directly with our local land experts to find a property that perfectly matches your lifestyle or investment goals.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold uppercase tracking-widest py-4 px-10 rounded-lg transition-all shadow-[0_0_20px_rgba(229,161,45,0.2)] hover:shadow-[0_0_30px_rgba(229,161,45,0.4)] transform hover:-translate-y-1"
                        >
                            Schedule a Free Consultation
                        </Link>
                    </div>

                </div>
            </section>

        </div>
    );
}
