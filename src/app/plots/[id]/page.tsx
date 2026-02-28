import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, Share2, Heart, Maximize2, Building2, Route, Compass, CheckCircle2 } from 'lucide-react';
import { mockProperties } from '@/lib/data/mockData';
import DetailClientComponents from './DetailClientComponents';
import PlotCard from '@/components/PlotCard';

interface PageProps {
    params: Promise<{ id: string }>;
}

// Generate SEO Metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const plot = mockProperties.find((p) => p.id === resolvedParams.id);

    if (!plot) {
        return {
            title: 'Plot Not Found | Thrissur Plots',
            description: 'The requested property could not be found.',
        };
    }

    return {
        title: `${plot.title} | Buy Land in Thrissur`,
        description: `Premium ${plot.type} plot available for sale in ${plot.location}. ${plot.area} starting at ${plot.price}. Explore exclusive Thrissur real estate.`,
        openGraph: {
            title: plot.title,
            description: `Premium ${plot.type} plot available in ${plot.location}.`,
            images: [
                {
                    url: plot.imageUrl,
                    width: 1200,
                    height: 630,
                    alt: plot.title,
                },
            ],
        },
    };
}

export default async function PlotDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    const plot = mockProperties.find((p) => p.id === resolvedParams.id);

    if (!plot) {
        notFound();
    }

    // Generate placeholder thumbnails using the main image for demo purposes
    const galleryImages = [
        plot.imageUrl,
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop"
    ];

    const highlights = [
        "Clear Title & Legal Documents",
        "Panchayat / Corporation Approved",
        "Boundary Wall Completed",
        "Immediate Registration Possible",
        "Bank Loan Assistance Provided"
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Breadcrumb - optional but good for UX/SEO */}
                <div className="text-xs tracking-wider uppercase mb-8 text-gray-500 font-semibold space-x-2">
                    <a href="/" className="hover:text-gold-400 transition-colors">Home</a>
                    <span>/</span>
                    <a href="/plots" className="hover:text-gold-400 transition-colors">Listings</a>
                    <span>/</span>
                    <span className="text-gold-500">{plot.id}</span>
                </div>

                {/* Split Screen Layout */}
                <div className="flex flex-col lg:flex-row gap-12 relative">

                    {/* LEFT COLUMN: Details (65%) */}
                    <div className="w-full lg:w-[65%] space-y-12">

                        {/* Gallery Section */}
                        <DetailClientComponents images={galleryImages} />

                        {/* Header / Title Section */}
                        <div className="border-b border-white/5 pb-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
                                <div>
                                    <div className="inline-block bg-white/5 border border-gold-600/30 text-gold-400 text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-sm mb-4">
                                        {plot.status === 'Available' ? 'For Sale' : 'Sold'}
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-4">
                                        {plot.title}
                                    </h1>
                                    <div className="flex items-center text-gray-400 text-lg font-sans font-light">
                                        <MapPin className="w-5 h-5 mr-2 text-gold-600 flex-shrink-0" />
                                        <span>{plot.location}</span>
                                    </div>
                                </div>

                                <div className="text-left md:text-right">
                                    <span className="block text-sm uppercase tracking-wider text-gray-500 font-semibold mb-1">Asking Price</span>
                                    <span className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                                        {plot.price}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button className="flex items-center space-x-2 px-6 py-2.5 rounded-sm border border-white/10 text-white hover:bg-white/5 hover:border-white/20 transition-all font-semibold uppercase tracking-wider text-sm">
                                    <Share2 className="w-4 h-4" />
                                    <span>Share</span>
                                </button>
                                <button className="flex items-center space-x-2 px-6 py-2.5 rounded-sm border border-white/10 text-white hover:bg-white/5 hover:border-gold-500/50 hover:text-gold-400 transition-all font-semibold uppercase tracking-wider text-sm">
                                    <Heart className="w-4 h-4" />
                                    <span>Save</span>
                                </button>
                            </div>
                        </div>

                        {/* Key Specifications Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-[#111] border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center text-center group hover:border-gold-600/30 transition-colors">
                                <Maximize2 className="w-8 h-8 text-gold-500 mb-3 group-hover:scale-110 transition-transform" />
                                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Plot Size</span>
                                <span className="text-lg text-white font-medium">{plot.area}</span>
                            </div>
                            <div className="bg-[#111] border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center text-center group hover:border-gold-600/30 transition-colors">
                                <Building2 className="w-8 h-8 text-gold-500 mb-3 group-hover:scale-110 transition-transform" />
                                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Purpose</span>
                                <span className="text-lg text-white font-medium">{plot.type}</span>
                            </div>
                            <div className="bg-[#111] border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center text-center group hover:border-gold-600/30 transition-colors">
                                <Route className="w-8 h-8 text-gold-500 mb-3 group-hover:scale-110 transition-transform" />
                                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Road Access</span>
                                <span className="text-lg text-white font-medium">Tar Road</span>
                            </div>
                            <div className="bg-[#111] border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center text-center group hover:border-gold-600/30 transition-colors">
                                <Compass className="w-8 h-8 text-gold-500 mb-3 group-hover:scale-110 transition-transform" />
                                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Facing</span>
                                <span className="text-lg text-white font-medium">East</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-serif text-white font-bold mb-6">Property Overview</h3>
                            <p className="text-gray-400 leading-relaxed font-light text-lg">
                                An exceptional opportunity to acquire a premium {plot.type.toLowerCase()} plot in the highly sought-after area of {plot.location}. This perfectly rectangular {plot.area} parcel of land offers an ideal canvas for your dream project.
                            </p>
                            <p className="text-gray-400 leading-relaxed font-light text-lg">
                                Surrounded by established infrastructure and featuring direct road access, the property guarantees excellent connectivity to the heart of Thrissur city while maintaining a serene environment. Suitable for immediate construction with all essential utilities available at the boundary.
                            </p>
                        </div>

                        {/* Property Highlights */}
                        <div className="bg-[#1C1A17] rounded-xl p-8 border border-white/5">
                            <h3 className="text-2xl font-serif text-white font-bold mb-8">Property Highlights</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">

                                <div className="flex items-center space-x-4 p-3 -m-3 rounded-xl hover:bg-[#2A261F]/40 transition-colors group cursor-default">
                                    <div className="w-12 h-12 rounded-xl bg-[#2A261F] flex items-center justify-center flex-shrink-0 border border-[#3A352B] group-hover:border-gold-500/50 group-hover:bg-[#3A352B] transition-all duration-300">
                                        <svg className="w-6 h-6 text-gold-500 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 font-semibold tracking-wider uppercase mb-0.5 group-hover:text-gray-300 transition-colors">Plot Area</div>
                                        <div className="text-white font-bold text-lg">{plot.area}</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 p-3 -m-3 rounded-xl hover:bg-[#2A261F]/40 transition-colors group cursor-default">
                                    <div className="w-12 h-12 rounded-xl bg-[#2A261F] flex items-center justify-center flex-shrink-0 border border-[#3A352B] group-hover:border-gold-500/50 group-hover:bg-[#3A352B] transition-all duration-300">
                                        <svg className="w-6 h-6 text-gold-500 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 font-semibold tracking-wider uppercase mb-0.5 group-hover:text-gray-300 transition-colors">Price</div>
                                        <div className="text-white font-bold text-lg">{plot.price}</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 p-3 -m-3 rounded-xl hover:bg-[#2A261F]/40 transition-colors group cursor-default">
                                    <div className="w-12 h-12 rounded-xl bg-[#2A261F] flex items-center justify-center flex-shrink-0 border border-[#3A352B] group-hover:border-gold-500/50 group-hover:bg-[#3A352B] transition-all duration-300">
                                        <svg className="w-6 h-6 text-gold-500 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 font-semibold tracking-wider uppercase mb-0.5 group-hover:text-gray-300 transition-colors">Road Width</div>
                                        <div className="text-white font-bold text-lg">12 Meters</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 p-3 -m-3 rounded-xl hover:bg-[#2A261F]/40 transition-colors group cursor-default">
                                    <div className="w-12 h-12 rounded-xl bg-[#2A261F] flex items-center justify-center flex-shrink-0 border border-[#3A352B] group-hover:border-gold-500/50 group-hover:bg-[#3A352B] transition-all duration-300">
                                        <Compass className="w-6 h-6 text-gold-500 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 font-semibold tracking-wider uppercase mb-0.5 group-hover:text-gray-300 transition-colors">Facing</div>
                                        <div className="text-white font-bold text-lg">East</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 p-3 -m-3 rounded-xl hover:bg-[#2A261F]/40 transition-colors group cursor-default">
                                    <div className="w-12 h-12 rounded-xl bg-[#2A261F] flex items-center justify-center flex-shrink-0 border border-[#3A352B] group-hover:border-gold-500/50 group-hover:bg-[#3A352B] transition-all duration-300">
                                        <svg className="w-6 h-6 text-gold-500 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 font-semibold tracking-wider uppercase mb-0.5 group-hover:text-gray-300 transition-colors">Survey No.</div>
                                        <div className="text-white font-bold text-lg">142/2B</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 p-3 -m-3 rounded-xl hover:bg-[#2A261F]/40 transition-colors group cursor-default">
                                    <div className="w-12 h-12 rounded-xl bg-[#2A261F] flex items-center justify-center flex-shrink-0 border border-[#3A352B] group-hover:border-gold-500/50 group-hover:bg-[#3A352B] transition-all duration-300">
                                        <Building2 className="w-6 h-6 text-gold-500 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 font-semibold tracking-wider uppercase mb-0.5 group-hover:text-gray-300 transition-colors">Purpose</div>
                                        <div className="text-white font-bold text-lg">{plot.type}</div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Landmarks Timeline */}
                        <div className="space-y-6 pt-6 border-t border-white/5">
                            <h3 className="text-2xl font-serif text-white font-bold mb-6">Distances & Connectivity</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: "Swaraj Round", dist: "4.5 km" },
                                    { name: "Railway Station", dist: "5.2 km" },
                                    { name: "Lulu Mall Thrissur", dist: "8.0 km" },
                                    { name: "Jubilee Mission Hospital", dist: "3.5 km" },
                                    { name: "National Highway Access", dist: "1.2 km" },
                                    { name: "Educational Institutions", dist: "Within 2 km" }
                                ].map((landmark, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-[#0a0a0a] border border-[#222] rounded-lg">
                                        <span className="text-gray-300 font-medium">{landmark.name}</span>
                                        <span className="text-gold-500 font-semibold">{landmark.dist}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legal Highlights */}
                        <div className="space-y-6 pt-6 border-t border-white/5">
                            <h3 className="text-2xl font-serif text-white font-bold mb-6">Documentation & Highlights</h3>
                            <ul className="space-y-4">
                                {highlights.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckCircle2 className="w-6 h-6 text-[#10B981] mr-4 flex-shrink-0" />
                                        <span className="text-gray-300 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Sticky Enquiry Form (35%) */}
                    <div className="w-full lg:w-[35%]">
                        <div className="sticky top-32">
                            <div className="bg-[#0A0A0A] border border-[#222] border-t-4 border-t-gold-500 rounded-xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.8)]">

                                <h3 className="text-2xl font-serif text-white font-bold mb-2">Interested in this Plot?</h3>
                                <p className="text-gray-400 text-sm mb-8 font-light">Fill out the form below and our real estate experts will get back to you immediately.</p>

                                <form className="space-y-6">

                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-black border border-[#333] rounded-lg p-4 text-white placeholder-gray-600 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="+91 90000 00000"
                                            className="w-full bg-black border border-[#333] rounded-lg p-4 text-white placeholder-gray-600 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Message</label>
                                        <textarea
                                            rows={3}
                                            placeholder="I am interested in this property..."
                                            className="w-full bg-black border border-[#333] rounded-lg p-4 text-white placeholder-gray-600 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <label className="flex items-start space-x-3 cursor-pointer group">
                                        <div className="mt-0.5 w-5 h-5 rounded border border-[#444] bg-transparent flex justify-center items-center group-hover:border-gold-500 relative">
                                            <input type="checkbox" className="appearance-none absolute inset-0 cursor-pointer peer" defaultChecked />
                                            <CheckCircle2 className="w-4 h-4 text-gold-500 opacity-0 peer-checked:opacity-100 transition-opacity" />
                                        </div>
                                        <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Record my request for a site visit.</span>
                                    </label>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold uppercase tracking-widest py-4 px-6 rounded-lg transition-all shadow-[0_0_20px_rgba(229,161,45,0.2)] hover:shadow-[0_0_30px_rgba(229,161,45,0.4)] transform hover:-translate-y-0.5"
                                    >
                                        Enquire Now
                                    </button>

                                    <div className="relative flex items-center py-2">
                                        <div className="flex-grow border-t border-[#333]"></div>
                                        <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase tracking-wider">OR</span>
                                        <div className="flex-grow border-t border-[#333]"></div>
                                    </div>

                                    <button
                                        type="button"
                                        className="w-full relative overflow-hidden bg-transparent border border-[#10B981] group font-bold tracking-widest py-4 px-6 rounded-lg transition-all flex items-center justify-center space-x-2"
                                    >
                                        <div className="absolute inset-0 bg-[#10B981] w-full h-full transform transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0 z-0"></div>
                                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#10B981] group-hover:text-black transition-colors duration-500 relative z-10" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
                                        </svg>
                                        <span className="text-[#10B981] group-hover:text-black transition-colors duration-500 relative z-10">Chat on WhatsApp</span>
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Map Section */}
                <div className="mt-24 border-t border-white/5 pt-16">
                    <h3 className="text-3xl font-serif text-white font-bold mb-8 text-center">Location in Thrissur</h3>
                    <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-[#222] relative group bg-[#0A0A0A]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125433.00342371498!2d76.13606626600465!3d10.51139459569766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee15ed42d1bb%3A0x82e45aa016ca7db!2sThrissur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale contrast-125 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                        ></iframe>
                    </div>
                </div>

                {/* Featured Properties Section */}
                <div className="mt-24 border-t border-white/5 pt-16">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <span className="text-gold-500 font-semibold tracking-wider uppercase text-sm mb-2 block">More Options</span>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Similar Properties</h2>
                        </div>
                        <a href="/plots" className="hidden md:flex items-center text-gray-400 hover:text-gold-400 transition-colors group">
                            <span className="mr-2 text-sm font-semibold uppercase tracking-wider">View All Plots</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mockProperties
                            .filter(p => p.id !== plot.id)
                            .slice(0, 3)
                            .map((featuredPlot) => (
                                <PlotCard key={featuredPlot.id} plot={featuredPlot} />
                            ))}
                    </div>

                    <a href="/plots" className="mt-10 flex md:hidden items-center justify-center w-full py-4 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                        <span className="mr-2 text-sm font-semibold uppercase tracking-wider">View All Plots</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>

            </div>
        </div>
    );
}
