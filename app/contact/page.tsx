"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    toast.success("Thank you! We'll get back to you soon.");
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <>
      <Header />
      <main className="py-16">
        <div className="container max-w-4xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">Contact Us</h1>
          <p className="text-muted-foreground text-center mb-10">Get in touch with Shree Guru Datta Properties for property enquiries.</p>

          <div className="grid gap-10 md:grid-cols-2">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-heading font-medium text-foreground mb-1">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your name"
                  maxLength={100}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-heading font-medium text-foreground mb-1">Phone *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="+91 98765 43210"
                  maxLength={15}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-heading font-medium text-foreground mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="you@email.com"
                  maxLength={255}
                />
              </div>
              <div>
                <label className="block text-sm font-heading font-medium text-foreground mb-1">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="I'm interested in..."
                  maxLength={1000}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-primary px-5 py-3 font-heading text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Send Enquiry
              </button>
            </form>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Reach Us Directly</h2>
                <div className="space-y-4">
                  <a href="tel:+919167955841" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="break-words leading-tight">+91 9167955841</span>
                  </a>
                  <a href="https://wa.me/919167955841" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <MessageCircle className="h-5 w-5 text-[#25D366] flex-shrink-0" />
                    <span>WhatsApp Chat</span>
                  </a>
                  <a href="mailto:shreegurudattproperties@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="break-words leading-tight">shreegurudattproperties@gmail.com</span>
                  </a>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="break-words leading-tight">Off Gokuldham, Goregaon East, Mumbai 400065, Maharashtra, India</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden">
                <iframe
                  title="Shree Guru Datta Properties Office Location - Goregaon East, Mumbai"
                  src="https://www.google.com/maps?q=19.1663,72.8526&z=15&output=embed"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* View on Google Maps Button */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Shree+Guru+Datta+Properties+Goregaon"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#4285F4] hover:bg-[#3367D6] text-white px-5 py-3 font-heading text-sm font-semibold transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s1.5-2.5 4-5c2.5 2.5 4 5 4 5 7-7.75 7-13 7-13s-3.13-7-7-7zm0 9.75c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

