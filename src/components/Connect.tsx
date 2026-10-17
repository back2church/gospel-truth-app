import React from 'react';
import { Users, ExternalLink } from 'lucide-react';
import { LanguageContent, CONNECT_URL } from '../data.ts';
import { designCopy } from '../designCopy.ts';

interface ConnectProps {
  currentLang: LanguageContent;
}

// "Connect" section: a title, one sentence and exactly one link card (churcherlaebt.ch).
export const Connect: React.FC<ConnectProps> = ({ currentLang }) => (
  <section id="connect" className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
    {/* Header */}
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-800 bg-sky-100/80 px-3 py-1 rounded-full mb-3">
        <Users className="w-3.5 h-3.5" />
        <span>{designCopy(currentLang.code)[3]}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
        {currentLang.churchSection.title}
      </h2>
      <p className="mt-3 text-base text-slate-600">
        {currentLang.churchSection.subtitle}
      </p>
    </div>

    {/* The one and only link */}
    <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-xs flex items-center justify-between gap-4 flex-wrap">
      <h3 className="text-xl font-serif font-bold text-slate-900 break-all">churcherlaebt.ch</h3>
      <a
        href={CONNECT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-900"
      >
        <span>{currentLang.ui.visitWebsite}</span>
        <ExternalLink className="w-4 h-4" aria-hidden="true" />
      </a>
    </div>
  </section>
);
