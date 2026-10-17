// Short navigation labels remain readable on small screens in every supported language.
// Position in each list: 0 = Discover, 1 = Watch (not used any more, there is no "Watch" item in the menu),
// 2 = Questions, 3 = Connect, 4 = "You are welcome here", 5 = Show more, 6 = Show less.
// The 4th menu item "Your next steps" is NOT in this list: it uses nextStepsSection.title of the language (data.ts).
const labels: Record<string, string[]> = {
  en: ['Discover', 'Watch', 'Questions', 'Connect', 'You are welcome here', 'Show more', 'Show less'],
  de: ['Entdecken', 'Videos', 'Fragen', 'Kontakt', 'Du bist hier willkommen', 'Mehr anzeigen', 'Weniger anzeigen'],
  fr: ['Découvrir', 'Vidéos', 'Questions', 'Rencontrer', 'Vous êtes les bienvenus', 'Voir plus', 'Voir moins'],
  it: ['Scopri', 'Video', 'Domande', 'Incontra', 'Qui sei benvenuto', 'Mostra altro', 'Mostra meno'],
  rm: ['Scuvrir', 'Videos', 'Dumondas', 'Contact', 'Ti es bainvegni', 'Mussar dapli', 'Mussar main'],
  sq: ['Zbulo', 'Video', 'Pyetje', 'Lidhu', 'Je i mirëpritur këtu', 'Shfaq më shumë', 'Shfaq më pak'],
  pt: ['Descobrir', 'Vídeos', 'Perguntas', 'Conectar', 'Você é bem-vindo aqui', 'Mostrar mais', 'Mostrar menos'],
  es: ['Descubrir', 'Videos', 'Preguntas', 'Conectar', 'Aquí eres bienvenido', 'Ver más', 'Ver menos'],
  sr: ['Otkrij', 'Video', 'Pitanja', 'Poveži se', 'Ovde si dobrodošao', 'Prikaži više', 'Prikaži manje'],
  // NEEDS PROOFREAD (Lam)
  fil: ['Discover', 'Watch', 'Questions', 'Connect', 'Welcome ka dito', 'Magpakita pa', 'Magpakita nang mas kaunti'],
};
export const designCopy = (code: string) => labels[code] || labels.en;
