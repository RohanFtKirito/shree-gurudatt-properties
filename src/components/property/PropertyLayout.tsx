import { ReactNode } from "react";
import Link from "next/link";

interface PropertyLayoutProps {
  breadcrumbTitle: string;
  gallery: ReactNode;
  header: ReactNode;
  quickInfo: ReactNode;
  highlights?: ReactNode;
  description: ReactNode;
  amenities?: ReactNode;
  contactBar: ReactNode;
  location: ReactNode;
  enquiryForm?: ReactNode;
}

export default function PropertyLayout({
  breadcrumbTitle,
  gallery,
  header,
  quickInfo,
  highlights,
  description,
  amenities,
  contactBar,
  location,
  enquiryForm,
}: PropertyLayoutProps) {
  return (
    <main className="py-10">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/properties" className="hover:text-primary">
            Properties
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{breadcrumbTitle}</span>
        </nav>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          {/* Gallery Column */}
          <div className="space-y-3">{gallery}</div>

          {/* Property Info Column */}
          <div className="space-y-6">
            {header}
            {quickInfo}
            {highlights}
            {description}
            {amenities}
            {contactBar}
          </div>
        </div>

        {/* Location Section */}
        <div className="mt-10">{location}</div>

        {/* Enquiry Form Section */}
        {enquiryForm && (
          <div className="mt-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              {enquiryForm}
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                  Why Choose Shree Guru Datta Properties?
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Verified properties with complete documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Transparent pricing with no hidden charges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Expert guidance through entire buying process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Deep local knowledge of Goregaon real estate market</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Quick response to all property enquiries</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Need immediate assistance?</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Call us at <a href="tel:+919167955841" className="text-primary hover:underline">+91 9167955841</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
