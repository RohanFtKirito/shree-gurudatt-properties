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
import { Building2, Plus, Eye, DollarSign, ArrowRight, MessageCircle, Settings, TrendingUp } from "lucide-react";

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
    <div className="space-y-10">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-3">
          Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Welcome to Shree Guru Datta Properties Admin
        </p>
      </div>

      {/* Stats Cards */}
      <div>
        <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
          Overview
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Total Properties</p>
                <p className="text-4xl font-bold text-foreground">
                  {loading ? "..." : stats.total}
                </p>
              </div>
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">All listings</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">For Sale</p>
                <p className="text-4xl font-bold text-foreground">
                  {loading ? "..." : stats.forSale}
                </p>
              </div>
              <div className="h-14 w-14 rounded-xl bg-green-500/10 flex items-center justify-center">
                <DollarSign className="h-7 w-7 text-green-500" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">Properties for sale</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">For Rent</p>
                <p className="text-4xl font-bold text-foreground">
                  {loading ? "..." : stats.forRent}
                </p>
              </div>
              <div className="h-14 w-14 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Eye className="h-7 w-7 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">Rental properties</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
          Quick Actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/add-property"
            className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 hover:border-primary/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
              Add New Property
            </h3>
            <p className="text-sm text-muted-foreground">
              Create a new property listing with images, details, and pricing information.
            </p>
          </Link>

          <Link
            href="/admin/properties"
            className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 hover:border-primary/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Building2 className="h-6 w-6 text-secondary" />
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
              Manage Properties
            </h3>
            <p className="text-sm text-muted-foreground">
              View, edit, or delete existing property listings from your inventory.
            </p>
          </Link>

          <Link
            href="/admin/leads"
            className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 hover:border-primary/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <MessageCircle className="h-6 w-6 text-green-500" />
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
              View Leads
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage property enquiries, track lead status, and follow up with potential buyers.
            </p>
          </Link>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
            <Settings className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-heading text-base font-semibold text-foreground mb-2">
              Getting Started
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If this is your first time, make sure to set up Firebase and add your Firebase configuration in the environment variables. Properties added will appear here and on the main website automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

