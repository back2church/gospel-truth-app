// Short navigation labels remain readable on small screens in every supported language.
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
  fil: ['Tuklasin', 'Panoorin', 'Mga tanong', 'Makilala', 'Malugod kang tinatanggap dito', 'Higit pa', 'Mas kaunti'],
};
export const designCopy = (code: string) => labels[code] || labels.en;
