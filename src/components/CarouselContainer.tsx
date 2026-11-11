import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselContainerProps {
  children: React.ReactNode;
  className?: string;
  showArrows?: boolean;
}

export const CarouselContainer: React.FC<CarouselContainerProps> = ({
  children,
  className = '',
  showArrows = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse wheel horizontal forwarding
  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        containerRef.current.scrollLeft += e.deltaY * 0.7;
      }
    }
  };

  // Drag to scroll for mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // multiplier for smooth drag
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const scrollByAmount = (amount: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Scrollable track */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`flex overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing select-none ${className}`}
      >
        {children}
      </div>

      {/* Subtle chevron controls on hover */}
      {showArrows && (
        <>
          <button
            type="button"
            onClick={() => scrollByAmount(-220)}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 text-slate-700 shadow-md border border-pink-100 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-white hover:text-[#ED64A6] transition-all z-20 focus:outline-none"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(220)}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 text-slate-700 shadow-md border border-pink-100 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-white hover:text-[#ED64A6] transition-all z-20 focus:outline-none"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
};
