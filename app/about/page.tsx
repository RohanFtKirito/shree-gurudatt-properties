import { Metadata } from "next";
import { MapPin, Award, Users, Building } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "About Us | Shree Guru Datta Properties",
  description: "Learn about Shree Guru Datta Properties - your trusted real estate partner in Goregaon, Mumbai. We specialize in residential and commercial properties.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="py-16">
        <div className="container max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
            About Shree Guru Datta Properties
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-8 text-center">
            Shree Guru Datta Properties is a trusted real estate agency based in Goregaon, Mumbai. We specialize in residential and commercial property sales, purchases, and rentals across Goregaon and neighbouring areas including Malad, Kandivali, and Jogeshwari.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Award, label: "Years of Experience", value: "10+" },
              { icon: Building, label: "Properties Listed", value: "500+" },
              { icon: Users, label: "Happy Clients", value: "1,000+" },
              { icon: MapPin, label: "Areas Served", value: "5+" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-card border border-border p-5 text-center">
                <stat.icon className="h-6 w-6 text-secondary mx-auto mb-2" />
                <div className="font-heading text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="mb-10">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To make property buying, selling, and renting in Goregaon a seamless and transparent experience. We believe every client deserves honest advice, verified property options, and personalised support throughout their real estate journey.
            </p>
          </div>

          {/* Areas */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">Areas We Serve</h2>
            <div className="flex flex-wrap gap-2">
              {["Goregaon West", "Goregaon East", "Malad West", "Malad East", "Kandivali", "Jogeshwari", "Oshiwara"].map((area) => (
                <span key={area} className="inline-flex items-center gap-1 rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

