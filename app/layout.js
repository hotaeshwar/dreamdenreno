import { Montserrat, Cinzel } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import WhatsAppChat from "@/components/WhatsAppChat";
import ProgressiveScrollIndicator from "@/components/ProgressiveScrollIndicator";
import { ToastProvider } from "@/components/Toast";

const sans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans-custom",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const serif = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif-custom",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "DreamDen | Home Renovations, Legal Basements & Custom Homes",
  description: "DreamDen delivers premium full home renovations, legal basement apartments and custom homes across the GTA and surrounding areas.",
  keywords: [
    "home renovation",
    "home renovations Toronto",
    "full home renovation",
    "legal basement apartment",
    "legal basement renovation",
    "basement renovation Toronto",
    "custom homes Toronto",
    "kitchen renovation",
    "bathroom renovation",
    "home additions",
    "renovation contractor",
    "renovation company",
    "GTA renovations",
    "custom home builder"
  ],
  openGraph: {
    title: "DreamDen | Home Renovations, Legal Basements & Custom Homes",
    description: "DreamDen delivers premium full home renovations, legal basement apartments and custom homes across the GTA and surrounding areas.",
    type: "website",
    locale: "en_CA",
    url: "https://dreamden.ca",
    siteName: "DreamDen",
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <ToastProvider>
          <ProgressiveScrollIndicator />
          <SplashScreen />
          <WhatsAppChat />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
