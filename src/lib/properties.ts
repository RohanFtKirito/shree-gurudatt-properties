import { 
  collection, 
  query, 
  getDocs, 
  orderBy,
  where,
  DocumentData 
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Property {
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
  createdAt: any;
}

// Fetch all properties
export async function getProperties(): Promise<Property[]> {
  try {
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData;
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
      };
    }) as Property[];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

// Fetch properties by type
export async function getPropertiesByType(type: string): Promise<Property[]> {
  try {
    const q = query(
      collection(db, "properties"),
      where("type", "==", type),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Property[];
  } catch (error) {
    console.error("Error fetching properties by type:", error);
    return [];
  }
}

// Fetch properties by status
export async function getPropertiesByStatus(status: string): Promise<Property[]> {
  try {
    const q = query(
      collection(db, "properties"),
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Property[];
  } catch (error) {
    console.error("Error fetching properties by status:", error);
    return [];
  }
}

// Fetch single property by ID
export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const { doc, getDoc } = await import("firebase/firestore");
    const docRef = doc(db, "properties", id);
    const snapshot = await getDoc(docRef);
    
    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...snapshot.data(),
      } as Property;
    }
    return null;
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    return null;
  }
}

// Fetch single property by slug
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const q = query(
      collection(db, "properties"),
      where("slug", "==", slug)
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const data = doc.data() as DocumentData;
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
      } as Property;
    }
    return null;
  } catch (error) {
    console.error("Error fetching property by slug:", error);
    return null;
  }
}

