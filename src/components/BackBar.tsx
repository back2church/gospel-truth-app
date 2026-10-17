import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackBarProps {
  backLabel: string; // "Back" in the language of the person
  title: string; // name of the page, shown on the right (e.g. "Video library")
  onBack: () => void;
}

// The bar at the top of the video library and the resources page: "← Back" and the page name.
export const BackBar: React.FC<BackBarProps> = ({ backLabel, title, onBack }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex items-center justify-between gap-4">
    <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-bold text-sky-800 hover:text-sky-950 py-2 pr-3">
      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
      <span>{backLabel}</span>
    </button>
    <span className="font-serif font-bold text-slate-900 text-sm sm:text-base">{title}</span>
  </div>
);
