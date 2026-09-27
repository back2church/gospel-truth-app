import React, { useEffect, useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { LanguageContent } from '../data.ts';

interface GospelScriptureSectionProps {
  currentLang: LanguageContent;
  onOpenPrayerModal: () => void;
}
const GOOD_NEWS_VIDEOS: Record<string, { id: string; label: string }> = {
  en: { id: 'Lq5jNEECZiM', label: 'English' },
  de: { id: 'CNywpV2yYEc', label: 'Deutsch' },
  it: { id: '-CYtKabFD3A', label: 'Italiano' },
};
export const GospelScriptureSection: React.FC<GospelScriptureSectionProps> = ({currentLang, onOpenPrayerModal}) => {
  const {gospelMessage} = currentLang;
  const [videoLang, setVideoLang] = useState(() => GOOD_NEWS_VIDEOS[currentLang.code] ? currentLang.code : 'en');
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    setPlaying(false);
    setVideoLang(GOOD_NEWS_VIDEOS[currentLang.code] ? currentLang.code : 'en');
  }, [currentLang.code]);
  const video = GOOD_NEWS_VIDEOS[videoLang];
  return <section id="gospel" className="reading-section">
    <div className="section-heading">
      <p className="eyebrow">{gospelMessage.scriptureReference}</p>
      <h2>{gospelMessage.title}</h2>
      <p>{gospelMessage.subtitle}</p>
    </div>
    <div className="reading-layout">
      <div className="scripture-reading">
        {gospelMessage.verses.map(verse => <p key={verse.reference}><sup>{verse.reference.match(/\d+$/)?.[0]}</sup>{verse.text}</p>)}
      </div>
      <div className="shorts-panel">
        <div className="shorts-frame">
          {playing ? <iframe src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`} title={`${gospelMessage.title} · ${video.label}`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> :
            <button type="button" onClick={() => setPlaying(true)} aria-label={`${gospelMessage.title} · ${video.label}`} className="shorts-play">
              <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" /><span><Play size={24} fill="currentColor" /></span>
            </button>}
        </div>
        <div className="shorts-languages" aria-label="Video language">
          {Object.entries(GOOD_NEWS_VIDEOS).map(([code, item]) => <button key={code} onClick={() => { setVideoLang(code); setPlaying(false); }} aria-pressed={code === videoLang} className={code === videoLang ? 'selected' : ''}>{item.label}</button>)}
        </div>
      </div>
    </div>
    <div className="pillars-grid">
      {gospelMessage.corePillars.map((pillar, index) => <article key={pillar.title}>
        <span className="pillar-number">0{index + 1}</span><h3>{pillar.title}</h3><p>{pillar.description}</p>
      </article>)}
    </div>
    <button className="text-action prayer-invitation" onClick={onOpenPrayerModal}>{gospelMessage.faithPrayerTitle}<ArrowRight size={18} /></button>
  </section>;
};
