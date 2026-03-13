import { CheckCircle2 } from "lucide-react";

interface PropertyAmenitiesProps {
  amenities?: string[];
}

export default function PropertyAmenities({
  amenities = [],
}: PropertyAmenitiesProps) {
  if (!amenities || amenities.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-semibold text-foreground">
        Amenities
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity) => (
          <div
            key={amenity}
            className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
          >
            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="text-sm text-foreground">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
