import React from 'react';
import { ChevronDown, Globe, Sparkles, BookOpen, Compass, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageContent } from '../data.ts';

interface HeroWelcomeProps {
  currentLang: LanguageContent;
  selectedLangCode: string;
  onSelectLang: (code: string) => void;
  onExploreGospel: () => void;
  onExploreApologetics: () => void;
}

export const HeroWelcome: React.FC<HeroWelcomeProps> = ({
  currentLang,
  selectedLangCode,
  onSelectLang,
  onExploreGospel,
  onExploreApologetics,
}) => {
  const activeLangConfig = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLangCode) || SUPPORTED_LANGUAGES[4];

  return (
    <section id="hero" className="relative pt-12 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Subtle warm sun glow overlay in top right */}
      <div
        className="pointer-events-none absolute -top-24 right-0 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-10 right-20 w-48 h-48 rounded-full bg-sky-200/40 blur-2xl"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Apple setup screen aesthetic card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_12px_40px_rgba(30,70,120,0.06)] rounded-3xl p-5 sm:p-10 md:p-12 transition-all duration-300">
          {/* Subtle minimal setup glyph */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100/80 mb-6 text-sky-600 shadow-xs">
            <span className="text-2xl font-serif">†</span>
          </div>

          {/* Animated Cycling Greeting (every 3 seconds) */}
          <div className="min-h-[5.5rem] sm:min-h-[6.5rem] flex items-center justify-center">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-slate-900"
              style={{ textWrap: 'balance' }}
            >
              {currentLang.welcome}
            </h1>
          </div>

          <p className="mt-2 text-xs text-sky-700/80 font-medium tracking-wide">
            {activeLangConfig.nativeName} · {activeLangConfig.name}
          </p>

          {/* Elegant Language Selector Dropdown directly beneath greeting */}
          <div className="mt-8 max-w-sm mx-auto relative">
            <label htmlFor="language-select" className="sr-only">
              Choose your language
            </label>
            <select
              id="language-select"
              value={selectedLangCode}
              onChange={(event) => onSelectLang(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.nativeName} ({lang.name})</option>
              ))}
            </select>

            {/* Quick Language Switcher Bar */}
            <div className="hidden sm:flex mt-4 flex-wrap items-center justify-center gap-1.5">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onSelectLang(lang.code)}
                  title={`${lang.nativeName} (${lang.name})`}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    lang.code === selectedLangCode
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs font-semibold'
                      : 'bg-white/60 text-slate-600 border-slate-200/70 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <span className="mr-1">{lang.flag}</span>
                  {lang.nativeName}
                </button>
              ))}
            </div>
          </div>

          {/* App Purpose Subtext */}
          <div className="mt-10 pt-8 border-t border-slate-100/90 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-serif text-slate-800">
              {currentLang.hero.subtitle}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {currentLang.hero.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onExploreGospel}
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>{currentLang.hero.ctaGospel}</span>
              </button>

              <button
                onClick={onExploreApologetics}
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-sky-600" />
                <span>{currentLang.hero.ctaApologetics}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
