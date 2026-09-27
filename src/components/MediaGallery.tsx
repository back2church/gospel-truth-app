import React, { useState } from 'react';
import { Video, Play, Plus, Edit2, ExternalLink, X, Check, Sparkles } from 'lucide-react';
import { VideoItem, LanguageContent } from '../data.ts';
import { Modal } from './Modal.tsx';

interface MediaGalleryProps {
  currentLang: LanguageContent;
  onUpdateCustomVideoId?: (newId: string, title?: string) => void;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ currentLang }) => {
  const [videoList, setVideoList] = useState<VideoItem[]>(currentLang.videos);
  const [activeVideoModal, setActiveVideoModal] = useState<VideoItem | null>(null);
  const [customYoutubeId, setCustomYoutubeId] = useState('');
  const [customTitle, setCustomTitle] = useState('My Google Vids Unlisted Video');
  const [showAddModal, setShowAddModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync if currentLang changes
  React.useEffect(() => {
    setVideoList(currentLang.videos);
  }, [currentLang]);

  const handleAddOrUpdateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customYoutubeId.trim()) return;

    // Clean up input if full URL was pasted
    let cleanId = customYoutubeId.trim();
    if (cleanId.includes('v=')) {
      cleanId = cleanId.split('v=')[1]?.split('&')[0] || cleanId;
    } else if (cleanId.includes('youtu.be/')) {
      cleanId = cleanId.split('youtu.be/')[1]?.split('?')[0] || cleanId;
    }

    const newVideo: VideoItem = {
      id: `custom-${Date.now()}`,
      title: customTitle.trim() || 'My Google Vids Presentation',
      category: 'Google Vids (Custom)',
      speakerOrSource: `User Upload (${currentLang.name})`,
      description: 'Custom unlisted video uploaded from Google Vids workflow.',
      youtubeId: cleanId,
      isCustomGoogleVid: true,
    };

    setVideoList([newVideo, ...videoList.filter((v) => !v.isCustomGoogleVid)]);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowAddModal(false);
      setCustomYoutubeId('');
    }, 1500);
  };

  return (
    <section id="media" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-800 bg-sky-100/80 px-3 py-1 rounded-full mb-3">
            <Video className="w-3.5 h-3.5" />
            <span>Streaming & Video Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            {currentLang.mediaSection.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
            {currentLang.mediaSection.subtitle}
          </p>
        </div>

        {/* Action to test or add Google Vids YouTube ID */}
        {import.meta.env.DEV && <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl transition-all shadow-xs hover:border-sky-300"
        >
          <Plus className="w-4 h-4 text-sky-600" />
          <span>{currentLang.mediaSection.customVideoPrompt}</span>
        </button>}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoList.filter((video) => import.meta.env.DEV || !video.isCustomGoogleVid).map((video) => (
          <div
            key={video.id}
            className="group bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* YouTube Iframe or Responsive Thumbnail Preview */}
            <div className="relative aspect-video bg-slate-900 overflow-hidden">
              <button onClick={() => setActiveVideoModal(video)} aria-label={video.title} className="relative block w-full h-full group">
                <img src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" width="480" height="360" className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                <span className="absolute inset-0 flex items-center justify-center"><Play aria-hidden="true" className="w-14 h-14 p-3 bg-white text-sky-700 rounded-full shadow-lg" /></span>
              </button>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-sky-700">{video.category}</span>
                  <span>·</span>
                  <span className="truncate max-w-[150px]">{video.speakerOrSource}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveVideoModal(video)}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-sky-600" />
                  <span>Theater Mode</span>
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
                >
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Theater Mode Video Modal */}
      {activeVideoModal && (
        <Modal label={activeVideoModal.title} onClose={() => setActiveVideoModal(null)} className="max-w-4xl bg-slate-900">
          <div className="bg-slate-900 rounded-3xl overflow-hidden max-w-4xl w-full border border-slate-700 shadow-2xl relative">
            <div className="flex items-center justify-between p-4 px-6 border-b border-slate-800 text-white">
              <h3 className="text-sm font-semibold truncate pr-4">{activeVideoModal.title}</h3>
              <button
                onClick={() => setActiveVideoModal(null)}
                aria-label="Close video"
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.youtubeId}?autoplay=1&rel=0`}
                title={activeVideoModal.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </Modal>
      )}

      {/* Custom Google Vids Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Google Vids & Unlisted Stream</span>
            </div>

            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
              Connect Google Vids Video
            </h3>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Export your video from Google Vids as <strong>Unlisted to YouTube</strong>, and paste the unique YouTube Video ID or URL below to test it instantly in the player.
            </p>

            <form onSubmit={handleAddOrUpdateVideo} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Video Title
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Gospel Message in Filipino"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  YouTube Video ID or Full Link
                </label>
                <input
                  type="text"
                  required
                  value={customYoutubeId}
                  onChange={(e) => setCustomYoutubeId(e.target.value)}
                  placeholder="e.g. V9P4w024w4k or https://youtu.be/..."
                  className="w-full px-3.5 py-2.5 text-sm font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {saveSuccess ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Video successfully updated in your gallery!</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors shadow-xs"
                >
                  {currentLang.mediaSection.addCustomBtn}
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
