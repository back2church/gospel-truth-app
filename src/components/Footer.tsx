import React from 'react';
import { LanguageContent, APP_NAME } from '../data.ts';
interface FooterProps {
  currentLang: LanguageContent;
  onNavigate: (id: string) => void;
  onOpenResources: () => void; // opens the Resources page
}
export const Footer: React.FC<FooterProps> = ({currentLang, onNavigate, onOpenResources}) => (
  <footer className="site-footer">
    <div><strong>{APP_NAME}</strong><p>{currentLang.hero.description}</p></div>
    <div className="footer-links">
      <button onClick={onOpenResources}>{currentLang.resourceSection.title}</button>
      <button onClick={() => onNavigate('next-steps')}>{currentLang.nextStepsSection.title}</button>
      <span>© {new Date().getFullYear()} {APP_NAME}</span>
    </div>
  </footer>
);
