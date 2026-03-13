import { MapPin } from "lucide-react";

interface PropertyHeaderProps {
  title: string;
  price: string;
  location: string;
  status: string;
  configuration?: string;
  type?: string;
}

export default function PropertyHeader({
  title,
  price,
  location,
  status,
  configuration,
  type,
}: PropertyHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Title */}
      <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
        {title}
      </h1>

      {/* Price - Visually Prominent */}
      <p className="font-heading text-2xl md:text-3xl font-bold text-secondary">
        {price}
      </p>

      {/* Location */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-4 w-4 text-primary" />
        <span className="text-sm">{location}</span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-sm bg-primary px-3 py-1.5 text-xs font-heading font-medium text-primary-foreground">
          {status}
        </span>
        {configuration && (
          <span className="rounded-sm bg-secondary px-3 py-1.5 text-xs font-heading font-semibold text-secondary-foreground">
            {configuration}
          </span>
        )}
        {type && (
          <span className="rounded-sm bg-muted px-3 py-1.5 text-xs font-heading font-medium text-muted-foreground">
            {type}
          </span>
        )}
      </div>
    </div>
  );
}
