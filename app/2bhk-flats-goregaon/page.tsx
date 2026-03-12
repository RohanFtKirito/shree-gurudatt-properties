import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "2BHK Flats in Goregaon | Affordable Residential Properties",
  description:
    "Find the best 2BHK flats in Goregaon, Mumbai. Browse verified residential properties with modern amenities, convenient locations, and competitive prices.",
  alternates: {
    canonical: "https://shreegurudattproperties.com/2bhk-flats-goregaon",
  },
};

export default function TwoBHKFlatsPage() {
  return (
    <>
      <Header />
      <main className="py-16">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            2BHK Flats in Goregaon
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Looking for a comfortable 2BHK apartment in Goregaon? We offer a wide range of
            verified 2-bedroom flats perfect for families and professionals. Our listings
            include properties in Goregaon West and East with modern amenities.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold mb-2">
                Affordable Options
              </h3>
              <p className="text-sm text-muted-foreground">
                2BHK flats starting from ₹85 Lakhs in prime locations of Goregaon.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold mb-2">
                Modern Amenities
              </h3>
              <p className="text-sm text-muted-foreground">
                Properties with parking, lift, security, and clubhouse facilities.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold mb-2">
                Strategic Locations
              </h3>
              <p className="text-sm text-muted-foreground">
                Close to railway stations, schools, hospitals, and shopping malls.
              </p>
            </div>
          </div>

          <h2 className="font-heading text-2xl font-semibold mb-6">
            Why Choose Goregaon for 2BHK Flats?
          </h2>
          <div className="prose max-w-none mb-10">
            <ul className="space-y-2 text-muted-foreground">
              <li>• Excellent connectivity via Western Express Highway and Metro</li>
              <li>• Proximity to business hubs like Goregaon East (IT parks)</li>
              <li>• Good social infrastructure with schools and hospitals nearby</li>
              <li>• Affordable pricing compared to other Mumbai suburbs</li>
              <li>• High rental demand makes it great for investment</li>
            </ul>
          </div>

          <div className="text-center">
            <Link
              href="/properties?config=2BHK"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View All 2BHK Properties
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

