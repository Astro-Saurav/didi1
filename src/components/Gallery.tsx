import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox"; // Ensure your Lightbox component can handle video URLs

// --- Your Media Library ---
// Total: 20 items (16 photos, 4 videos).
// The order here determines the order in the gallery. You can mix them up however you like.
const mediaItems = [
  // Photos 1-16
  { type: 'image', src: '/media/photos/1.jpeg' },
  { type: 'image', src: '/media/photos/2.jpeg' },
  { type: 'image', src: '/media/photos/3.jpeg' },
  { type: 'image', src: '/media/photos/4.jpeg' },
  { type: 'image', src: '/media/photos/5.jpeg' },
  { type: 'image', src: '/media/photos/6.jpeg' },
  { type: 'image', src: '/media/photos/7.jpeg' },
  { type: 'image', src: '/media/photos/8.jpeg' },
  { type: 'image', src: '/media/photos/9.jpeg' },
  { type: 'image', src: '/media/photos/10.jpeg' },
  { type: 'image', src: '/media/photos/11.jpeg' },
  { type: 'image', src: '/media/photos/12.jpeg' },
  { type: 'image', src: '/media/photos/13.jpeg' },
  { type: 'image', src: '/media/photos/14.jpeg' },
  { type: 'image', src: '/media/photos/15.jpeg' },
  { type: 'image', src: '/media/photos/16.jpeg' },

  // Videos 1-4
  { type: 'video', src: '/media/video/1.mp4' },
  { type: 'video', src: '/media/video/2.mp4' },
  { type: 'video', src: '/media/video/3.mp4' },
  { type: 'video', src: '/media/video/4.mp4' },
];

const Gallery = () => {
  // This memoized calculation adds an 'alt' tag to each media item for accessibility.
  const galleryMedia = useMemo(() => mediaItems.map((item, index) => ({
    ...item,
    alt: `Raksha Bandhan Memory ${index + 1}`,
  })), []);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <section id="photos" className="container mx-auto py-16 sm:py-24">
      <header className="mb-8 sm:mb-12 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          Memories We Treasure
        </motion.h2>
        <p className="mt-2 text-muted-foreground">
            {galleryMedia.length} snapshots of love, laughter, and sibling magic.
        </p>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {galleryMedia.map((media, i) => (
          <motion.button
            key={media.src} // The source path is a unique identifier.
            className="group relative aspect-square w-full overflow-hidden rounded-lg neon-border"
            onClick={() => { setIndex(i); setOpen(true); }}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: (i % 10) * 0.03 }}
            whileHover={{ y: -4, rotate: [0, 0.6, -0.6, 0], transition: { duration: 0.5 } }}
          >
            {media.type === 'image' ? (
              <img
                src={media.src}
                alt={media.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => { (e.currentTarget).src = "/placeholder.svg"; }}
              />
            ) : (
              <video
                src={media.src}
                autoPlay
                loop
                muted
                playsInline // Important for autoplay on mobile browsers
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              >
                Your browser does not support the video tag.
              </video>
            )}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: "inset 0 0 60px hsl(var(--brand-purple)/.3)" }}
            />
          </motion.button>
        ))}
      </div>

      <Lightbox
        open={open}
        onOpenChange={setOpen}
        startIndex={index}
        // Pass all media sources to the Lightbox for navigation
        images={galleryMedia.map(m => m.src)}
      />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        To change files, edit the `mediaItems` list in the Gallery component.
      </p>
    </section>
  );
};

export default Gallery;