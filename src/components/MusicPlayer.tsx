import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";

interface Track {
  title: string;
  url: string;
}

const tracks: Track[] = [
  { "title": "EXO – Monster", "url": "https://www.youtube.com/watch?v=KSH-FVVtTf0" },
  { "title": "EXO – Growl", "url": "https://www.youtube.com/watch?v=I3dezFzsNss" },
  { "title": "EXO – Call Me Baby", "url": "https://www.youtube.com/watch?v=yWfsla_Uh80" },
  { "title": "EXO – Overdose", "url": "https://www.youtube.com/watch?v=TI0DGvqKZTI" },
  { "title": "EXO – Ko Ko Bop", "url": "https://www.youtube.com/watch?v=IdssuxDdqKk" },
  { "title": "EXO – Tempo", "url": "https://www.youtube.com/watch?v=iwd8N6K-sLk" },
  { "title": "EXO – Love Shot", "url": "https://www.youtube.com/watch?v=pSudEWBAYRE" },
];

const MusicPlayer = () => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);

  const current = tracks[index];

  const next = () => setIndex((i) => (i + 1) % tracks.length);
  const prev = () => setIndex((i) => (i - 1 + tracks.length) % tracks.length);

  useEffect(() => {
    // Auto play when switching if already playing
    if (playing) setPlaying(true);
  }, [index]);

  return (
    <div className="fixed inset-x-3 bottom-3 z-40">
      <motion.div
        className="glass neon-border rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 justify-between"
        initial={{ y: 40, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          boxShadow: playing
            ? "0 0 30px hsl(var(--brand-purple)/0.45)"
            : "0 0 0 hsl(var(--brand-purple)/0)",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        role="region"
        aria-label="Music Player"
      >
        <div className={`eq ${playing ? 'playing' : ''}`} aria-hidden>
          <span className="eq-bar" />
          <span className="eq-bar" />
          <span className="eq-bar" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm sm:text-base font-semibold">{current.title}</p>
          <p className="truncate text-xs text-muted-foreground">Click play to start the vibe</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="px-3 py-2 rounded-md glass neon-border text-sm" onClick={prev} aria-label="Previous track">Prev</button>
          <button className="px-4 py-2 rounded-md bg-hero text-foreground font-semibold" onClick={() => setPlaying((p) => !p)} aria-label="Play/Pause">
            {playing ? 'Pause' : 'Play'}
          </button>
          <button className="px-3 py-2 rounded-md glass neon-border text-sm" onClick={next} aria-label="Next track">Next</button>
        </div>
        <ReactPlayer
          ref={playerRef}
          url={current.url}
          playing={playing}
          controls={false}
          width={0}
          height={0}
          style={{ display: 'none' }}
          onEnded={next}
        />
      </motion.div>
      <p className="text-center mt-2 text-xs text-muted-foreground"></p>
    </div>
  );
};

export default MusicPlayer;
