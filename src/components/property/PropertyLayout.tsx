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
      </div>
    </main>
  );
}
