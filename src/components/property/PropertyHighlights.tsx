import { Check } from "lucide-react";

interface PropertyHighlightsProps {
  highlights?: string[];
}

const defaultHighlights: string[] = [];

export default function PropertyHighlights({
  highlights = defaultHighlights,
}: PropertyHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-semibold text-foreground">
        Property Highlights
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border"
          >
            <Check className="h-4 w-4 text-secondary flex-shrink-0" />
            <span className="text-sm text-foreground">{highlight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
