import React, { useState, useEffect } from 'react';
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
  const [cycleIndex, setCycleIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Cycling greeting every 3 seconds with smooth fade-in/fade-out animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCycleIndex((prev) => (prev + 1) % SUPPORTED_LANGUAGES.length);
        setIsFading(false);
      }, 400); // 400ms fade transition
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const activeCyclingItem = SUPPORTED_LANGUAGES[cycleIndex];
  const activeLangConfig = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLangCode) || SUPPORTED_LANGUAGES[4];

  return (
    <section id="hero" className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_12px_40px_rgba(30,70,120,0.06)] rounded-3xl p-8 sm:p-12 md:p-16 transition-all duration-300">
          {/* Subtle minimal setup glyph */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100/80 mb-6 text-sky-600 shadow-xs">
            <span className="text-2xl font-serif">†</span>
          </div>

          {/* Animated Cycling Greeting (every 3 seconds) */}
          <div className="min-h-[5.5rem] sm:min-h-[6.5rem] flex items-center justify-center">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-slate-900 transition-all duration-400 ease-in-out transform ${
                isFading ? 'opacity-0 scale-98 translate-y-1' : 'opacity-100 scale-100 translate-y-0'
              }`}
              style={{ textWrap: 'balance' }}
            >
              {activeCyclingItem.welcomeCyclingText}
            </h1>
          </div>

          <p className="mt-2 text-xs text-sky-700/80 font-medium tracking-wide">
            {activeCyclingItem.flag} {activeCyclingItem.nativeName} · {activeCyclingItem.name}
          </p>

          {/* Elegant Language Selector Dropdown directly beneath greeting */}
          <div className="mt-8 max-w-sm mx-auto relative">
            <label htmlFor="language-select" className="sr-only">
              Choose your language
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-5 py-3.5 bg-slate-50/90 hover:bg-slate-100/90 border border-slate-200/80 rounded-2xl shadow-xs text-slate-800 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                aria-expanded={isDropdownOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl" role="img" aria-label="Flag">
                    {activeLangConfig.flag}
                  </span>
                  <div className="text-left">
                    <span className="block text-slate-900 font-semibold leading-tight">
                      {activeLangConfig.nativeName}
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      {activeLangConfig.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Globe className="w-4 h-4 text-sky-600" />
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-xl z-50 overflow-hidden py-1.5 max-h-80 overflow-y-auto">
                  <div className="px-3 py-1.5 text-[11px] font-medium text-slate-400 border-b border-slate-100">
                    Switzerland Native & Migrant Languages
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = lang.code === selectedLangCode;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          onSelectLang(lang.code);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                          isSelected
                            ? 'bg-sky-50 text-sky-900 font-medium'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{lang.flag}</span>
                          <div>
                            <span className="font-medium text-slate-900">{lang.nativeName}</span>
                            <span className="ml-2 text-xs text-slate-500">({lang.name})</span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-sky-600" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Language Switcher Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
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
