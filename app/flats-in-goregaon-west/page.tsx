import { Metadata } from "next";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Flats in Goregaon West | Shree GuruDatt Properties",
  description: "Browse flats in Goregaon West including 1BHK, 2BHK, and 3BHK apartments. Find the best residential properties in Goregaon West, Mumbai.",
};

export default function FlatsInGoregaonWestPage() {
  const flatProperties = properties.filter((p) => 
    p.location.toLowerCase().includes("goregaon west") && 
    p.type === "Residential"
  );

  return (
    <>
      <Header />
      <main className="py-10">
        <div className="container">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Flats in Goregaon West</h1>
          <p className="text-muted-foreground mb-8">Browse verified residential flats and apartments in Goregaon West, Mumbai. Find 1BHK, 2BHK, and 3BHK properties.</p>

          {flatProperties.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">No flats available at the moment in Goregaon West.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {flatProperties.map((p) => (
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

