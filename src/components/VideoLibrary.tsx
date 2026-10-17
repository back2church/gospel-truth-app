import React, { useState } from 'react';
import { Video } from 'lucide-react';
import { VideoItem, VideoTopic, LanguageContent } from '../data.ts';
import { VideoCard } from './VideoCard.tsx';
import { VideoPlayerModal } from './VideoPlayerModal.tsx';
import { BackBar } from './BackBar.tsx';

interface VideoLibraryProps {
  currentLang: LanguageContent;
  onBack: () => void;
}

// "All" plus the 7 topics. The visible names are in currentLang.ui (every language).
const TOPICS: VideoTopic[] = ['goodnews', 'jesus', 'science', 'morality', 'suffering', 'religions', 'bible'];

// Video library page: a Back button, topic chips (one tap filters) and a grid of all videos.
export const VideoLibrary: React.FC<VideoLibraryProps> = ({ currentLang, onBack }) => {
  const { ui } = currentLang;
  const [topic, setTopic] = useState<VideoTopic | 'all'>('all');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const shown = currentLang.videos.filter((video) => topic === 'all' || video.topic === topic);

  const chipClass = (selected: boolean) =>
    `shrink-0 px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
      selected ? 'bg-sky-800 border-sky-800 text-white' : 'bg-white/90 border-slate-200 text-slate-700 hover:border-sky-300'
    }`;

  return (
    <div id="video-library">
      <BackBar backLabel={ui.back} title={ui.videoLibrary} onBack={onBack} />

      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-800 bg-sky-100/80 px-3 py-1 rounded-full mb-3">
          <Video className="w-3.5 h-3.5" />
          <span>{ui.badgeVideos}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          {currentLang.mediaSection.title}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
          {currentLang.mediaSection.subtitle}
        </p>

        {/* Topic chips: one tap filters the grid */}
        <div className="mt-6 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto sm:flex-wrap pb-1" role="group" aria-label={ui.videoLibrary}>
          <button onClick={() => setTopic('all')} aria-pressed={topic === 'all'} className={chipClass(topic === 'all')}>{ui.all}</button>
          {TOPICS.map((t) => (
            <button key={t} onClick={() => setTopic(t)} aria-pressed={topic === t} className={chipClass(topic === t)}>{ui.topics[t]}</button>
          ))}
        </div>

        {/* Grid: 2 columns on phone, 3 on desktop */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {shown.map((video) => (
            <VideoCard key={video.id} video={video} currentLang={currentLang} onPlay={setActiveVideo} layout="tile" />
          ))}
        </div>
      </section>

      {activeVideo && <VideoPlayerModal video={activeVideo} currentLang={currentLang} onClose={() => setActiveVideo(null)} />}
    </div>
  );
};
