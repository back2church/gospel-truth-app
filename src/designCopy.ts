// Short labels for the menu and a few small texts, in every supported language.
// Each label has a name (discover, questions, ...) so the code reads designCopy(code).questions
// instead of a number like [2] that is easy to mix up.
// The menu item "Your next steps" is NOT in this list: it uses nextStepsSection.title of the language (data.ts),
// except where a language has its own entry in `nextStepsMenuLabels` below (Filipino keeps the English words in the menu).
// Filipino menu labels (Discover, Questions, Your next steps, Connect) stay English on purpose (Siggi's decision).
// (The old "Watch" label was removed: there is no "Watch" item in the menu any more.)
export interface DesignCopy {
  discover: string; // menu: Discover
  questions: string; // menu: Questions
  connect: string; // menu: Connect (and the small title above the Connect section)
  welcome: string; // "You are welcome here" above the big welcome title
  showMore: string; // button: Show more
  showLess: string; // button: Show less
}

const labels: Record<string, DesignCopy> = {
  en: { discover: 'Discover', questions: 'Questions', connect: 'Connect', welcome: 'You are welcome here', showMore: 'Show more', showLess: 'Show less' },
  de: { discover: 'Entdecken', questions: 'Fragen', connect: 'Kontakt', welcome: 'Du bist hier willkommen', showMore: 'Mehr anzeigen', showLess: 'Weniger anzeigen' },
  fr: { discover: 'Découvrir', questions: 'Questions', connect: 'Rencontrer', welcome: 'Vous êtes les bienvenus', showMore: 'Voir plus', showLess: 'Voir moins' },
  it: { discover: 'Scopri', questions: 'Domande', connect: 'Incontra', welcome: 'Qui sei benvenuto', showMore: 'Mostra altro', showLess: 'Mostra meno' },
  sq: { discover: 'Zbulo', questions: 'Pyetje', connect: 'Lidhu', welcome: 'Je i mirëpritur këtu', showMore: 'Shfaq më shumë', showLess: 'Shfaq më pak' },
  pt: { discover: 'Descobrir', questions: 'Perguntas', connect: 'Conectar', welcome: 'Você é bem-vindo aqui', showMore: 'Mostrar mais', showLess: 'Mostrar menos' },
  es: { discover: 'Descubrir', questions: 'Preguntas', connect: 'Conectar', welcome: 'Aquí eres bienvenido', showMore: 'Ver más', showLess: 'Ver menos' },
  sr: { discover: 'Otkrij', questions: 'Pitanja', connect: 'Poveži se', welcome: 'Ovde si dobrodošao', showMore: 'Prikaži više', showLess: 'Prikaži manje' },
  fil: { discover: 'Discover', questions: 'Questions', connect: 'Connect', welcome: 'Welcome ka dito', showMore: 'Show more', showLess: 'Show less' },
};
// Labels for one language. Unknown language code: use English.
export const designCopy = (code: string): DesignCopy => labels[code] || labels.en;

// Special menu label for "Your next steps" (top menu, bottom nav and footer link). Only Filipino has one.
const nextStepsMenuLabels: Record<string, string> = {
  fil: 'Your next steps',
};
export const nextStepsMenuLabel = (code: string, sectionTitle: string) => nextStepsMenuLabels[code] || sectionTitle;
