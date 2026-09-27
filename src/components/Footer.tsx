import React from 'react';
import { LanguageContent } from '../data.ts';
interface FooterProps {
  currentLang: LanguageContent;
  onSelectLang: (code: string) => void;
  onNavigate: (id: string) => void;
}
export const Footer: React.FC<FooterProps> = ({currentLang, onNavigate}) => (
  <footer className="site-footer">
    <div><strong>Good News & Truth</strong><p>{currentLang.hero.description}</p></div>
    <div className="footer-links">
      <button onClick={() => onNavigate('resources')}>{currentLang.resourceSection.title}</button>
      <button onClick={() => onNavigate('next-steps')}>{currentLang.nav.nextSteps}</button>
      <span>© {new Date().getFullYear()} Good News & Truth</span>
    </div>
  </footer>
);
