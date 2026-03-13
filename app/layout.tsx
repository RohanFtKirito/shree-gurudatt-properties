import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import "./globals.css";

const BASE_URL = "https://shreegurudattproperties.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Real Estate Agent in Goregaon East | Shree Guru Datta Properties",
    template: "%s | Shree Guru Datta Properties",
  },
  description:
    "Looking for flats or properties in Goregaon East? Shree Guru Datta Properties helps you buy, sell and rent properties in Mumbai. Specialized in Goregaon real estate with 10+ years of experience.",
  keywords: [
    "real estate agent Goregaon",
    "flats in Goregaon East",
    "property dealer Goregaon Mumbai",
    "properties in Goregaon",
    "Shree Guru Datta Properties",
    "real estate Mumbai",
    "commercial properties Goregaon",
    "residential flats Goregaon",
    "2BHK Goregaon",
    "3BHK Goregaon",
  ],
  authors: [{ name: "Shree Guru Datta Properties" }],
  creator: "Shree Guru Datta Properties",
  publisher: "Shree Guru Datta Properties",
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
    title: "Real Estate Agent in Goregaon East | Shree Guru Datta Properties",
    description:
      "Looking for flats or properties in Goregaon East? Shree Guru Datta Properties helps you buy, sell and rent properties in Mumbai.",
    url: BASE_URL,
    siteName: "Shree Guru Datta Properties",
    locale: "en_IN",
    alternateLocale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Shree Guru Datta Properties - Real Estate in Goregaon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Agent in Goregaon East | Shree Guru Datta Properties",
    description:
      "Looking for flats or properties in Goregaon East? Shree Guru Datta Properties helps you buy, sell and rent properties in Mumbai.",
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
  // Enhanced JSON-LD schema for Local SEO and Google Business integration
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": `${BASE_URL}/#organization`,
        name: "Shree Guru Datta Properties",
        description:
          "Trusted real estate agent in Goregaon East, Mumbai. Specialized in residential and commercial properties with 10+ years of experience.",
        url: BASE_URL,
        telephone: "+919167955841",
        email: "shreegurudattproperties@gmail.com",
        image: `${BASE_URL}/logo.png`,
        logo: `${BASE_URL}/logo.png`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Off Gokuldham, Goregaon East",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400065",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 19.1663,
          longitude: 72.8526,
        },
        areaServed: [
          "Goregaon East",
          "Goregaon West",
          "Malad",
          "Kandivali",
          "Jogeshwari",
          "Andheri",
          "Mumbai",
        ],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "20:00",
        },
        priceRange: "$$",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: "1",
          bestRating: "5",
        },
        sameAs: [
          "https://www.google.com/maps/place/?q=Shree+Guru+Datta+Properties+Goregaon",
          "https://wa.me/919167955841",
        ],
      },
      {
        "@type": "LocalBusiness",
        name: "Shree Guru Datta Properties",
        description:
          "Premier real estate agency in Goregaon East, Mumbai. Expert services for buying, selling, and renting residential and commercial properties.",
        url: BASE_URL,
        telephone: "+919167955841",
        email: "shreegurudattproperties@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Off Gokuldham, Goregaon East",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400065",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 19.1663,
          longitude: 72.8526,
        },
        openingHours: "Mo-Sa 09:00-20:00",
        priceRange: "$$",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: "1",
          bestRating: "5",
        },
      },
    ],
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

