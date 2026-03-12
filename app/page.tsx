"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, MapPin, Handshake, Users, Building, Home, Key, TrendingUp, Phone, Mail, MessageCircle, Loader2 } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PropertyCard from "@/components/PropertyCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

interface Property {
  id: string;
  title: string;
  slug?: string;
  price: string;
  location: string;
  type: string;
  configuration?: string;
  area?: string;
  status: string;
  description: string;
  images: string[];
  amenities?: string[];
  createdAt?: any;
}

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const snapshot = await getDocs(collection(db, "properties"));
        
        const propertyList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Property[];
        
        setProperties(propertyList);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const featured = properties.slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
          <Image 
            src="/hero-bg.jpg" 
            alt="Modern high-rise buildings in Goregaon Mumbai" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative z-10 container text-center py-20">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 animate-fade-in-up">
              Find the Best Properties in Goregaon
            </h1>
            <p className="font-body text-lg md:text-xl text-background/80 mb-8 max-w-2xl mx-auto" style={{ animationDelay: "0.15s", animationFillMode: "forwards", opacity: 0, animation: "fade-in-up 0.6s ease-out 0.15s forwards" }}>
              Residential and Commercial Properties in Goregaon, Mumbai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: "0.3s", animationFillMode: "forwards", opacity: 0, animation: "fade-in-up 0.6s ease-out 0.3s forwards" }}>
              <Link
                href="/properties"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                View Properties
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border-2 border-secondary bg-transparent px-6 py-3 font-heading text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                Contact Agent
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-16">
          <div className="container">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground text-center mb-2">Featured Properties</h2>
            <p className="text-muted-foreground text-center mb-10">Handpicked listings from Goregaon, Mumbai</p>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : featured.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No properties available yet.</p>
                <p className="text-sm text-muted-foreground mt-2">Add properties from the admin panel to see them here.</p>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <Link href="/properties" className="inline-flex items-center rounded-md bg-secondary px-5 py-2.5 font-heading text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
                View All Properties →
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-card">
          <div className="container max-w-3xl text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-10">Why Choose Us</h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {[
                { icon: MapPin, title: "Local Goregaon Expertise", desc: "Deep knowledge of the Goregaon real estate market, pricing trends, and neighbourhood insights." },
                { icon: ShieldCheck, title: "Verified Properties", desc: "Every listing is personally verified by our team before being published." },
                { icon: Handshake, title: "Transparent Deals", desc: "No hidden charges. Clear documentation and honest guidance throughout the process." },
                { icon: Users, title: "Personalized Assistance", desc: "Dedicated support from property search to registration, tailored to your needs." },
              ].map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20 mb-4">
                    <item.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Property Categories */}
        <section className="py-16">
          <div className="container">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">Property Categories</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { label: "Residential Properties", img: "/cat-residential.jpg", href: "/properties?type=Residential", icon: Home },
                { label: "Commercial Properties", img: "/cat-commercial.jpg", href: "/properties?type=Commercial", icon: Building },
                { label: "Rental Properties", img: "/property-1.jpg", href: "/properties?status=For+Rent", icon: Key },
                { label: "Investment Opportunities", img: "/property-3.jpg", href: "/properties", icon: TrendingUp },
              ].map((cat) => (
                <Link key={cat.label} href={cat.href} className="group relative overflow-hidden rounded-lg aspect-[16/9]">
                  <Image 
                    src={cat.img} 
                    alt={cat.label} 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/50 transition-colors group-hover:bg-foreground/40" />
                  <div className="relative z-10 flex h-full items-center justify-center gap-2">
                    <cat.icon className="h-6 w-6 text-secondary" />
                    <span className="font-heading text-lg font-semibold text-background">{cat.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About Preview */}
        <section className="py-16 bg-card">
          <div className="container max-w-3xl text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">About Shree GuruDatt Properties</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Shree GuruDatt Properties specializes in helping clients find the best residential and commercial properties in Goregaon and nearby areas. With deep local market knowledge and a commitment to transparency, we ensure a smooth property buying and renting experience.
            </p>
            <Link href="/about" className="inline-flex items-center rounded-md bg-secondary px-5 py-2.5 font-heading text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
              Learn More About Us →
            </Link>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">Get In Touch</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
              {[
                { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
                { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/919876543210" },
                { icon: Mail, label: "Email", value: "info@shreegurudatt.com", href: "mailto:info@shreegurudatt.com" },
                { icon: MapPin, label: "Office", value: "Goregaon West, Mumbai", href: "#" },
              ].map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
                  <item.icon className="h-6 w-6 text-primary mb-3" />
                  <span className="font-heading text-sm font-semibold text-foreground mb-1">{item.label}</span>
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                </a>
              ))}
            </div>
            <div className="mt-8 rounded-lg overflow-hidden max-w-4xl mx-auto">
              <iframe
                title="Shree GuruDatt Properties Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.5!2d72.84!3d19.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA5JzM2LjAiTiA3MsKwNTAnMjQuMCJF!5e0!3m2!1sen!2sin!4v1600000000000"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

