import React, { useState, useMemo } from 'react';
import { MapPin, Search, ExternalLink, Globe, Compass } from 'lucide-react';
import { ChurchItem, LanguageContent } from '../data.ts';

interface ChurchDirectoryProps {
  currentLang: LanguageContent;
  churches: ChurchItem[];
}

export const ChurchDirectory: React.FC<ChurchDirectoryProps> = ({ currentLang, churches }) => {
  const [searchCity, setSearchCity] = useState('');
  const [selectedCanton, setSelectedCanton] = useState<string>('all');

  const cantons = ['all', 'ZH', 'GE', 'BS', 'BE', 'VD', 'TI'];

  const filteredChurches = useMemo(() => {
    return churches.filter((church) => {
      const matchesCanton = selectedCanton === 'all' || church.canton.includes(selectedCanton);
      const query = searchCity.toLowerCase().trim();
      const matchesSearch =
        !query ||
        church.name.toLowerCase().includes(query) ||
        church.city.toLowerCase().includes(query) ||
        church.languages.some((l) => l.toLowerCase().includes(query)) ||
        church.address.toLowerCase().includes(query);

      return matchesCanton && matchesSearch;
    });
  }, [churches, searchCity, selectedCanton]);

  return (
    <section id="churches" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-800 bg-sky-100/80 px-3 py-1 rounded-full mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>Switzerland Local & Migrant Fellowships</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          {currentLang.churchSection.title}
        </h2>
        <p className="mt-3 text-base text-slate-600">
          {currentLang.churchSection.subtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder={currentLang.churchSection.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Canton Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto p-1 bg-slate-100/80 rounded-xl">
          <button
            onClick={() => setSelectedCanton('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCanton === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Cantons
          </button>
          <button
            onClick={() => setSelectedCanton('ZH')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCanton === 'ZH'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Zurich (ZH)
          </button>
          <button
            onClick={() => setSelectedCanton('GE')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCanton === 'GE'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Geneva (GE)
          </button>
          <button
            onClick={() => setSelectedCanton('BS')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCanton === 'BS'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Basel (BS)
          </button>
          <button
            onClick={() => setSelectedCanton('VD')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCanton === 'VD'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vaud / Lausanne (VD)
          </button>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChurches.map((church) => (
          <div
            key={church.name}
            className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-semibold text-sky-700">{church.city}</span>
                <span>·</span>
                <span>{church.type}</span>
              </div>

              <h3 className="text-base font-serif font-bold text-slate-900 mb-2">
                {church.name}
              </h3>

              <div className="flex items-start gap-2 text-xs text-slate-600 mb-4">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{church.address}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {church.languages.map((l) => (
                  <span
                    key={l}
                    className="text-[11px] font-medium bg-sky-50 text-sky-800 px-2 py-0.5 rounded border border-sky-100"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Canton {church.canton}</span>
              <a
                href={church.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1 transition-colors"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
