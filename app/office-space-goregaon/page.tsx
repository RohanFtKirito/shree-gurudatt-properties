import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Office Space for Rent in Goregaon | Commercial Properties",
  description:
    "Find premium office spaces for rent in Goregaon, Mumbai. Browse Grade A offices in IT parks and commercial buildings with modern infrastructure.",
  alternates: {
    canonical: "https://shreegurudattproperties.com/office-space-goregaon",
  },
};

export default function OfficeSpacePage() {
  return (
    <>
      <Header />
      <main className="py-16">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Office Space in Goregaon
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Looking for professional office space in Goregaon? We offer premium
            commercial properties including furnished offices, co-working spaces,
            and Grade A buildings in Mumbai's leading IT hub.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold mb-2">
                IT Park Offices
              </h3>
              <p className="text-sm text-muted-foreground">
                Premium office spaces in Goregaon East IT parks with world-class amenities.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold mb-2">
                Ready to Move
              </h3>
              <p className="text-sm text-muted-foreground">
                Fully furnished offices with workstations, meeting rooms, and parking.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold mb-2">
                Flexible Leasing
              </h3>
              <p className="text-sm text-muted-foreground">
                Options for long-term and short-term leases to suit your business needs.
              </p>
            </div>
          </div>

          <h2 className="font-heading text-2xl font-semibold mb-6">
            Why Choose Goregaon for Your Office?
          </h2>
          <div className="prose max-w-none mb-10">
            <ul className="space-y-2 text-muted-foreground">
              <li>• Located in the heart of Mumbai's IT corridor</li>
              <li>• Excellent connectivity via Metro and Western Express Highway</li>
              <li>• Proximity to major corporate parks (Mindspace, Goregaon East)</li>
              <li>• Wide range of options from budget to premium Grade A</li>
              <li>• Good availability of restaurants, cafes, and hotels nearby</li>
            </ul>
          </div>

          <div className="text-center">
            <Link
              href="/properties?type=Commercial"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Commercial Properties
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

