import React, { useState } from 'react';
import { Video, ArrowRight } from 'lucide-react';
import { VideoItem, LanguageContent } from '../data.ts';
import { VideoCard } from './VideoCard.tsx';
import { VideoPlayerModal } from './VideoPlayerModal.tsx';

interface MediaGalleryProps {
  currentLang: LanguageContent;
  onOpenLibrary: () => void; // opens the video library page
}

// Main page: only the 3 videos marked `featured: true` in data.ts, plus a "More videos" button.
export const MediaGallery: React.FC<MediaGalleryProps> = ({ currentLang, onOpenLibrary }) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const featured = currentLang.videos.filter((video) => video.featured);

  return (
    <section id="media" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-800 bg-sky-100/80 px-3 py-1 rounded-full mb-3">
          <Video className="w-3.5 h-3.5" />
          <span>{currentLang.ui.badgeVideos}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          {currentLang.mediaSection.title}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
          {currentLang.mediaSection.subtitle}
        </p>
      </div>

      {/* The 3 featured videos as compact rows */}
      <div className="space-y-3">
        {featured.map((video) => (
          <VideoCard key={video.id} video={video} currentLang={currentLang} onPlay={setActiveVideo} layout="row" />
        ))}
      </div>

      <button
        onClick={onOpenLibrary}
        className="mt-5 w-full flex items-center justify-center gap-2 bg-white/90 border border-slate-200/80 rounded-2xl py-3 px-4 text-sm font-semibold text-sky-800 hover:border-sky-300 hover:bg-sky-50 transition-all"
      >
        <span>{currentLang.ui.moreVideos}</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>

      {/* Player pop-up */}
      {activeVideo && <VideoPlayerModal video={activeVideo} currentLang={currentLang} onClose={() => setActiveVideo(null)} />}
    </section>
  );
};
