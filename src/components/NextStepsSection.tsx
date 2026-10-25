import React from 'react';
import { Heart, BookOpen, Users, Share2, ArrowRight } from 'lucide-react';
import { LanguageContent, BIBLE_JOHN_1, APP_NAME } from '../data.ts';

interface NextStepsSectionProps {
  currentLang: LanguageContent;
  onOpenPrayerModal: () => void;
  onNavigateToSection: (id: string) => void;
}

export const NextStepsSection: React.FC<NextStepsSectionProps> = ({
  currentLang,
  onOpenPrayerModal,
  onNavigateToSection,
}) => {
  const { nextStepsSection, ui } = currentLang;

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: APP_NAME,
        text: ui.shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(ui.linkCopied);
    }
  };

  // Each step has either an `action` (a function) or an `href` (a link that opens in a new tab).
  const steps: { num: string; title: string; desc: string; icon: React.ElementType; btnText: string; action?: () => void; href?: string }[] = [
    {
      num: '01',
      title: nextStepsSection.step1Title,
      desc: nextStepsSection.step1Desc,
      icon: Heart,
      action: onOpenPrayerModal,
      btnText: ui.btnPray,
    },
    {
      num: '02',
      title: nextStepsSection.step2Title,
      desc: nextStepsSection.step2Desc,
      icon: BookOpen,
      // Opens the Gospel of John, chapter 1, on bible.com (German: bibleserver.com, because the NLB is not on bible.com) in the person's language (new tab)
      href: BIBLE_JOHN_1[currentLang.code] || BIBLE_JOHN_1.en,
      btnText: ui.btnRead,
    },
    {
      num: '03',
      title: nextStepsSection.step3Title,
      desc: nextStepsSection.step3Desc,
      icon: Users,
      action: () => onNavigateToSection('connect'),
      btnText: ui.btnConnect,
    },
    {
      num: '04',
      title: nextStepsSection.step4Title,
      desc: nextStepsSection.step4Desc,
      icon: Share2,
      action: handleShareApp,
      btnText: ui.btnShare,
    },
  ];

  // Same look for the button and for the link
  const buttonClass = 'w-full py-2.5 px-3 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-sky-50 hover:text-sky-800 hover:border-sky-200 border border-slate-200/60 rounded-xl transition-all flex items-center justify-center gap-1.5';

  return (
    <section id="next-steps" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-800 bg-sky-100/80 px-3 py-1 rounded-full mb-3">
          <Heart className="w-3.5 h-3.5 fill-sky-800/20" />
          <span>{ui.badgeNextSteps}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          {nextStepsSection.title}
        </h2>
        <p className="mt-3 text-base text-slate-600">
          {nextStepsSection.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.num}
              className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xs mb-4 border border-sky-100/80">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-bold text-slate-900 mb-2">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {st.desc}
                </p>
              </div>

              {st.href ? (
                <a
                  href={st.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass}
                >
                  <span>{st.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button onClick={st.action} className={buttonClass}>
                  <span>{st.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
