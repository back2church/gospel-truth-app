import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LanguageContent } from '../data.ts';
import { designCopy } from '../designCopy.ts';

interface HeroWelcomeProps {
  currentLang: LanguageContent;
  selectedLangCode: string;
  onSelectLang: (code: string) => void;
  onExploreGospel: () => void;
  onExploreApologetics: () => void;
}
export const HeroWelcome: React.FC<HeroWelcomeProps> = ({currentLang, onExploreGospel, onExploreApologetics}) => (
  <section id="hero" className="welcome-section">
    <div className="welcome-glow" aria-hidden="true" />
    <div className="welcome-content">
      <p className="eyebrow"><span className="welcome-dot" />{designCopy(currentLang.code)[4]}</p>
      <h1>{currentLang.hero.subtitle}</h1>
      <p className="welcome-description">{currentLang.hero.description}</p>
      <div className="welcome-actions">
        <button onClick={onExploreGospel} className="primary-action">{currentLang.hero.ctaGospel}<ArrowRight size={18} /></button>
        <button onClick={onExploreApologetics} className="text-action">{currentLang.hero.ctaApologetics}<span aria-hidden="true">↗</span></button>
      </div>
      <div className="welcome-caption"><span />{currentLang.gospelMessage.scriptureReference}<span /></div>
    </div>
  </section>
);
