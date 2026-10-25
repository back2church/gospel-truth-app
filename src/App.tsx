/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Header } from './components/Header.tsx';
import { HeroWelcome } from './components/HeroWelcome.tsx';
import { GospelScriptureSection } from './components/GospelScriptureSection.tsx';
import { MediaGallery } from './components/MediaGallery.tsx';
import { VideoLibrary } from './components/VideoLibrary.tsx';
import { ApologeticsAccordion } from './components/ApologeticsAccordion.tsx';
import { ResourceHub } from './components/ResourceHub.tsx';
import { Connect } from './components/Connect.tsx';
import { NextStepsSection } from './components/NextStepsSection.tsx';
import { Footer } from './components/Footer.tsx';
import { PrayerModal } from './components/PrayerModal.tsx';
import { APP_CONTENT, SUPPORTED_LANGUAGES } from './data.ts';

// The app has 3 "pages". There is no router library: we only remember the page in the
// URL hash (#videos, #resources), so the Back button of the phone works.
type Page = 'home' | 'videos' | 'resources';

const getPageFromHash = (): Page => {
  if (window.location.hash === '#videos') return 'videos';
  if (window.location.hash === '#resources') return 'resources';
  return 'home';
};

export default function App() {
  // Pick the language: first the one saved last time, then the browser languages, else English.
  const [selectedLangCode, setSelectedLangCode] = useState<string>(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem('gospel-language'); } catch {}
    const candidates = [saved, ...navigator.languages.map((code) => code.toLowerCase().split('-')[0])];
    return candidates.find((code) => SUPPORTED_LANGUAGES.some((lang) => lang.code === code)) || 'en';
  });
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [page, setPage] = useState<Page>(getPageFromHash);

  // Remember where we were on the main page, so "Back" returns to the same place.
  const savedScroll = useRef<number | null>(null);
  // A section we should scroll to as soon as the main page is shown again (nav tap on another page).
  const pendingSection = useRef<string | null>(null);

  // Whenever the language changes: tell the browser (<html lang>) and save it for the next visit.
  useEffect(() => {
    document.documentElement.lang = selectedLangCode;
    try { localStorage.setItem('gospel-language', selectedLangCode); } catch {}
  }, [selectedLangCode]);

  // When the URL hash changes (our buttons or the phone's Back button), show the right page.
  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const currentContent = APP_CONTENT[selectedLangCode] || APP_CONTENT['en'];

  const smoothOrInstant = () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth');

  const scrollNow = (id: string) => {
    if (id === 'discover') {
      window.scrollTo({ top: 0, behavior: smoothOrInstant() });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: smoothOrInstant() });
  };

  // After the page changed: go back to the old place, to a section we wanted, or to the top.
  useEffect(() => {
    if (page === 'home') {
      if (pendingSection.current) {
        scrollNow(pendingSection.current);
        pendingSection.current = null;
      } else if (savedScroll.current !== null) {
        window.scrollTo({ top: savedScroll.current, behavior: 'instant' });
      } else if (window.location.hash === '#discover') {
        scrollNow('discover');
      }
      savedScroll.current = null;
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [page]);

  // Scroll to a section of the main page. From another page we first go back to the main page.
  const scrollToSection = (id: string) => {
    if (page === 'home') {
      scrollNow(id);
    } else {
      pendingSection.current = id;
      window.location.hash = id;
    }
  };

  const openPage = (next: 'videos' | 'resources') => {
    // Only remember the place when we leave the main page (not when we go from one page to another).
    if (page === 'home') savedScroll.current = window.scrollY;
    window.location.hash = next;
  };

  // "Back" button of the video library and the resources page: return to the main page.
  const goBack = () => {
    if (savedScroll.current !== null) {
      // We came from the main page: step back in the history (same as the phone's Back button).
      window.history.back();
    } else {
      // Page was opened directly (or from another page): go to the Discover section.
      window.location.hash = 'discover';
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-sky-200 selection:text-sky-900">
      {/* Soft warm sun glow in the top-right corner (only decoration) */}
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
        isHomePage={page === 'home'}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 relative z-10 space-y-4 sm:space-y-10">
        {page === 'videos' && <VideoLibrary currentLang={currentContent} onBack={goBack} />}

        {page === 'resources' && <ResourceHub currentLang={currentContent} onBack={goBack} />}

        {page === 'home' && (
          <>
            {/* 1. DISCOVER: welcome, Good News, and the 3 featured videos */}
            <div id="discover">
              {/* Welcome section: greeting, short text and two buttons */}
              <HeroWelcome
                currentLang={currentContent}
                onExploreGospel={() => scrollToSection('gospel')}
                onExploreApologetics={() => scrollToSection('apologetics')}
              />

              {/* The Good News: the Bible text 1 Cor 15:3-5 and a short video */}
              <GospelScriptureSection
                currentLang={currentContent}
                onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
              />

              {/* 3 featured videos + "More videos" button */}
              <MediaGallery currentLang={currentContent} onOpenLibrary={() => openPage('videos')} />
            </div>

            {/* 2. QUESTIONS: Islam, Atheism, Hinduism, Judaism */}
            <ApologeticsAccordion currentLang={currentContent} />

            {/* 3. YOUR NEXT STEPS: Decision, prayer, and sharing */}
            <NextStepsSection
              currentLang={currentContent}
              onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
              onNavigateToSection={scrollToSection}
            />

            {/* 4. CONNECT: one link to find a church */}
            <Connect currentLang={currentContent} />

            {/* At the very end: a button to the Resources page (not in the menu) */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pb-10">
              <button
                onClick={() => openPage('resources')}
                className="w-full flex items-center justify-between gap-3 bg-white/90 border border-slate-200/80 rounded-2xl p-5 text-left shadow-xs hover:border-sky-300 hover:shadow-md transition-all"
              >
                <span className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-sky-700 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block font-serif font-bold text-slate-900">{currentContent.resourceSection.title}</span>
                    <span className="block text-xs text-slate-600 mt-0.5">{currentContent.resourceSection.subtitle}</span>
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-sky-700 shrink-0" aria-hidden="true" />
              </button>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentContent}
        onNavigate={scrollToSection}
        onOpenResources={() => (page === 'resources' ? undefined : openPage('resources'))}
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
