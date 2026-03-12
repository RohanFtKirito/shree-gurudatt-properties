import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Properties in Goregaon East | Residential & Commercial Real Estate",
  description:
    "Explore properties in Goregaon East, Mumbai. Find residential apartments, commercial offices, and investment opportunities in this prime IT hub location.",
  alternates: {
    canonical: "https://shreegurudattproperties.com/properties-in-goregaon-east",
  },
};

export default function PropertiesInGoregaonEastPage() {
  return (
    <>
      <Header />
      <main className="py-16">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Properties in Goregaon East
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Goregaon East is one of Mumbai's most sought-after locations for real estate.
            Known as the city's emerging IT hub, it offers excellent connectivity, modern
            infrastructure, and a vibrant lifestyle.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold mb-2">
                Residential Projects
              </h3>
              <p className="text-sm text-muted-foreground">
                Luxury apartments and gated communities with modern amenities.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold mb-2">
                Commercial Hub
              </h3>
              <p className="text-sm text-muted-foreground">
                IT parks and Grade A office spaces for businesses.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold mb-2">
                Investment Potential
              </h3>
              <p className="text-sm text-muted-foreground">
                High rental yields and appreciation potential in this prime location.
              </p>
            </div>
          </div>

          <h2 className="font-heading text-2xl font-semibold mb-6">
            Why Invest in Goregaon East?
          </h2>
          <div className="prose max-w-none mb-10">
            <ul className="space-y-2 text-muted-foreground">
              <li>• Home to major IT companies like Accenture, TCS, and Cognizant</li>
              <li>• Well-connected via Western Express Highway and Metro Line 1</li>
              <li>• Upcoming infrastructure developments including flyovers and roads</li>
              <li>• Numerous recreational options - Mall, restaurants, multiplexes</li>
              <li>• Excellent social infrastructure with reputed schools and hospitals</li>
            </ul>
          </div>

          <div className="text-center">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Browse All Properties
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

