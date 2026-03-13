import { Metadata } from "next";
import Link from "next/link";
import { properties as staticProperties } from "@/data/properties";
import { getPropertyBySlug, getProperties } from "@/lib/properties";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyDetailsClient from "./PropertyDetailsClient";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const properties = await getProperties();
    return properties.map((property) => ({
      slug: property.slug || property.id,
    }));
  } catch (error) {
    // Fallback to static properties if Firestore fails
    return staticProperties.map((property) => ({
      slug: property.slug,
    }));
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const baseUrl = "https://shreegurudattproperties.com";

  let property = null;

  try {
    property = await getPropertyBySlug(params.slug);
  } catch (error) {
    console.error("Error fetching property:", error);
  }

  // Fallback to static data if not found in Firestore
  if (!property) {
    property = staticProperties.find((p) => p.slug === params.slug) || null;
  }

  if (!property) {
    return {
      title: "Property Not Found | Shree Guru Datta Properties",
    };
  }

  // Generate dynamic description
  const location = property.location || "Goregaon";
  const price = property.price || "Contact for price";
  const type = property.type || "Property";
  const config = property.configuration || "";
  const status = property.status || "For Sale";

  const dynamicDescription = config
    ? `${status}: ${config} ${type} in ${location} at ${price}. Contact Shree Guru Datta Properties for details. ${property.description.substring(0, 100)}...`
    : `${status}: ${type} in ${location} at ${price}. Contact Shree Guru Datta Properties for details. ${property.description.substring(0, 100)}...`;

  return {
    title: `${property.title} | Shree Guru Datta Properties`,
    description: dynamicDescription,
    keywords: [
      property.title,
      location,
      type,
      config || "",
      status,
      "Shree Guru Datta Properties",
      "properties in Goregaon",
      "real estate Mumbai",
      price,
    ].filter(Boolean).join(", "),
    alternates: {
      canonical: `${baseUrl}/property/${property.slug || params.slug}`,
    },
    openGraph: {
      title: property.title,
      description: dynamicDescription,
      url: `${baseUrl}/property/${property.slug || params.slug}`,
      images: property.images?.[0] ? [
        {
          url: property.images[0],
          width: 1200,
          height: 630,
          alt: `${property.title} - Shree Guru Datta Properties`,
        },
      ] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description: dynamicDescription,
      images: property.images?.[0] ? [property.images[0]] : [],
    },
  };
}

async function getPropertyData(slug: string) {
  try {
    const property = await getPropertyBySlug(slug);
    if (property) return property;
  } catch (error) {
    console.error("Error fetching from Firestore:", error);
  }
  
  // Fallback to static data
  return staticProperties.find((p) => p.slug === slug) || null;
}

export default async function PropertyDetailsPage({ params }: Props) {
  const property = await getPropertyData(params.slug);

  if (!property) {
    return (
      <>
        <Header />
        <div className="container py-20 text-center">
          <h1 className="font-heading text-2xl font-semibold text-foreground mb-4">Property Not Found</h1>
          <Link href="/properties" className="text-primary underline">Browse all properties</Link>
        </div>
        <Footer />
      </>
    );
  }

  return <PropertyDetailsClient property={property} />;
}
