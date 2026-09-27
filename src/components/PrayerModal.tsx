import React, { useState } from 'react';
import { X, Heart, Check, Copy, Sparkles, BookOpen, Share2 } from 'lucide-react';
import { LanguageContent } from '../data.ts';
import { Modal } from './Modal.tsx';

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageContent;
}

export const PrayerModal: React.FC<PrayerModalProps> = ({ isOpen, onClose, currentLang }) => {
  const [prayed, setPrayed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyPrayer = () => {
    navigator.clipboard.writeText(currentLang.gospelMessage.faithPrayerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal label={currentLang.gospelMessage.faithPrayerTitle} onClose={onClose} className="max-w-lg bg-white">
      <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-lg w-full border border-slate-200 shadow-2xl relative">
        <button
          onClick={onClose}
          aria-label="Close prayer"
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!prayed ? (
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1 rounded-full mb-3">
              <Heart className="w-3.5 h-3.5 fill-rose-600/30" />
              <span>{currentLang.gospelMessage.faithPrayerTitle}</span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">
              Receiving God's Free Gift of Grace
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
              God knows your heart. Praying isn't about magical words, but an honest attitude of repentance, trust, and receiving Jesus as your Lord and Savior.
            </p>

            <div className="bg-sky-50/80 border border-sky-100/90 rounded-2xl p-5 mb-5">
              <p className="text-base font-serif italic text-slate-900 leading-relaxed">
                {currentLang.gospelMessage.faithPrayerText}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setPrayed(true)}
                className="flex-1 py-3 px-4 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>I Prayed This With All My Heart</span>
              </button>

              <button
                onClick={handleCopyPrayer}
                className="py-3 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">
              Welcome to the Family of God!
            </h3>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed max-w-sm mx-auto">
              Luke 15:10 tells us that there is joy in the presence of the angels of God over one sinner who repents. Your name is written in the Book of Life.
            </p>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left text-xs space-y-2 mb-6 text-slate-700">
              <div className="font-semibold text-slate-900">What to do next:</div>
              <div>• Talk to God every day in prayer like a close friend.</div>
              <div>• Read the Gospel of John to learn about Jesus.</div>
              <div>• Find a Bible-believing local church to grow in fellowship.</div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
