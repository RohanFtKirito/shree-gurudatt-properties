import { MapPin, Home, Ruler, Building2, Tag } from "lucide-react";

interface PropertyQuickInfoProps {
  location: string;
  configuration?: string;
  area?: string;
  type?: string;
  status: string;
}

export default function PropertyQuickInfo({
  location,
  configuration,
  area,
  type,
  status,
}: PropertyQuickInfoProps) {
  const infoItems = [
    { icon: MapPin, label: "Location", value: location },
    { icon: Home, label: "Configuration", value: configuration || "N/A" },
    { icon: Ruler, label: "Area", value: area || "N/A" },
    { icon: Building2, label: "Property Type", value: type },
    { icon: Tag, label: "Status", value: status },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {infoItems.map((item) => (
        <div
          key={item.label}
          className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card"
        >
          <item.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
            <p className="text-sm font-medium text-foreground truncate">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
