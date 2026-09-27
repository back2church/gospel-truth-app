import React, { useEffect, useState } from 'react';
import { Compass, Play, MessageCircle, Users, Languages } from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageContent } from '../data.ts';
import { designCopy } from '../designCopy.ts';

interface HeaderProps {
  currentLang: LanguageContent;
  selectedLangCode: string;
  onSelectLang: (code: string) => void;
  onNavigate: (sectionId: string) => void;
  onOpenPrayerModal: () => void;
}
export const Header: React.FC<HeaderProps> = ({currentLang, selectedLangCode, onSelectLang, onNavigate}) => {
  const [active, setActive] = useState('gospel');
  const copy = designCopy(currentLang.code);
  const items = [
    {id: 'gospel', label: copy[0], Icon: Compass},
    {id: 'media', label: copy[1], Icon: Play},
    {id: 'apologetics', label: copy[2], Icon: MessageCircle},
    {id: 'churches', label: copy[3], Icon: Users},
  ];
  useEffect(() => {
    const update = () => {
      const anchors = ['gospel', 'media', 'apologetics', 'churches'];
      let current = anchors[0];
      for (const id of anchors) if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= innerHeight * .45) current = id;
      setActive(current);
    };
    window.addEventListener('scroll', update, {passive: true});
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  const links = items.map(({id, label, Icon}) => <button key={id} onClick={() => onNavigate(id)}
    aria-current={active === id ? 'location' : undefined}
    className={`nav-item ${active === id ? 'nav-active' : ''}`}>
    <Icon size={19} aria-hidden="true" /><span>{label}</span>
  </button>);
  return <>
    <header className="site-header">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:bg-white focus:p-3">{currentLang.hero.ctaGospel}</a>
      <div className="header-inner">
        <button onClick={() => onNavigate('hero')} className="wordmark"><span aria-hidden="true" className="brand-cross">†</span><span>Good News<span className="brand-sub"> & Truth</span></span></button>
        <nav className="desktop-nav" aria-label={currentLang.nav.home}>{links}</nav>
        <label className="language-control"><Languages size={17} aria-hidden="true" /><span className="sr-only">{currentLang.welcome}</span>
          <select value={selectedLangCode} onChange={event => onSelectLang(event.target.value)} aria-label="Select application language">
            {SUPPORTED_LANGUAGES.map(language => <option key={language.code} value={language.code}>{language.nativeName}</option>)}
          </select>
        </label>
      </div>
    </header>
    <nav className="mobile-nav" aria-label={currentLang.nav.home}>{links}</nav>
  </>;
};
