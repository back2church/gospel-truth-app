import React from 'react';
import { SUPPORTED_LANGUAGES, LanguageContent } from '../data.ts';

interface FooterProps {
  currentLang: LanguageContent;
  onSelectLang: (code: string) => void;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onSelectLang, onNavigate }) => {
  return (
    <footer className="border-t border-sky-100/80 bg-white/70 backdrop-blur-md pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Wordmark & Statement */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sky-600 font-serif text-xl font-bold">†</span>
              <span className="text-lg font-serif font-bold tracking-tight text-slate-900">
                Gospel & Truth App
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md leading-relaxed">
              A multilingual evangelism platform and apologetics resource center tailored for Swiss residents, international workers, and migrants worldwide.
            </p>
            <div className="text-xs text-sky-800 font-serif italic pt-1">
              "For what I received I passed on to you as of first importance: that Christ died for our sins according to the Scriptures." — 1 Cor 15:3
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-sky-700 transition-colors cursor-pointer"
                >
                  {currentLang.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gospel')}
                  className="hover:text-sky-700 transition-colors cursor-pointer"
                >
                  {currentLang.nav.gospelScripture}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('media')}
                  className="hover:text-sky-700 transition-colors cursor-pointer"
                >
                  {currentLang.nav.media}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('apologetics')}
                  className="hover:text-sky-700 transition-colors cursor-pointer"
                >
                  {currentLang.nav.apologetics}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('churches')}
                  className="hover:text-sky-700 transition-colors cursor-pointer"
                >
                  {currentLang.nav.churches}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Languages */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Languages
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-slate-600">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onSelectLang(l.code)}
                  className={`text-left hover:text-sky-700 transition-colors ${
                    l.code === currentLang.code ? 'font-bold text-sky-700' : ''
                  }`}
                >
                  <span className="mr-1">{l.flag}</span>
                  <span>{l.nativeName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quiet copyright & metadata divider */}
        <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div>
            © {new Date().getFullYear()} Gospel & Truth. Dedicated to biblical truth and grace across all nations.
          </div>
          <div className="flex items-center gap-3">
            <span>Soli Deo Gloria</span>
            <span>·</span>
            <span>Switzerland & Global</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
