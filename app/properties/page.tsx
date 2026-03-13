"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  collection, 
  query, 
  getDocs, 
  orderBy,
  where 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import PropertyCard from "@/components/PropertyCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Loader2, Building2 } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const configs = ["1BHK", "2BHK", "3BHK", "Office", "Shop"];

interface Property {
  id: string;
  title: string;
  slug?: string;
  price: string;
  location: string;
  type: string;
  configuration?: string;
  area?: string;
  status: string;
  description: string;
  images: string[];
  amenities?: string[];
  createdAt?: any;
}

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const typeFilter = searchParams.get("type") || "";
  const statusFilter = searchParams.get("status") || "";
  const configFilter = searchParams.get("config") || "";

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        let q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        
        const props = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Property[];
        
        setProperties(props);
      } catch (error) {
        console.error("Error fetching properties:", error);
        // Fall back to static data if Firestore fails
        const { properties: staticProperties } = await import("@/data/properties");
        setProperties(staticProperties as unknown as Property[]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filtered = properties.filter((p) => {
    // Type filter
    if (typeFilter && p.type !== typeFilter) return false;

    // Status filter
    if (statusFilter && p.status !== statusFilter) return false;

    // Configuration filter - support multiple configurations (e.g., "2BHK, 3BHK")
    if (configFilter) {
      const propertyConfigs = p.configuration
        ?.toString() // Ensure it's a string
        .split(",")   // Split by comma for multiple configs
        .map(c => c.trim().toLowerCase()) // Trim whitespace and lowercase for comparison
        || [];

      if (!propertyConfigs.includes(configFilter.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const createQueryString = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    return params.toString();
  };

  return (
    <>
      <Header />
      <main className="py-10">
        <div className="container">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Properties in Goregaon</h1>
          <p className="text-muted-foreground mb-8">Browse verified residential and commercial properties in Goregaon, Mumbai.</p>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <select
              value={typeFilter}
              onChange={(e) => {
                const query = createQueryString("type", e.target.value);
                window.history.pushState(null, "", `?${query}`);
                setPage(1);
              }}
              className="rounded-md border border-input bg-card px-3 py-2 text-sm font-body text-foreground"
            >
              <option value="">All Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                const query = createQueryString("status", e.target.value);
                window.history.pushState(null, "", `?${query}`);
                setPage(1);
              }}
              className="rounded-md border border-input bg-card px-3 py-2 text-sm font-body text-foreground"
            >
              <option value="">Buy / Rent</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>

            <select
              value={configFilter}
              onChange={(e) => {
                const query = createQueryString("config", e.target.value);
                window.history.pushState(null, "", `?${query}`);
                setPage(1);
              }}
              className="rounded-md border border-input bg-card px-3 py-2 text-sm font-body text-foreground"
            >
              <option value="">All Configurations</option>
              {configs.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* Results */}
          {!loading && paginated.length === 0 ? (
            <div className="text-center py-16">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No properties found matching your filters.</p>
            </div>
          ) : !loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-9 w-9 rounded-md font-heading text-sm font-medium transition-colors ${
                    p === page
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </>
    }>
      <PropertiesContent />
    </Suspense>
  );
}

