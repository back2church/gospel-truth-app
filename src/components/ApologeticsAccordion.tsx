import React, { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Share2, Copy, Check, BookOpen, UserCheck, Sparkles } from 'lucide-react';
import { ApologeticItem, LanguageContent } from '../data.ts';

interface ApologeticsAccordionProps {
  currentLang: LanguageContent;
}

export const ApologeticsAccordion: React.FC<ApologeticsAccordionProps> = ({ currentLang }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'atheism' | 'islam' | 'hinduism' | 'judaism'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'ath-1': true, // Keep first open by default
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    filteredItems.forEach((item) => {
      allExpanded[item.id] = true;
    });
    setExpandedIds(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedIds({});
  };

  const handleCopy = (item: ApologeticItem) => {
    const textToCopy = `Question: ${item.question}\n\nSummary: ${item.shortAnswer}\n\nDetailed Answer: ${item.detailedAnswer}\n\nKey Scriptures: ${item.keyScriptures.join(', ')}\n\nRecommended Apologists: ${item.recommendedThinkers.join(', ')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredItems = useMemo(() => {
    return currentLang.apologetics.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.worldview === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.shortAnswer.toLowerCase().includes(query) ||
        item.detailedAnswer.toLowerCase().includes(query) ||
        item.recommendedThinkers.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [currentLang.apologetics, activeCategory, searchQuery]);

  const getWorldviewLabel = (worldview: string) => {
    switch (worldview) {
      case 'atheism':
        return 'Atheism & Science';
      case 'islam':
        return 'Islam & The Quran';
      case 'hinduism':
        return 'Hinduism & Karma';
      case 'judaism':
        return 'Judaism & Prophecy';
      default:
        return 'Worldview Truth';
    }
  };

  return (
    <section id="apologetics" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-800 bg-sky-100/80 px-3 py-1 rounded-full mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Christian Apologetics & Truth</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          {currentLang.apologeticsSection.title}
        </h2>
        <p className="mt-3 text-base text-slate-600">
          {currentLang.apologeticsSection.subtitle}
        </p>
      </div>

      {/* Search and Interactive Filter Bar */}
      <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs mb-8 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentLang.apologeticsSection.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Segmented Buttons (Interactive filter controls allowed as buttons) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {currentLang.apologeticsSection.categories.all}
            </button>
            <button
              onClick={() => setActiveCategory('atheism')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'atheism'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {currentLang.apologeticsSection.categories.atheism}
            </button>
            <button
              onClick={() => setActiveCategory('islam')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'islam'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {currentLang.apologeticsSection.categories.islam}
            </button>
            <button
              onClick={() => setActiveCategory('hinduism')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'hinduism'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {currentLang.apologeticsSection.categories.hinduism}
            </button>
            <button
              onClick={() => setActiveCategory('judaism')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'judaism'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {currentLang.apologeticsSection.categories.judaism}
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button
              onClick={handleExpandAll}
              className="hover:text-sky-700 transition-colors cursor-pointer"
            >
              Expand all
            </button>
            <span>·</span>
            <button
              onClick={handleCollapseAll}
              className="hover:text-sky-700 transition-colors cursor-pointer"
            >
              Collapse all
            </button>
          </div>
        </div>
      </div>

      {/* Accordion List */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white/60 rounded-2xl border border-slate-200/80">
          <p className="text-sm text-slate-500">
            No questions matched your search criteria. Try a different topic or keyword.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isExpanded = !!expandedIds[item.id];
            return (
              <div
                key={item.id}
                className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs transition-all duration-200 hover:border-sky-300"
              >
                {/* Header Row */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-1.5 pr-2">
                    {/* Zero-Pill unboxed metadata text */}
                    <div className="flex items-center gap-2 text-xs text-sky-700 font-medium">
                      <span>{getWorldviewLabel(item.worldview)}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-500 font-normal">Christian Apologetics</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-snug">
                      {item.question}
                    </h3>

                    {/* Short Answer Preview */}
                    {!isExpanded && (
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1">
                        {item.shortAnswer}
                      </p>
                    )}
                  </div>

                  <div className="p-2 rounded-xl bg-slate-50 text-slate-500 hover:text-slate-900 shrink-0 transition-colors">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-sky-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Expanded Detailed Content */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 border-t border-slate-100 pt-5 space-y-5 animate-in fade-in duration-200">
                    {/* Summary callout */}
                    <div className="bg-sky-50/80 p-4 rounded-xl border border-sky-100 text-xs sm:text-sm text-sky-950 font-medium leading-relaxed">
                      <span className="font-bold text-sky-900 block mb-1">Core Proposition:</span>
                      {item.shortAnswer}
                    </div>

                    {/* Detailed Analysis */}
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Philosophical & Theological Defense
                      </h4>
                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                        {item.detailedAnswer}
                      </p>
                    </div>

                    {/* Scriptures & Apologists Footer Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
                          <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                          <span>Key Biblical Cross-References</span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                          {item.keyScriptures.map((ref) => (
                            <span
                              key={ref}
                              className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-mono"
                            >
                              {ref}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
                          <UserCheck className="w-3.5 h-3.5 text-sky-600" />
                          <span>Recommended Thinkers & Scholars</span>
                        </div>
                        <div className="text-xs text-slate-600">
                          {item.recommendedThinkers.join(', ')}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 flex items-center justify-end gap-2 text-xs">
                      <button
                        onClick={() => handleCopy(item)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-medium">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Full Answer</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
