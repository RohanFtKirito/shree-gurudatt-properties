import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import "./globals.css";

const BASE_URL = "https://shreegurudattproperties.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Shree GuruDatt Properties | Properties in Goregaon",
    template: "%s | Shree GuruDatt Properties",
  },
  description:
    "Find residential and commercial properties in Goregaon, Mumbai with Shree GuruDatt Properties. Browse verified property listings including flats, apartments, offices, and shops.",
  keywords: [
    "real estate",
    "properties in Goregaon",
    "flats in Goregaon",
    "commercial properties",
    "residential properties Mumbai",
    "property dealer Goregaon",
  ],
  authors: [{ name: "Shree GuruDatt Properties" }],
  creator: "Shree GuruDatt Properties",
  publisher: "Shree GuruDatt Properties",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-IN": BASE_URL,
      "en-US": BASE_URL,
    },
  },
  openGraph: {
    title: "Shree GuruDatt Properties | Properties in Goregaon",
    description:
      "Find residential and commercial properties in Goregaon, Mumbai with Shree GuruDatt Properties.",
    url: BASE_URL,
    siteName: "Shree GuruDatt Properties",
    locale: "en_IN",
    alternateLocale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Shree GuruDatt Properties - Real Estate in Goregaon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree GuruDatt Properties | Properties in Goregaon",
    description:
      "Find residential and commercial properties in Goregaon, Mumbai with Shree GuruDatt Properties.",
    creator: "@ShreeGuruDatt",
    images: ["/images/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Shree GuruDatt Properties",
    description:
      "Your trusted partner for residential and commercial properties in Goregaon, Mumbai.",
    url: BASE_URL,
    telephone: "+919876543210",
    email: "info@shreegurudatt.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Goregaon West",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400104",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 19.1646,
        longitude: 72.8493,
      },
      geoRadius: "10000",
    },
    sameAs: [],
    priceRange: "$$",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

