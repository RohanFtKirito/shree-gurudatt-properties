import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">
              Shree GuruDatt Properties
            </h3>
            <p className="text-sm text-background/70 font-body leading-relaxed max-w-xs">
              Your trusted partner for residential and commercial properties in Goregaon, Mumbai.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold text-secondary">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/" className="hover:text-background transition-colors">Home</Link></li>
              <li><Link href="/properties" className="hover:text-background transition-colors">Properties</Link></li>
              <li><Link href="/about" className="hover:text-background transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-background transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Property Categories */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold text-secondary">Property Categories</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/properties?type=Residential" className="hover:text-background transition-colors">Residential Properties</Link></li>
              <li><Link href="/properties?type=Commercial" className="hover:text-background transition-colors">Commercial Properties</Link></li>
              <li><Link href="/properties?status=For+Rent" className="hover:text-background transition-colors">Rental Properties</Link></li>
              <li><Link href="/properties?status=For+Sale" className="hover:text-background transition-colors">Properties for Sale</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold text-secondary">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-secondary flex-shrink-0" />
                <a href="tel:+919167955841" className="hover:text-background transition-colors break-words leading-tight">+91 9167955841</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-secondary flex-shrink-0" />
                <a href="mailto:shreegurudattproperties@gmail.com" className="hover:text-background transition-colors break-words leading-tight">shreegurudattproperties@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-secondary flex-shrink-0" />
                <span className="break-words leading-tight">Goregaon East, Mumbai 400065</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-background/20 text-center text-sm text-background/50">
          © {new Date().getFullYear()} Shree GuruDatt Properties. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

