import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, Sparkles, Share2 } from 'lucide-react';
import { ResourceArticle, LanguageContent } from '../data.ts';
import { Modal } from './Modal.tsx';

interface ResourceHubProps {
  currentLang: LanguageContent;
}

export const ResourceHub: React.FC<ResourceHubProps> = ({ currentLang }) => {
  const [selectedArticle, setSelectedArticle] = useState<ResourceArticle | null>(null);

  return (
    <section id="resources" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-800 bg-sky-100/80 px-3 py-1 rounded-full mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Theology & Scripture Hub</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          {currentLang.resourceSection.title}
        </h2>
        <p className="mt-3 text-base text-slate-600">
          {currentLang.resourceSection.subtitle}
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentLang.resources.map((article) => (
          <div
            key={article.id}
            className="group bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Zero-Pill unboxed metadata text with separators */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span className="font-semibold text-sky-700">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
              </div>

              <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2">
                {article.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                {article.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedArticle(article)}
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="text-[11px] text-slate-400 font-mono">
                {article.scriptureReferences[0]}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reading Modal */}
      {selectedArticle && (
        <Modal label={selectedArticle.title} onClose={() => setSelectedArticle(null)} className="max-w-2xl bg-white">
          <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-2xl w-full border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              aria-label="Close article"
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-sky-700 font-medium mb-3">
              <span>{selectedArticle.category}</span>
              <span>·</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-4">
              {selectedArticle.title}
            </h2>

            <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-100/80 mb-6 text-sm text-sky-950 italic font-serif">
              "{selectedArticle.summary}"
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Scripture References */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Scripture Cross-References
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedArticle.scriptureReferences.map((ref) => (
                  <span
                    key={ref}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-mono"
                  >
                    {ref}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
