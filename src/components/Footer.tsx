import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-3">
              Shree GuruDatt Properties
            </h3>
            <p className="text-sm text-background/70 font-body leading-relaxed">
              Your trusted partner for residential and commercial properties in Goregaon, Mumbai.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 text-secondary">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/" className="hover:text-background transition-colors">Home</Link></li>
              <li><Link href="/properties" className="hover:text-background transition-colors">Properties</Link></li>
              <li><Link href="/about" className="hover:text-background transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-background transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Property Categories */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 text-secondary">Property Categories</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/properties?type=Residential" className="hover:text-background transition-colors">Residential Properties</Link></li>
              <li><Link href="/properties?type=Commercial" className="hover:text-background transition-colors">Commercial Properties</Link></li>
              <li><Link href="/properties?status=For+Rent" className="hover:text-background transition-colors">Rental Properties</Link></li>
              <li><Link href="/properties?status=For+Sale" className="hover:text-background transition-colors">Properties for Sale</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 text-secondary">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-secondary" />
                <a href="tel:+919876543210" className="hover:text-background transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-secondary" />
                <a href="mailto:info@shreegurudatt.com" className="hover:text-background transition-colors">info@shreegurudatt.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-secondary" />
                <span>Goregaon West, Mumbai 400104</span>
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

