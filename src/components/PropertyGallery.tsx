'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyGalleryProps {
  property: any;
}

export default function PropertyGallery({ property }: PropertyGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = property.images || [];

  const goPrev = () => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goNext = () => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  if (images.length === 0) {
    return (
      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-muted flex items-center justify-center">
          <span className="text-muted-foreground">No images available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-lg max-h-[500px] flex items-center justify-center bg-muted group">
        <Image
          src={images[currentImageIndex]}
          alt={property.title}
          width={900}
          height={600}
          className="max-h-[500px] w-auto object-contain transition-opacity duration-300"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
            >
              <ChevronRight className="h-5 w-5 text-gray-800" />
            </button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img: string, i: number) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                i === currentImageIndex
                  ? 'border-primary ring-2 ring-primary ring-offset-2'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image 
                src={img} 
                alt={`${property.title} - image ${i + 1}`}
                width={80} 
                height={64} 
                className="h-full w-full object-cover" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
