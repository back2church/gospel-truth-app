/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { HeroWelcome } from './components/HeroWelcome.tsx';
import { GospelScriptureSection } from './components/GospelScriptureSection.tsx';
import { MediaGallery } from './components/MediaGallery.tsx';
import { ApologeticsAccordion } from './components/ApologeticsAccordion.tsx';
import { ResourceHub } from './components/ResourceHub.tsx';
import { ChurchDirectory } from './components/ChurchDirectory.tsx';
import { NextStepsSection } from './components/NextStepsSection.tsx';
import { Footer } from './components/Footer.tsx';
import { PrayerModal } from './components/PrayerModal.tsx';
import { APP_CONTENT, SUPPORTED_LANGUAGES, SWISS_CHURCHES } from './data.ts';
import type { ManagedContent, ManagedItem } from './contentStore.ts';

const AdminPanel = React.lazy(() => import('./components/AdminPanel.tsx').then(module => ({ default: module.AdminPanel })));
const firebaseReady = Boolean(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_AUTH_DOMAIN && import.meta.env.VITE_FIREBASE_PROJECT_ID && import.meta.env.VITE_FIREBASE_APP_ID);
const emptyContent: ManagedContent = { articles: [], churches: [], videos: [] };
function itemsForLanguage<T>(items: ManagedItem[], language: string): T[] {
  return items.filter(item => item.language === language || item.language === 'all').map(({ language: _language, published: _published, ...item }) => item as T);
}

export default function App() {
  // Try to pick language matching browser or fallback to German / English
  const [selectedLangCode, setSelectedLangCode] = useState<string>(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem('gospel-language'); } catch {}
    const candidates = [saved, ...navigator.languages.map((code) => code.toLowerCase().split('-')[0])];
    return candidates.find((code) => SUPPORTED_LANGUAGES.some((lang) => lang.code === code)) || 'en';
  });
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(() => window.location.hash === '#admin');
  const [managed, setManaged] = useState<ManagedContent>(emptyContent);

  useEffect(() => {
    const update = () => setAdminOpen(window.location.hash === '#admin');
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    if (!firebaseReady) return;
    let unsubscribers: (() => void)[] = [];
    let cancelled = false;
    import('./contentStore.ts').then(({ subscribeContent }) => {
      if (cancelled) return;
      unsubscribers = (['articles', 'churches', 'videos'] as const).map(kind =>
        subscribeContent(kind, items => setManaged(previous => ({ ...previous, [kind]: items }))));
    });
    return () => { cancelled = true; unsubscribers.forEach(unsubscribe => unsubscribe()); };
  }, []);

  // Check user language on initial mount
  useEffect(() => {
    document.documentElement.lang = selectedLangCode;
    try { localStorage.setItem('gospel-language', selectedLangCode); } catch {}
  }, [selectedLangCode]);

  const baseContent = APP_CONTENT[selectedLangCode] || APP_CONTENT['en'];
  const currentContent = {
    ...baseContent,
    resources: mergeContent(baseContent.resources, itemsForLanguage(managed.articles, selectedLangCode), `${selectedLangCode}-`),
    videos: mergeContent(baseContent.videos, itemsForLanguage(managed.videos, selectedLangCode), `${selectedLangCode}-`),
  };
  const churches = mergeContent(SWISS_CHURCHES.map(church => ({ ...church, id: churchId(church.name) })), itemsForLanguage(managed.churches, selectedLangCode)).map(({ id: _id, ...church }) => church);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };

  if (adminOpen) return <React.Suspense fallback={<p className="admin-shell">Loading content manager…</p>}><AdminPanel onClose={() => { window.location.hash = ''; setAdminOpen(false); }} /></React.Suspense>;

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-sky-200 selection:text-sky-900">
      {/* Soft warm sun glow in the top-right corner as specified in prompt */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-200/35 via-sky-100/20 to-transparent blur-3xl z-0"
        aria-hidden="true"
      />
      
      {/* Navigation Header */}
      <Header
        currentLang={currentContent}
        selectedLangCode={selectedLangCode}
        onSelectLang={setSelectedLangCode}
        onNavigate={scrollToSection}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 relative z-10 space-y-4 sm:space-y-10">
        {/* Hero Welcome Section with 3s cycling greeting & language selector */}
        <HeroWelcome
          currentLang={currentContent}
          selectedLangCode={selectedLangCode}
          onSelectLang={setSelectedLangCode}
          onExploreGospel={() => scrollToSection('gospel')}
          onExploreApologetics={() => scrollToSection('apologetics')}
        />

        {/* Core Gospel Presentation: Scenes 1-4 from video plan & 1 Cor 15:3-5 */}
        <GospelScriptureSection
          currentLang={currentContent}
          onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
        />

        {/* Apologetics Truth Accordion: Islam, Atheism, Hinduism, Judaism */}
        <ApologeticsAccordion currentLang={currentContent} />

        {/* Resource Hub: Articles & foundational teachings */}
        <ResourceHub currentLang={currentContent} />

        {/* Swiss & Migrant Church Finder */}
        <ChurchDirectory currentLang={currentContent} churches={churches} />

        {/* Next Steps: Decision, prayer, and sharing */}
        <NextStepsSection
          currentLang={currentContent}
          onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
          onNavigateToSection={scrollToSection}
        />

        {/* Keep videos as the final content section. */}
        <MediaGallery currentLang={currentContent} />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentContent}
        onSelectLang={setSelectedLangCode}
        onNavigate={scrollToSection}
      />

      {/* Acceptance & Faith Prayer Modal */}
      <PrayerModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
        currentLang={currentContent}
      />
    </div>
  );
}

const churchId = (name: string) => `church-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
function mergeContent<T extends { id?: string; name?: string }>(defaults: T[], overrides: T[], prefix = ''): T[] {
  const byId = new Map(defaults.map(item => [`${prefix}${item.id || churchId(item.name || '')}`, item]));
  for (const item of overrides) {
    const id = item.id || churchId(item.name || '');
    if ((item as T & { deleted?: boolean }).deleted) byId.delete(id);
    else byId.set(id, item);
  }
  return [...byId.values()];
}
