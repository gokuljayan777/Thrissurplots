import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "./ContactClientComponents";

export const metadata = {
  title: "Contact Us | Thrissur Plots",
  description:
    "Get in touch with Thrissur Plots to schedule a site visit or consult with our real estate experts for buying or selling land in Thrissur.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-primary text-text-main font-sans pb-24 pt-32 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <section className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-main tracking-wide mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-text-muted font-light leading-relaxed">
            Whether you are looking to buy a premium plot, sell your property,
            or simply need expert advice, our team is ready to assist you.
          </p>
        </section>

        {/* Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          {/* Left Column: Contact Form */}
          <div className="w-full lg:w-[60%] order-2 lg:order-1 relative z-10">
            <div className="bg-secondary border border-border-strong rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100"></div>
              <h2 className="text-3xl font-serif font-bold text-text-main mb-8 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors duration-500">
                Send us a Message
              </h2>
              <ContactForm />
            </div>
          </div>

          {/* Right Column: Information & Map */}
          <div className="w-full lg:w-2/5 space-y-8">
            {/* Business Details Card */}
            <div className="bg-secondary border border-border-strong rounded-2xl p-8 space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gold-600/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold-600 dark:text-gold-500" />
                </div>
                <div>
                  <h4 className="text-text-main font-semibold uppercase tracking-wider text-sm mb-2">
                    Office Address
                  </h4>
                  <p className="text-text-muted leading-relaxed font-light">
                    Swaraj Round North,
                    <br />
                    Thrissur, Kerala 680001
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gold-600/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold-600 dark:text-gold-500" />
                </div>
                <div>
                  <h4 className="text-text-main font-semibold uppercase tracking-wider text-sm mb-2">
                    Phone Numbers
                  </h4>
                  <p className="text-text-muted leading-relaxed font-light">
                    <a
                      href="tel:+919876543210"
                      className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                    >
                      +91 98765 43210
                    </a>
                    <br />
                    <a
                      href="tel:+914872345678"
                      className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                    >
                      0487 234 5678
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gold-600/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gold-600 dark:text-gold-500" />
                </div>
                <div>
                  <h4 className="text-text-main font-semibold uppercase tracking-wider text-sm mb-2">
                    Email Address
                  </h4>
                  <a
                    href="mailto:info@thrissurplots.com"
                    className="text-text-muted hover:text-gold-600 dark:hover:text-gold-400 transition-colors font-light"
                  >
                    info@thrissurplots.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gold-600/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold-600 dark:text-gold-500" />
                </div>
                <div>
                  <h4 className="text-text-main font-semibold uppercase tracking-wider text-sm mb-2">
                    Working Hours
                  </h4>
                  <p className="text-text-muted leading-relaxed font-light">
                    Mon - Sat: 9:30 AM - 6:30 PM
                    <br />
                    Sunday: By Appointment Only
                  </p>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#075E54] border border-[#128C7E] text-white font-bold tracking-widest py-4 px-6 rounded-lg transition-all flex items-center justify-center space-x-3 group mt-4 relative overflow-hidden shadow-[0_4px_14px_rgba(7,94,84,0.4)]"
              >
                <div className="absolute inset-y-0 left-0 w-0 bg-[#128C7E] transition-all duration-500 ease-out group-hover:w-full z-0"></div>
                <div className="relative z-10 flex items-center justify-center space-x-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
                  </svg>
                  <span>Message on WhatsApp</span>
                </div>
              </a>
            </div>

            {/* Simulated Map Container */}
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-border-strong relative group shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute inset-0 bg-secondary animate-pulse opacity-50 dark:opacity-100"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-text-muted mx-auto mb-2 opacity-50" />
                  <span className="text-text-muted text-sm tracking-wider uppercase">
                    Interactive Map Placeholder
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
