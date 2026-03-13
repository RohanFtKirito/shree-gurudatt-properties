'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PropertyLayout from '@/components/property/PropertyLayout';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyHeader from '@/components/property/PropertyHeader';
import PropertyQuickInfo from '@/components/property/PropertyQuickInfo';
import PropertyHighlights from '@/components/property/PropertyHighlights';
import PropertyDescription from '@/components/property/PropertyDescription';
import PropertyAmenities from '@/components/property/PropertyAmenities';
import PropertyContactBar from '@/components/property/PropertyContactBar';
import PropertyLocation from '@/components/property/PropertyLocation';

interface PropertyDetailsClientProps {
  property: any;
}

export default function PropertyDetailsClient({ property }: PropertyDetailsClientProps) {
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
      <PropertyLayout
        breadcrumbTitle={property.title}
        gallery={
          <PropertyGallery
            images={property.images || []}
            propertyTitle={property.title}
          />
        }
        header={
          <PropertyHeader
            title={property.title}
            price={property.price}
            location={property.location}
            status={property.status}
            configuration={property.configuration}
            type={property.type}
          />
        }
        quickInfo={
          <PropertyQuickInfo
            location={property.location}
            configuration={property.configuration}
            area={property.area}
            type={property.type}
            status={property.status}
          />
        }
        highlights={
          property.highlights ? (
            <PropertyHighlights highlights={property.highlights} />
          ) : null
        }
        description={
          <PropertyDescription description={property.description} />
        }
        amenities={
          property.amenities && property.amenities.length > 0 ? (
            <PropertyAmenities amenities={property.amenities} />
          ) : null
        }
        contactBar={
          <PropertyContactBar
            phoneNumber="+919167955841"
            propertyName={property.title}
          />
        }
        location={
          <PropertyLocation
            mapEmbedUrl={
              "https://www.google.com/maps?q=Shree+GuruDatt+Properties+Goregaon+East+Mumbai&output=embed"
            }
            propertyName={`Location of ${property.title}`}
          />
        }
      />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
