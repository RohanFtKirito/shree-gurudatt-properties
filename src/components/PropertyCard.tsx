"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

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

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const imageUrl = property.images && property.images.length > 0 
    ? property.images[0] 
    : "/placeholder.svg";

  // Use slug if available, otherwise use id
  const propertyUrl = property.slug ? `/property/${property.slug}` : `/property/${property.id}`;

  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <Link href={propertyUrl} className="relative block overflow-hidden aspect-[4/3]">
        <Image
          src={imageUrl}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {property.status && (
          <span className="absolute top-3 left-3 rounded-sm bg-primary px-2.5 py-1 text-xs font-heading font-medium text-primary-foreground">
            {property.status}
          </span>
        )}
        {property.configuration && (
          <span className="absolute top-3 right-3 rounded-sm bg-secondary px-2.5 py-1 text-xs font-heading font-semibold text-secondary-foreground">
            {property.configuration}
          </span>
        )}
      </Link>
      <div className="p-4">
        <h3 className="font-heading text-base font-semibold text-card-foreground line-clamp-1 mb-1">
          {property.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {property.location}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg font-bold text-secondary">
            {property.price}
          </span>
          <Link
            href={propertyUrl}
            className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs font-heading font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

