import React from 'react';
import { Languages, BookOpen, Video, HelpCircle, MapPin, Heart } from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageContent } from '../data.ts';

interface HeaderProps {
  currentLang: LanguageContent;
  selectedLangCode: string;
  onSelectLang: (code: string) => void;
  onNavigate: (sectionId: string) => void;
  onOpenPrayerModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  selectedLangCode,
  onSelectLang,
  onNavigate,
  onOpenPrayerModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-sky-100/70 transition-all">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:bg-white focus:p-3">{currentLang.hero.ctaGospel}</a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-lg font-serif font-bold tracking-tight text-slate-900 flex items-center gap-2 hover:opacity-85 transition-opacity"
        >
          <span className="text-sky-600 font-serif text-xl">†</span>
          <span>Gospel & Truth</span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('gospel')}
            className="hover:text-sky-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            {currentLang.nav.gospelScripture}
          </button>
          <button
            onClick={() => onNavigate('media')}
            className="hover:text-sky-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            {currentLang.nav.media}
          </button>
          <button
            onClick={() => onNavigate('apologetics')}
            className="hover:text-sky-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            {currentLang.nav.apologetics}
          </button>
          <button
            onClick={() => onNavigate('resources')}
            className="hover:text-sky-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            {currentLang.nav.resources}
          </button>
          <button
            onClick={() => onNavigate('churches')}
            className="hover:text-sky-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            {currentLang.nav.churches}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Quick Language Dropdown Selector in top bar */}
          <div className="relative inline-block text-left">
            <div className="flex items-center bg-sky-50/80 hover:bg-sky-100/80 rounded-lg px-2.5 py-1.5 border border-sky-200/60 transition-colors">
              <span className="text-base mr-1.5">{currentLang.flag}</span>
              <select
                value={selectedLangCode}
                onChange={(e) => onSelectLang(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer appearance-none pr-4 w-24 sm:w-36"
                aria-label="Select application language"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="text-slate-800">
                    {lang.flag} {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
              <Languages className="w-3.5 h-3.5 text-sky-600 pointer-events-none -ml-3" />
            </div>
          </div>

          {/* Primary CTA */}
          <button
            onClick={onOpenPrayerModal}
            className="hidden sm:flex px-3.5 py-1.5 text-xs font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors whitespace-nowrap shadow-xs items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 fill-white/20" />
            <span>{currentLang.nav.nextSteps}</span>
          </button>
        </div>
      </div>
      <nav aria-label={currentLang.nav.home} className="xl:hidden flex gap-2 overflow-x-auto px-4 pb-2 text-sm text-slate-700">
        {(['gospel', 'media', 'apologetics', 'resources', 'churches', 'next-steps'] as const).map((id, index) => (
          <button key={id} onClick={() => onNavigate(id)} className="shrink-0 px-3 rounded-lg hover:bg-sky-100 focus-visible:bg-sky-100">
            {[currentLang.nav.gospelScripture, currentLang.nav.media, currentLang.nav.apologetics, currentLang.nav.resources, currentLang.nav.churches, currentLang.nav.nextSteps][index]}
          </button>
        ))}
      </nav>
    </header>
  );
};
