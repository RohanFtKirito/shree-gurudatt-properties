"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  collection, 
  query, 
  getDocs, 
  orderBy,
  where 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Building2, Plus, Eye, DollarSign } from "lucide-react";

interface PropertyStats {
  total: number;
  forSale: number;
  forRent: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<PropertyStats>({
    total: 0,
    forSale: 0,
    forRent: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total properties
        const totalQuery = query(collection(db, "properties"));
        const totalSnapshot = await getDocs(totalQuery);
        
        // Get for sale properties
        const forSaleQuery = query(
          collection(db, "properties"),
          where("status", "==", "For Sale")
        );
        const forSaleSnapshot = await getDocs(forSaleQuery);
        
        // Get for rent properties
        const forRentQuery = query(
          collection(db, "properties"),
          where("status", "==", "For Rent")
        );
        const forRentSnapshot = await getDocs(forRentQuery);

        setStats({
          total: totalSnapshot.size,
          forSale: forSaleSnapshot.size,
          forRent: forRentSnapshot.size,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        // If Firestore doesn't exist yet, show 0
        setStats({ total: 0, forSale: 0, forRent: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome to Shree GuruDatt Properties Admin
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Properties</p>
              <p className="text-2xl font-bold text-foreground">
                {loading ? "..." : stats.total}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">For Sale</p>
              <p className="text-2xl font-bold text-foreground">
                {loading ? "..." : stats.forSale}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Eye className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">For Rent</p>
              <p className="text-2xl font-bold text-foreground">
                {loading ? "..." : stats.forRent}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/add-property"
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <Plus className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Add New Property</p>
              <p className="text-sm text-muted-foreground">Create a new listing</p>
            </div>
          </Link>

          <Link
            href="/admin/properties"
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Building2 className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Manage Properties</p>
              <p className="text-sm text-muted-foreground">View and edit listings</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Note:</strong> If this is your first time, make sure to set up Firebase 
          and add your Firebase configuration in the environment variables. Properties 
          added will appear here and on the main website.
        </p>
      </div>
    </div>
  );
}

