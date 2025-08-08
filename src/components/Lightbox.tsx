import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface LightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  startIndex?: number;
}

const Lightbox = ({ open, onOpenChange, images, startIndex = 0 }: LightboxProps) => {
  const [index, setIndex] = useState(startIndex);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (open) {
      setIndex(startIndex);
      setTimeout(() => emblaApi?.scrollTo(startIndex, true), 0);
    }
  }, [open, startIndex, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, scrollNext, scrollPrev]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen w-screen h-screen p-0 border-0 bg-black/90">
        <div className="absolute inset-0" ref={emblaRef}>
          <div className="h-full flex">
            {images.map((src, i) => (
              <div key={i} className="relative min-w-0 flex-[0_0_100%] h-full flex items-center justify-center">
                <motion.img
                  src={src}
                  alt={`Photo ${i + 1}`}
                  className="max-h-[90vh] max-w-[92vw] object-contain rounded-lg neon-border"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-between">
          <button className="glass neon-border px-4 py-2 rounded-md text-sm" onClick={() => onOpenChange(false)}>Close</button>
          <div className="flex gap-2">
            <button className="glass neon-border px-3 py-2 rounded-md text-sm" onClick={scrollPrev}>Prev</button>
            <button className="glass neon-border px-3 py-2 rounded-md text-sm" onClick={scrollNext}>Next</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Lightbox;
