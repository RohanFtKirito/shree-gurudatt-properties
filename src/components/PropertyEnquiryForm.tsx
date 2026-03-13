"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { User, Phone, Mail, MessageSquare, Send, Loader2 } from "lucide-react";

interface PropertyEnquiryFormProps {
  propertyId: string;
  propertyTitle: string;
  propertySlug?: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function PropertyEnquiryForm({
  propertyId,
  propertyTitle,
  propertySlug,
}: PropertyEnquiryFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: `Hi, I'm interested in ${propertyTitle}. Please share more details.`,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    // Name validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }

    if (formData.name.trim().length < 2) {
      toast.error("Name must be at least 2 characters");
      return false;
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }

    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }

    // Email validation
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        toast.error("Please enter a valid email address");
        return false;
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      toast.error("Please enter a message");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Save lead to Firestore
      const docRef = await addDoc(collection(db, "property_leads"), {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || "",
        message: formData.message.trim(),
        property_id: propertyId,
        property_title: propertyTitle,
        property_slug: propertySlug || "",
        status: "new",
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });

      console.log("Lead saved with ID:", docRef.id);

      // Show success message
      toast.success("Thank you! Our agent will contact you soon.", {
        duration: 5000,
      });

      setSubmitted(true);
      setLoading(false);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: `Hi, I'm interested in ${propertyTitle}. Please share more details.`,
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving lead:", error);
      toast.error("Failed to submit enquiry. Please try again or call us directly.");
      setLoading(false);
    }
  };

  const handleWhatsAppEnquiry = () => {
    const message = encodeURIComponent(
      `Hello, I'm interested in this property:\n\n${propertyTitle}\n\nhttps://shreegurudattproperties.com/property/${propertySlug || propertyId}\n\nPlease share more details.`
    );
    window.open(`https://wa.me/919167955841?text=${message}`, "_blank");
  };

  if (submitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="font-heading text-lg font-semibold text-green-900 dark:text-green-100">
            Enquiry Submitted Successfully!
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            Our agent will contact you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
          Enquire About This Property
        </h3>
        <p className="text-sm text-muted-foreground">
          Fill the form below and our agent will contact you shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-heading font-medium text-foreground mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
              className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              maxLength={100}
              disabled={loading}
            />
          </div>
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-heading font-medium text-foreground mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setFormData({ ...formData, phone: value });
              }}
              placeholder="+91 98765 43210"
              className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              maxLength={15}
              disabled={loading}
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-heading font-medium text-foreground mb-2">
            Email <span className="text-muted-foreground">(Optional)</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              maxLength={255}
              disabled={loading}
            />
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-heading font-medium text-foreground mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="I'm interested in this property..."
              rows={4}
              className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              maxLength={1000}
              disabled={loading}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-heading text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Enquiry
            </>
          )}
        </button>

        {/* WhatsApp Button */}
        <button
          type="button"
          onClick={handleWhatsAppEnquiry}
          className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-[#20BA5A] disabled:opacity-50"
        >
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52.075-.149.669-1.612.912-2.207.242-.599.242-.599.464-.599.123 0 .247 0 .371.01.124.01.266.05.405.198.149.149.648.648.848.848.199.199.405.198.604.099.199-.099.848-.848 1.046-1.047.199-.149.266-.149.405-.149.124 0 .266.025.405.075.149.05.648.298.848.497.199.149.464.371.74.598.242.199.464.371.74.497.149.05.266.05.405-.075.199-.149.464-.598.848-1.047.199-.199.266-.149.405-.149.124 0 .266.025.405.075.149.05.648.298.848.497.199.149.464.371.74.598.242.199.464.371.74.497.149.05.266.05.405-.075.199-.149.464-.598.848-1.047.199-.199.266-.149.405-.149.124 0 .266.025.405.075.149.05.648.298.848.497.199.149.464.371.74.598.242.199.464.371.74.497.149.05.266.05.405-.075.199-.149.464-.598.848-1.047z" />
          </svg>
          Enquire on WhatsApp
        </button>

        {/* Privacy Notice */}
        <p className="text-xs text-center text-muted-foreground">
          By submitting this form, you agree to our privacy policy. We'll contact you
          regarding your property enquiry.
        </p>
      </form>
    </div>
  );
}
