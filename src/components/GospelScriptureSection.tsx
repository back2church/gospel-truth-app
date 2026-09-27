import React, { useState, useEffect } from 'react';
import { BookOpen, Copy, Check, Heart } from 'lucide-react';
import { LanguageContent } from '../data.ts';

interface GospelScriptureSectionProps {
  currentLang: LanguageContent;
  onOpenPrayerModal: () => void;
}

// Gospel video shorts mapped by language as requested:
// English: https://youtube.com/shorts/Lq5jNEECZiM?feature=share
// Deutsch: https://youtube.com/shorts/CNywpV2yYEc?feature=share
// Italian: https://youtube.com/shorts/-CYtKabFD3A?feature=share
const GOSPEL_VIDEOS: Record<string, { id: string; label: string; flag: string }> = {
  en: { id: 'Lq5jNEECZiM', label: 'English', flag: '🇬🇧' },
  de: { id: 'CNywpV2yYEc', label: 'Deutsch', flag: '🇨🇭' },
  it: { id: '-CYtKabFD3A', label: 'Italiano', flag: '🇨🇭' },
};

export const GospelScriptureSection: React.FC<GospelScriptureSectionProps> = ({
  currentLang,
  onOpenPrayerModal,
}) => {
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Default video language to current language if available in GOSPEL_VIDEOS, else fallback to 'en'
  const [videoLang, setVideoLang] = useState<string>(() => {
    return GOSPEL_VIDEOS[currentLang.code] ? currentLang.code : 'en';
  });

  // Automatically update active video if user switches to English, Deutsch, or Italian
  useEffect(() => {
    if (GOSPEL_VIDEOS[currentLang.code]) {
      setVideoLang(currentLang.code);
    }
  }, [currentLang.code]);

  const activeVideo = GOSPEL_VIDEOS[videoLang] || GOSPEL_VIDEOS['en'];
  const { gospelMessage } = currentLang;

  const handleCopyVerse = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="gospel" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-800 bg-sky-100/80 px-3 py-1 rounded-full mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{gospelMessage.scriptureReference}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          {gospelMessage.title}
        </h2>
        <p className="mt-3 text-base text-slate-600">
          {gospelMessage.subtitle}
        </p>

        {/* Embedded Video Shorts according to language in place of "Listen in Your Language" */}
        <div className="mt-8 flex flex-col items-center justify-center">
          {/* Language Selector for the Gospel Shorts */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 backdrop-blur-md rounded-2xl mb-4 border border-slate-200/70 shadow-xs">
            {Object.entries(GOSPEL_VIDEOS).map(([code, vid]) => (
              <button
                key={code}
                type="button"
                onClick={() => setVideoLang(code)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  videoLang === code
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="mr-1.5">{vid.flag}</span>
                <span>{vid.label}</span>
              </button>
            ))}
          </div>

          {/* YouTube Short Iframe Container */}
          <div className="w-full max-w-[320px] sm:max-w-[340px] aspect-[9/16] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 ring-4 ring-sky-100/60 transition-transform">
            <iframe
              key={activeVideo.id}
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?rel=0&modestbranding=1`}
              title="The Gospel from the Word of GOD"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className="mt-2.5 text-xs text-slate-500">
            The Gospel from the Word of GOD · {activeVideo.label}
          </p>
        </div>
      </div>

      {/* The Gospel from the Word of GOD (Scene 3 only, scenes 1 and 2 removed) */}
      <div className="bg-white/90 backdrop-blur-md border border-sky-100 rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgba(20,60,100,0.05)] mb-12">
        <div className="pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
                <span>The Gospel from the Word of GOD</span>
              </h3>
              <p className="text-xs sm:text-sm text-sky-700 font-medium mt-1">
                {gospelMessage.scriptureReference}
              </p>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">Click any verse to highlight & study</span>
          </div>

          <div className="space-y-4">
            {gospelMessage.verses.map((verse, idx) => {
              const isSelected = activeVerseIndex === idx;
              return (
                <div
                  key={verse.reference}
                  onClick={() => setActiveVerseIndex(idx)}
                  className={`cursor-pointer transition-all duration-200 p-5 rounded-2xl border ${
                    isSelected
                      ? 'bg-sky-50/90 border-sky-300 ring-2 ring-sky-200/50 shadow-xs'
                      : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md shrink-0 ${
                        isSelected ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        v.{verse.reference.match(/\d+$/)?.[0] || idx + 3}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-slate-500 mb-1">
                          {verse.reference}
                        </div>
                        <p className={`text-base sm:text-lg leading-relaxed ${
                          isSelected ? 'text-slate-900 font-medium' : 'text-slate-700'
                        }`}>
                          "{verse.text}"
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyVerse(`${verse.reference}: "${verse.text}"`, idx);
                      }}
                      className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white/80 transition-colors shrink-0"
                      title="Copy verse"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing & Prayer Action */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/60 p-5 rounded-2xl">
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Closing & Next Steps
            </span>
            <p className="text-sm font-serif italic text-slate-700">
              "{gospelMessage.scene4Closing}"
            </p>
          </div>
          <button
            onClick={onOpenPrayerModal}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors whitespace-nowrap shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <Heart className="w-3.5 h-3.5 fill-white/20" />
            <span>Pray the Acceptance Prayer</span>
          </button>
        </div>
      </div>

      {/* 4 Core Pillars of the Gospel */}
      <div className="mb-14">
        <h3 className="text-xl font-serif font-bold text-slate-900 text-center mb-8">
          The 4 Pillars of the Gospel Message
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {gospelMessage.corePillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs mb-4">
                0{i + 1}
              </div>
              <h4 className="text-base font-semibold text-slate-900 mb-2">
                {pillar.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Faith Acceptance Prayer Card */}
      <div className="bg-gradient-to-r from-sky-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300 bg-sky-800/60 px-3 py-1 rounded-full mb-4">
            <Heart className="w-3.5 h-3.5 fill-sky-300/30" />
            <span>{gospelMessage.faithPrayerTitle}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-4">
            Take Your Stand on the Gospel Today
          </h3>
          <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
            If you want to receive God’s forgiveness and begin a new life with Jesus, you can pray this prayer from the sincerity of your heart:
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 mb-6">
            <p className="text-base sm:text-lg font-serif italic text-white leading-relaxed">
              {gospelMessage.faithPrayerText}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenPrayerModal}
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-sky-50 rounded-xl transition-colors shadow-md flex items-center gap-2"
            >
              <span>I Made This Decision Today</span>
            </button>
            <span className="text-xs text-sky-200">
              Romans 10:9 — "If you confess with your mouth that Jesus is Lord and believe in your heart that God raised Him from the dead, you will be saved."
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
