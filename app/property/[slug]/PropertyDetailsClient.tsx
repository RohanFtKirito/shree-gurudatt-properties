'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, Calendar, MapPin, Ruler, Tag, Home } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

interface PropertyDetailsClientProps {
  property: any;
}

export default function PropertyDetailsClient({ property }: PropertyDetailsClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = property.images || [];
  const mainImage = images[currentImageIndex] || images[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.description,
    image: property.images?.[0] || "",
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Shree GuruDatt Properties",
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location,
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="py-10">
        <div className="container">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/properties" className="hover:text-primary">Properties</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{property.title}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
            <div className="space-y-3">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <Image
                  src={mainImage}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                        i === currentImageIndex
                          ? "border-primary"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image src={img} alt="" width={80} height={64} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="rounded-sm bg-primary px-2.5 py-1 text-xs font-heading font-medium text-primary-foreground">{property.status}</span>
                <span className="rounded-sm bg-secondary px-2.5 py-1 text-xs font-heading font-semibold text-secondary-foreground">{property.configuration}</span>
                <span className="rounded-sm bg-muted px-2.5 py-1 text-xs font-heading font-medium text-muted-foreground">{property.type}</span>
              </div>

              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">{property.title}</h1>
              <p className="text-lg font-heading font-bold text-secondary mb-4">{property.price}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  {property.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Ruler className="h-4 w-4 text-primary" />
                  {property.area}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Home className="h-4 w-4 text-primary" />
                  {property.configuration}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="font-heading text-lg font-semibold text-foreground mb-3">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {(property.amenities || []).map((a: string) => (
                    <span key={a} className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      <Tag className="h-3 w-3" />
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-heading text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Phone className="h-4 w-4" />
                  Call Agent
                </a>
                <a
                  href={`https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(property.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 font-heading text-sm font-semibold text-card transition-colors hover:bg-[#25D366]/90"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Agent
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-secondary px-5 py-3 font-heading text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule Visit
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-lg overflow-hidden">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-3">Location</h2>
            <iframe
              title={`Location of ${property.title}`}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.5!2d72.84!3d19.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA5JzM2LjAiTiA3MsKwNTAnMjQuMCJF!5e0!3m2!1sen!2sin!4v1600000000000"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
