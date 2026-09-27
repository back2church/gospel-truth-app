import React, { useState } from 'react';
import { BookOpen, Copy, Check, Heart, Play, Volume2, VolumeX, Sparkles, ChevronRight } from 'lucide-react';
import { LanguageContent } from '../data.ts';

interface GospelScriptureSectionProps {
  currentLang: LanguageContent;
  onOpenPrayerModal: () => void;
}

export const GospelScriptureSection: React.FC<GospelScriptureSectionProps> = ({
  currentLang,
  onOpenPrayerModal,
}) => {
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isNarrating, setIsNarrating] = useState(false);
  const [activeSceneTab, setActiveSceneTab] = useState<'all' | 'scene1' | 'scene2' | 'scene3' | 'scene4'>('all');

  const { gospelMessage } = currentLang;

  const handleCopyVerse = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Browser speech synthesis to read scripture in current language if supported
  const handleToggleNarration = () => {
    if (!('speechSynthesis' in window)) return;

    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
      return;
    }

    window.speechSynthesis.cancel();
    const fullText = `${gospelMessage.scene1Intro} ${gospelMessage.scene2Transition} ${gospelMessage.verses.map(v => `${v.reference}. ${v.text}`).join(' ')} ${gospelMessage.scene4Closing}`;
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = currentLang.code;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsNarrating(false);
    utterance.onerror = () => setIsNarrating(false);

    setIsNarrating(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section id="gospel" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
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

        {/* Read-Aloud / Narration button */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={handleToggleNarration}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              isNarrating
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm animate-pulse'
                : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200 shadow-xs'
            }`}
          >
            {isNarrating ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-sky-600" />}
            <span>{isNarrating ? 'Pause Audio Narration' : 'Listen in Your Language'}</span>
          </button>
        </div>
      </div>

      {/* Script Storyboard Card (Scenes 1–4 from video plan) */}
      <div className="bg-white/90 backdrop-blur-md border border-sky-100 rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgba(20,60,100,0.05)] mb-12">
        {/* Scene 1 & 2 Intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-slate-100">
          <div className="bg-gradient-to-br from-sky-50/70 to-blue-50/40 p-6 rounded-2xl border border-sky-100/60">
            <div className="text-[11px] font-semibold text-sky-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>Scene 1</span>
              <span>·</span>
              <span>Welcome & Atmosphere</span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif italic">
              "{gospelMessage.scene1Intro}"
            </p>
            <div className="mt-3 text-xs text-slate-500">
              Visual: Calm azure sky, gentle lake reflection, warm sunlight glow.
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/30 p-6 rounded-2xl border border-amber-100/60">
            <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>Scene 2</span>
              <span>·</span>
              <span>Transition to Scripture</span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif italic">
              "{gospelMessage.scene2Transition}"
            </p>
            <div className="mt-3 text-xs text-slate-500">
              Visual: Minimalist typography fading onto the screen.
            </div>
          </div>
        </div>

        {/* Scene 3: Scripture Phrase-by-Phrase Reading */}
        <div className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
              <span className="text-sky-600">Scene 3 ·</span>
              <span>{gospelMessage.scene3ScriptureHeading}</span>
            </h3>
            <span className="text-xs text-slate-400">Click any verse to highlight & study</span>
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

        {/* Scene 4: Closing */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/60 p-5 rounded-2xl">
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Scene 4 · Closing & Next Steps
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
              <ChevronRight className="w-4 h-4" />
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
