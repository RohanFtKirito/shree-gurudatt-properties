import { Metadata } from "next";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Commercial Properties in Goregaon | Shree Guru Datta Properties",
  description: "Browse commercial properties in Goregaon including office spaces, shops, and retail spaces. Find the perfect commercial real estate in Goregaon, Mumbai.",
};

export default function CommercialPropertiesPage() {
  const commercialProperties = properties.filter((p) => p.type === "Commercial");

  return (
    <>
      <Header />
      <main className="py-10">
        <div className="container">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Commercial Properties in Goregaon</h1>
          <p className="text-muted-foreground mb-8">Browse verified commercial properties including offices, shops, and retail spaces in Goregaon, Mumbai.</p>

          {commercialProperties.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">No commercial properties available at the moment.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {commercialProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

