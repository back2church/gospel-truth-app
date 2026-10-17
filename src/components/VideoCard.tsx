import React from 'react';
import { Play } from 'lucide-react';
import { VideoItem, LanguageContent } from '../data.ts';

interface VideoCardProps {
  video: VideoItem;
  currentLang: LanguageContent;
  onPlay: (video: VideoItem) => void;
  // 'row' = compact card (picture left, text right) for the main page
  // 'tile' = card with a big picture on top, used in the video library grid
  layout: 'row' | 'tile';
}

// One video card. The text comes from the video itself (title, channel) and from
// currentLang.ui (topic name, "English" tag, "Long video" tag).
export const VideoCard: React.FC<VideoCardProps> = ({ video, currentLang, onPlay, layout }) => {
  const { ui } = currentLang;

  const thumbnail = (
    <div className={`relative bg-slate-900 overflow-hidden shrink-0 ${layout === 'row' ? 'w-36 sm:w-56 self-stretch min-h-[104px]' : 'aspect-video w-full'}`}>
      <img
        src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        decoding="async"
        width="480"
        height="360"
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <Play aria-hidden="true" className="w-11 h-11 p-3 bg-white text-sky-700 rounded-full shadow-lg" />
      </span>
    </div>
  );

  const text = (
    <div className="p-3 sm:p-4 min-w-0 flex-1 text-left">
      <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500 mb-1.5">
        <span className="font-semibold text-sky-700">{ui.topics[video.topic]}</span>
        <span aria-hidden="true">·</span>
        <span className="truncate">{video.source}</span>
      </div>
      <h3 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-3 leading-snug">
        {video.title}
      </h3>
      {/* Small tags: all videos are English; one video is a long documentary */}
      <div className="mt-2 flex flex-wrap gap-1.5">
        <span className="text-[11px] font-medium text-slate-600 bg-slate-100 rounded-full px-2 py-0.5">{ui.english}</span>
        {video.long && <span className="text-[11px] font-medium text-amber-800 bg-amber-100 rounded-full px-2 py-0.5">{ui.longVideo}</span>}
      </div>
    </div>
  );

  return (
    <button
      type="button"
      onClick={() => onPlay(video)}
      aria-label={`${ui.playVideo}: ${video.title}`}
      className={`group w-full bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-sky-300 transition-all duration-300 ${layout === 'row' ? 'flex flex-row items-stretch' : 'flex flex-col'}`}
    >
      {thumbnail}
      {text}
    </button>
  );
};
