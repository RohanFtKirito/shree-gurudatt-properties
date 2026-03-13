import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties in Goregaon | Shree Guru Datta Properties",
  description: "Find the best residential and commercial properties in Goregaon East and West with Shree Guru Datta Properties. Browse verified flats, apartments, offices, and shops.",
  keywords: [
    "Goregaon properties",
    "flats in Goregaon",
    "real estate Goregaon Mumbai",
    "Shree Guru Datta Properties",
    "properties in Goregaon East",
    "properties in Goregaon West",
    "2BHK Goregaon",
    "3BHK Goregaon",
    "commercial properties Goregaon"
  ],
  openGraph: {
    title: "Properties in Goregaon | Shree Guru Datta Properties",
    description: "Find the best residential and commercial properties in Goregaon East and West with Shree Guru Datta Properties.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Properties in Goregaon | Shree Guru Datta Properties",
    description: "Find the best residential and commercial properties in Goregaon East and West with Shree Guru Datta Properties.",
  },
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
