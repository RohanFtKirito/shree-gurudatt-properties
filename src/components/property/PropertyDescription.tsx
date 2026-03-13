interface PropertyDescriptionProps {
  description: string;
}

export default function PropertyDescription({
  description,
}: PropertyDescriptionProps) {
  // Split description into paragraphs if it contains double newlines
  const paragraphs = description.split(/\n\n/).filter(p => p.trim());

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-semibold text-foreground">
        About This Property
      </h2>
      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-muted-foreground leading-relaxed text-sm"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
