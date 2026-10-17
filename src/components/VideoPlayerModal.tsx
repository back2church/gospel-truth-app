import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { VideoItem, LanguageContent } from '../data.ts';
import { Modal } from './Modal.tsx';

interface VideoPlayerModalProps {
  video: VideoItem;
  currentLang: LanguageContent;
  onClose: () => void;
}

// The video player pop-up (the old "Theater Mode"). Used by the main page and the video library.
export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, currentLang, onClose }) => (
  <Modal label={video.title} onClose={onClose} className="max-w-4xl bg-slate-900">
    <div className="bg-slate-900 rounded-3xl overflow-hidden max-w-4xl w-full border border-slate-700 shadow-2xl relative">
      <div className="flex items-center justify-between p-4 px-6 border-b border-slate-800 text-white">
        <h3 className="text-sm font-semibold truncate pr-4">{video.title}</h3>
        <button
          onClick={onClose}
          aria-label={currentLang.ui.closeVideo}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="aspect-video w-full bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          title={video.title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="px-6 py-3 flex justify-end">
        <a
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          <span>YouTube</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  </Modal>
);
