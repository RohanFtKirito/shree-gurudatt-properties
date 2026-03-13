"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Building2, User, Phone, Mail, MessageSquare, Trash2, Check, X, ExternalLink, Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { format } from "date-fns";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  property_id: string;
  property_title: string;
  property_slug: string;
  status: string;
  created_at: any;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new" | "contacted">("all");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "property_leads"), orderBy("created_at", "desc"), limit(50));
      const snapshot = await getDocs(q);

      const leadsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Lead[];

      setLeads(leadsData);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast.error("Failed to load leads. Make sure Firestore is configured.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    try {
      await deleteDoc(doc(db, "property_leads", leadId));
      setLeads(leads.filter((l) => l.id !== leadId));
      toast.success("Lead deleted successfully");
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast.error("Failed to delete lead");
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "property_leads", leadId), {
        status: newStatus,
        updated_at: new Date(),
      });

      setLeads(leads.map((l) =>
        l.id === leadId ? { ...l, status: newStatus } : l
      ));

      toast.success(`Lead marked as ${newStatus}`);
    } catch (error) {
      console.error("Error updating lead status:", error);
      toast.error("Failed to update lead status");
    }
  };

  const exportToCSV = () => {
    const headers = ["Name", "Phone", "Email", "Property", "Message", "Status", "Date"];
    const csvContent = [
      headers.join(","),
      ...filteredLeads.map((lead) => [
        `"${lead.name}"`,
        `"${lead.phone}"`,
        `"${lead.email}"`,
        `"${lead.property_title}"`,
        `"${lead.message.replace(/"/g, '""')}"`,
        `"${lead.status}"`,
        `"${lead.created_at ? format(lead.created_at.toDate(), "yyyy-MM-dd HH:mm") : "N/A"}"`,
      ].join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Leads exported successfully");
  };

  const filteredLeads = leads.filter((lead) => {
    if (filter === "all") return true;
    return lead.status === filter;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Property Enquiries
        </h1>
        <p className="text-muted-foreground">
          Manage all property enquiries and leads
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Leads</p>
              <p className="text-2xl font-bold text-foreground mt-1">{leads.length}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">New Leads</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {leads.filter((l) => l.status === "new").length}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <User className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Contacted</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {leads.filter((l) => l.status === "contacted").length}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Check className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            All Leads ({leads.length})
          </button>
          <button
            onClick={() => setFilter("new")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === "new"
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            New ({leads.filter((l) => l.status === "new").length})
          </button>
          <button
            onClick={() => setFilter("contacted")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === "contacted"
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            Contacted ({leads.filter((l) => l.status === "contacted").length})
          </button>
        </div>

        <button
          onClick={exportToCSV}
          disabled={leads.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Leads Found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {filter === "all"
              ? "No property enquiries yet. Enquiries will appear here when users submit forms."
              : `No ${filter} leads found.`}
          </p>
          {filter !== "all" && (
            <button
              onClick={() => setFilter("all")}
              className="text-primary hover:underline text-sm"
            >
              View all leads
            </button>
          )}
        </div>
      ) : (
        /* Leads List */
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                {/* Lead Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading text-base font-semibold text-foreground">
                          {lead.name}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            lead.status === "new"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-2">
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {lead.phone}
                        </a>
                        {lead.email && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1 hover:text-primary transition-colors"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            {lead.email}
                          </a>
                        )}
                        {lead.created_at && (
                          <span className="flex items-center gap-1">
                            {format(lead.created_at.toDate(), "MMM dd, yyyy")}
                          </span>
                        )}
                      </div>

                      {/* Property Link */}
                      {lead.property_slug && (
                        <Link
                          href={`/property/${lead.property_slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-2"
                        >
                          <Building2 className="h-3.5 w-3.5" />
                          {lead.property_title}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}

                      {/* Message */}
                      {lead.message && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                          "{lead.message}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {lead.status === "new" && (
                    <button
                      onClick={() => handleStatusChange(lead.id, "contacted")}
                      className="p-2 rounded-md bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors"
                      title="Mark as contacted"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}

                  <a
                    href={`tel:${lead.phone}`}
                    className="p-2 rounded-md bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
                    title="Call lead"
                  >
                    <Phone className="h-4 w-4" />
                  </a>

                  <a
                    href={`https://wa.me/91${lead.phone.replace(/\s/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                    title="WhatsApp"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </a>

                  <button
                    onClick={() => handleDelete(lead.id)}
                    className="p-2 rounded-md bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors"
                    title="Delete lead"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
