import { MapPin, Phone, Mail, Clock, Star, Award, ShieldCheck } from "lucide-react";
import {
  ContactForm,
  ContactStats,
  ContactUSP,
  SocialLinksBar,
  ContactFAQ,
  SiteVisitBanner,
} from "./ContactClientComponents";

export const metadata = {
  title: "Contact Us | Thrissur Plots",
  description:
    "Get in touch with Thrissur Plots to schedule a site visit or consult with our real estate experts for buying or selling land in Thrissur.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-primary text-text-main font-sans transition-colors duration-300">

      {/* ══════════════════════════════════════════
          CINEMATIC HERO
      ══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#030305] pt-32 pb-24 px-6">
        {/* Radial glow orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gold-600/8 blur-[100px] pointer-events-none" />

        {/* Diagonal lines pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "repeating-linear-gradient(-45deg, #e5a12d 0, #e5a12d 1px, transparent 0, transparent 10px)",
          backgroundSize: "14px 14px"
        }} />

        {/* Gold corner accent */}
        <div className="absolute top-0 left-0 w-32 h-[2px] bg-gradient-to-r from-gold-500 to-transparent" />
        <div className="absolute top-0 left-0 w-[2px] h-32 bg-gradient-to-b from-gold-500 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-[2px] bg-gradient-to-l from-gold-500 to-transparent" />
        <div className="absolute top-0 right-0 w-[2px] h-32 bg-gradient-to-b from-gold-500 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-[1.5px] bg-gold-500" />
            <span className="text-gold-400 text-xs font-bold uppercase tracking-[0.3em]">Thrissur&apos;s Most Trusted Real Estate</span>
            <div className="w-8 h-[1.5px] bg-gold-500" />
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-[90px] font-serif font-bold text-white leading-[0.95] tracking-tight mb-6">
            Let&apos;s{" "}
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600">
              Connect.
            </span>
          </h1>

          <p className="text-white/50 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Whether you&apos;re looking to buy, sell, or invest — our expert team is ready to guide
            you to the perfect plot in Thrissur.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Award, text: "12+ Years Experience" },
              { icon: ShieldCheck, text: "500+ Plots Sold" },
              { icon: Star, text: "4.9 Star Rated" },
            ].map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div key={i} className="group flex items-center gap-2.5 bg-white/5 hover:bg-gold-500/10 border border-white/10 hover:border-gold-500/30 backdrop-blur-sm px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.02)] hover:shadow-[0_0_15px_rgba(229,161,45,0.2)]">
                  <Icon className="w-4 h-4 text-gold-500 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-white/80 group-hover:text-white text-xs font-bold tracking-wide transition-colors duration-300">{badge.text}</span>
                </div>
              )
            })}
          </div>

          {/* Scroll indicator */}
          <div className="mt-14 flex flex-col items-center gap-2">
            <span className="text-white/20 text-[9px] uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-gold-500/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <ContactStats />

      {/* ══════════════════════════════════════════
          FORM + INFO LAYOUT
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-4 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-10">

            {/* Left Column: Contact Form */}
            <div className="w-full lg:w-[58%] order-2 lg:order-1">
              <div className="bg-secondary border border-border-strong rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                {/* Corner glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />

                <div className="mb-8">
                  <p className="text-gold-500 text-xs uppercase tracking-widest font-bold mb-2">Get in Touch</p>
                  <h2 className="text-3xl font-serif font-bold text-text-main group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors duration-500">
                    Send us a Message
                  </h2>
                  <p className="text-text-muted text-sm font-light mt-2">
                    Fill in your details and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>

            {/* Right Column: Contact Info + Map */}
            <div className="w-full lg:w-[42%] space-y-6">
              {/* Business Details Card */}
              <div className="bg-secondary border border-border-strong rounded-2xl p-8 space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-600/10 flex items-center justify-center flex-shrink-0 border border-gold-500/20">
                    <MapPin className="w-5 h-5 text-gold-600 dark:text-gold-500" />
                  </div>
                  <div>
                    <h4 className="text-text-main font-semibold uppercase tracking-wider text-xs mb-2">
                      Office Address
                    </h4>
                    <p className="text-text-muted leading-relaxed font-light text-sm">
                      Swaraj Round North,<br />
                      Thrissur, Kerala 680001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-600/10 flex items-center justify-center flex-shrink-0 border border-gold-500/20">
                    <Phone className="w-5 h-5 text-gold-600 dark:text-gold-500" />
                  </div>
                  <div>
                    <h4 className="text-text-main font-semibold uppercase tracking-wider text-xs mb-2">
                      Phone Numbers
                    </h4>
                    <p className="text-text-muted leading-relaxed font-light text-sm">
                      <a href="tel:+919876543210" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                        +91 98765 43210
                      </a>
                      <br />
                      <a href="tel:+914872345678" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                        0487 234 5678
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-600/10 flex items-center justify-center flex-shrink-0 border border-gold-500/20">
                    <Mail className="w-5 h-5 text-gold-600 dark:text-gold-500" />
                  </div>
                  <div>
                    <h4 className="text-text-main font-semibold uppercase tracking-wider text-xs mb-2">
                      Email Address
                    </h4>
                    <a
                      href="mailto:info@thrissurplots.com"
                      className="text-text-muted hover:text-gold-600 dark:hover:text-gold-400 transition-colors font-light text-sm"
                    >
                      info@thrissurplots.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-600/10 flex items-center justify-center flex-shrink-0 border border-gold-500/20">
                    <Clock className="w-5 h-5 text-gold-600 dark:text-gold-500" />
                  </div>
                  <div>
                    <h4 className="text-text-main font-semibold uppercase tracking-wider text-xs mb-2">
                      Working Hours
                    </h4>
                    <p className="text-text-muted leading-relaxed font-light text-sm">
                      Mon – Sat: 9:30 AM – 6:30 PM<br />
                      Sunday: By Appointment Only
                    </p>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#075E54] border border-[#128C7E] text-white font-bold tracking-widest py-4 px-6 rounded-xl transition-all flex items-center justify-center space-x-3 group mt-4 relative overflow-hidden shadow-[0_4px_14px_rgba(7,94,84,0.4)]"
                >
                  <div className="absolute inset-y-0 left-0 w-0 bg-[#128C7E] transition-all duration-500 ease-out group-hover:w-full z-0" />
                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
                    </svg>
                    <span className="text-sm uppercase tracking-widest">Message on WhatsApp</span>
                  </div>
                </a>
              </div>

              {/* Availability badge */}
              <div className="flex items-center gap-3 bg-secondary border border-border-strong rounded-xl px-5 py-4">
                <div className="relative flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-40" />
                </div>
                <div>
                  <p className="text-text-main text-sm font-semibold">We&apos;re Available Now</p>
                  <p className="text-text-muted text-xs font-light">Our team is online · Mon–Sat 9:30AM–6:30PM</p>
                </div>
              </div>

              {/* Schedule a Callback Card */}
              <div className="bg-secondary border border-border-strong rounded-2xl p-6 relative overflow-hidden group">
                {/* Subtle gold glow */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-gold-500/20 transition-all duration-500" />

                <div className="relative z-10">
                  <p className="text-gold-500 text-[10px] font-bold uppercase tracking-[0.25em] mb-1">Free Service</p>
                  <h3 className="text-text-main text-base font-semibold mb-1">Schedule a Callback</h3>
                  <p className="text-text-muted text-xs font-light mb-4 leading-relaxed">
                    Pick a convenient slot and our expert will call you back — no waiting, no hassle.
                  </p>

                  {/* Time slot pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {["9:30 AM", "11:00 AM", "2:00 PM", "4:30 PM", "6:00 PM"].map((slot) => (
                      <span
                        key={slot}
                        className="text-[11px] font-semibold text-text-muted border border-border-strong rounded-full px-3 py-1 hover:border-gold-500 hover:text-gold-500 cursor-pointer transition-all duration-200"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>

                  <a
                    href="tel:+919876543210"
                    className="w-full flex items-center justify-center gap-2 bg-gold-600/10 hover:bg-gold-600/20 border border-gold-500/30 hover:border-gold-500/60 text-gold-500 text-xs font-bold uppercase tracking-widest py-3 rounded-xl transition-all duration-300"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Request a Callback
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FULL-WIDTH GOOGLE MAP SECTION
      ══════════════════════════════════════════ */}
      <section className="w-full bg-primary border-t border-border-subtle overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="w-full rounded-2xl overflow-hidden border border-border-strong shadow-lg relative group">
            {/* Map header */}
            <div className="bg-secondary border-b border-border-subtle px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
                  Our Location — Swaraj Round, Thrissur
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Swaraj+Round+Thrissur"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-500 text-[10px] font-bold uppercase tracking-widest hover:underline"
              >
                Open in Maps
              </a>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.0!2d76.2144!3d10.5271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ef3b58a3b1ab%3A0x8f738a8f27f17c60!2sSwaraj%20Round%2C%20Thrissur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1709000000000!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Thrissur Plots Office Location"
              className="grayscale-[0.2] contrast-[1.1] brightness-[0.9] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* USP Section */}
      <ContactUSP />

      {/* Site Visit CTA */}
      <SiteVisitBanner />

      {/* Social Links Bar */}
      <SocialLinksBar />

      {/* FAQ Section */}
      <ContactFAQ />

      {/* Final micro-detail: client testimonial strip */}
      <section className="py-12 px-6 bg-secondary border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {[
              { text: "Helped me find my dream plot within a week!", name: "Arun M.", role: "Homebuyer" },
              { text: "Incredibly professional and responsive team.", name: "Priya N.", role: "Investor" },
              { text: "Zero hidden fees — completely transparent.", name: "Suresh K.", role: "NRI Buyer" },
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center text-center max-w-[240px]">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="text-text-muted text-xs font-light italic leading-relaxed mb-2">&ldquo;{t.text}&rdquo;</p>
                <p className="text-text-main text-xs font-semibold">{t.name}</p>
                <p className="text-text-muted text-[10px]">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
