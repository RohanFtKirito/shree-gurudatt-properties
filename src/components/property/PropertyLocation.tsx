interface PropertyLocationProps {
  mapEmbedUrl?: string;
  propertyName?: string;
}

const DEFAULT_MAP_URL =
  "https://www.google.com/maps?q=Shree+GuruDatt+Properties+Goregaon+East+Mumbai&output=embed";

export default function PropertyLocation({
  mapEmbedUrl = DEFAULT_MAP_URL,
  propertyName = "Property Location",
}: PropertyLocationProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-semibold text-foreground">
        Project Location
      </h2>
      <div className="rounded-lg overflow-hidden border border-border">
        <iframe
          title={propertyName}
          src={mapEmbedUrl}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
