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
      title: "Property Not Found | Shree GuruDatt Properties",
    };
  }

  return {
    title: `${property.title} | Shree GuruDatt Properties`,
    description: property.description,
    alternates: {
      canonical: `${baseUrl}/property/${property.slug || params.slug}`,
    },
    openGraph: {
      title: property.title,
      description: property.description,
      url: `${baseUrl}/property/${property.slug || params.slug}`,
      images: property.images,
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
