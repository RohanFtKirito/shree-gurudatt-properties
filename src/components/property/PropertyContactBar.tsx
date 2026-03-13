import { Phone, MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";

interface PropertyContactBarProps {
  phoneNumber?: string;
  propertyName: string;
}

export default function PropertyContactBar({
  phoneNumber = "+919167955841",
  propertyName,
}: PropertyContactBarProps) {
  const whatsappMessage = `Hi, I'm interested in ${encodeURIComponent(propertyName)}`;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={`tel:${phoneNumber}`}
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-heading text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Phone className="h-4 w-4" />
        Call Now
      </a>
      <a
        href={`https://wa.me/919167955841?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 font-heading text-sm font-semibold text-card transition-colors hover:bg-[#25D366]/90"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
      <Link
        href="/contact"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border-2 border-secondary px-5 py-3 font-heading text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
      >
        <Calendar className="h-4 w-4" />
        Schedule Visit
      </Link>
    </div>
  );
}
