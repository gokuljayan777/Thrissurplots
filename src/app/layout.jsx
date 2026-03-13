import {
  DM_Sans,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from '@/components/LenisProvider';
import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata = {
  title: "Thrissurplots | Premium Properties",
  description: "Discover premium plots and properties in Thrissur.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${montserrat.variable} font-sans antialiased min-h-screen bg-background text-foreground flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LenisProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <FloatingWhatsApp />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}