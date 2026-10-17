import React, { useEffect, useState } from 'react';
import { Compass, MessageCircle, Footprints, Users, Languages } from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageContent, APP_NAME } from '../data.ts';
import { designCopy, nextStepsMenuLabel } from '../designCopy.ts';

interface HeaderProps {
  currentLang: LanguageContent;
  selectedLangCode: string;
  onSelectLang: (code: string) => void;
  onNavigate: (sectionId: string) => void;
  isHomePage: boolean; // false on the video library / resources page
}

// The menu: 4 items, always in this order, in every language.
// The ids are the ids of the sections in App.tsx.
const MENU_ITEMS = ['discover', 'apologetics', 'next-steps', 'connect'];

export const Header: React.FC<HeaderProps> = ({currentLang, selectedLangCode, onSelectLang, onNavigate, isHomePage}) => {
  const [active, setActive] = useState('discover');
  const copy = designCopy(currentLang.code);
  const items = [
    {id: 'discover', label: copy[0], Icon: Compass},
    {id: 'apologetics', label: copy[2], Icon: MessageCircle},
    {id: 'next-steps', label: nextStepsMenuLabel(currentLang.code, currentLang.nextStepsSection.title), Icon: Footprints},
    {id: 'connect', label: copy[3], Icon: Users},
  ];
  useEffect(() => {
    // On the video library / resources page "Discover" is highlighted.
    if (!isHomePage) { setActive('discover'); return; }
    // Scroll spy: the active item is the last section whose top is above 45% of the screen.
    const update = () => {
      let current = MENU_ITEMS[0];
      for (const id of MENU_ITEMS) if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= innerHeight * .45) current = id;
      setActive(current);
    };
    window.addEventListener('scroll', update, {passive: true});
    update();
    return () => window.removeEventListener('scroll', update);
  }, [isHomePage]);
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
          <select value={selectedLangCode} onChange={event => onSelectLang(event.target.value)} aria-label={currentLang.ui.selectLanguage}>
            {SUPPORTED_LANGUAGES.map(language => <option key={language.code} value={language.code}>{language.nativeName}</option>)}
          </select>
        </label>
      </div>
    </header>
    <nav className="mobile-nav" aria-label={currentLang.nav.home}>{links}</nav>
  </>;
};
