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
import PropertyEnquiryForm from '@/components/PropertyEnquiryForm';

interface PropertyDetailsClientProps {
  property: any;
}

export default function PropertyDetailsClient({ property }: PropertyDetailsClientProps) {
  const baseUrl = "https://shreegurudattproperties.com";

  // Enhanced JSON-LD structured data for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        name: "Shree Guru Datta Properties",
        image: "https://shreegurudattproperties.com/logo.png",
        description: "Your trusted partner for residential and commercial properties in Goregaon, Mumbai.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Goregaon East",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400065",
          addressCountry: "IN",
        },
        telephone: "+919167955841",
        email: "shreegurudattproperties@gmail.com",
        url: baseUrl,
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: 19.1646,
            longitude: 72.8493,
          },
          geoRadius: "10000",
        },
        priceRange: "$$",
      },
      {
        "@type": property.type === "Residential" ? "SingleFamilyResidence" : "Product",
        name: property.title,
        description: property.description,
        image: property.images || [],
        url: `${baseUrl}/property/${property.slug || property.id}`,
        offers: {
          "@type": "Offer",
          price: property.price,
          priceCurrency: "INR",
          availability: property.status === "For Sale" ? "https://schema.org/InStock" : "https://schema.org/InStock",
          seller: {
            "@type": "RealEstateAgent",
            name: "Shree Guru Datta Properties",
          },
          url: `${baseUrl}/property/${property.slug || property.id}`,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: property.location,
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        numberOfRooms: property.configuration,
        floorSize: property.area,
        amenities: property.amenities || [],
      },
    ],
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
              "https://www.google.com/maps?q=Shree+Guru+Datta+Properties+Goregaon+East+Mumbai&output=embed"
            }
            propertyName={`Location of ${property.title}`}
          />
        }
        enquiryForm={
          <PropertyEnquiryForm
            propertyId={property.id}
            propertyTitle={property.title}
            propertySlug={property.slug}
          />
        }
      />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
