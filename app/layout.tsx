import type { Metadata, Viewport } from "next";
import { Geologica, Onest } from "next/font/google";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ModalProvider } from "@/components/modals/ModalProvider";
import CookieConsent from "@/components/ui/CookieConsent";
import { site } from "@/lib/site";

import "./globals.css";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-onest",
});

const geologica = Geologica({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-geologica",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.tagline} в ${site.regionShort} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: site.name,
    title: `${site.tagline} в ${site.regionShort} | ${site.name}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f6f7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  description: site.description,
  telephone: site.phone.display,
  email: site.email.display,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Шаховская",
    streetAddress: site.address.display,
    addressRegion: "Московская область",
    addressCountry: "RU",
  },
  areaServed: { "@type": "AdministrativeArea", name: site.region },
  openingHours: "Mo-Sa 09:00-18:00",
  priceRange: "$$",
  url: site.url,
  sameAs: [site.social.ok],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${onest.variable} ${geologica.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ModalProvider>
          <Header />
          <main id="top">{children}</main>
          <Footer />
          <CookieConsent />
        </ModalProvider>
      </body>
    </html>
  );
}
