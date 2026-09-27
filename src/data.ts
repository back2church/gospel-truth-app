export interface ScriptureVerse {
  reference: string;
  text: string;
  notes?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  speakerOrSource: string;
  description: string;
  youtubeId: string;
  isCustomGoogleVid?: boolean;
}

export interface ApologeticItem {
  id: string;
  worldview: 'islam' | 'atheism' | 'hinduism' | 'judaism' | 'general';
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  keyScriptures: string[];
  recommendedThinkers: string[];
}

export interface ResourceArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
  scriptureReferences: string[];
}

export interface ChurchItem {
  name: string;
  city: string;
  canton: string;
  languages: string[];
  address: string;
  website: string;
  type: string;
}

export interface LanguageContent {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  welcome: string; // The cycling text
  nav: {
    home: string;
    gospelScripture: string;
    media: string;
    apologetics: string;
    resources: string;
    churches: string;
    nextSteps: string;
  };
  hero: {
    subtitle: string;
    description: string;
    ctaGospel: string;
    ctaApologetics: string;
  };
  gospelMessage: {
    title: string;
    subtitle: string;
    scene1Intro: string;
    scene2Transition: string;
    scene3ScriptureHeading: string;
    scene4Closing: string;
    scriptureReference: string;
    verses: ScriptureVerse[];
    corePillars: {
      title: string;
      description: string;
    }[];
    faithPrayerTitle: string;
    faithPrayerText: string;
  };
  mediaSection: {
    title: string;
    subtitle: string;
    filterAll: string;
    customVideoPrompt: string;
    pasteIdHint: string;
    addCustomBtn: string;
  };
  apologeticsSection: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    categories: {
      all: string;
      atheism: string;
      islam: string;
      hinduism: string;
      judaism: string;
    };
  };
  resourceSection: {
    title: string;
    subtitle: string;
  };
  churchSection: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterCanton: string;
  };
  nextStepsSection: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  videos: VideoItem[];
  apologetics: ApologeticItem[];
  resources: ResourceArticle[];
}

// 10 languages specified in user prompt & starter pack:
// German (de), French (fr), Italian (it), Romansh (rm), English (en),
// Albanian (sq), Portuguese (pt), Spanish (es), Serbian/Croatian (sr), Filipino (fil)

export const SUPPORTED_LANGUAGES: {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  welcomeCyclingText: string;
}[] = [
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇨🇭',
    welcomeCyclingText: 'Hallo. Wähle deine Sprache.',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇨🇭',
    welcomeCyclingText: 'Salut. Choisis ta langue.',
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇨🇭',
    welcomeCyclingText: 'Ciao. Scegli la tua lingua.',
  },
  {
    code: 'rm',
    name: 'Romansh',
    nativeName: 'Rumantsch',
    flag: '🇨🇭',
    welcomeCyclingText: 'Chau. Tscherna tia lingua.',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    welcomeCyclingText: 'Hi there. Choose your language.',
  },
  {
    code: 'sq',
    name: 'Albanian',
    nativeName: 'Shqip',
    flag: '🇦🇱',
    welcomeCyclingText: 'Çkemi. Zgjidh gjuhën tënde.',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    welcomeCyclingText: 'Olá. Escolha o seu idioma.',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    welcomeCyclingText: 'Hola. Elige tu idioma.',
  },
  {
    code: 'sr',
    name: 'Serbian / Croatian',
    nativeName: 'Srpski / Hrvatski',
    flag: '🇷🇸',
    welcomeCyclingText: 'Zdravo. Izaberi svoj jezik.',
  },
  {
    code: 'fil',
    name: 'Filipino / Tagalog',
    nativeName: 'Filipino',
    flag: '🇵🇭',
    welcomeCyclingText: 'Kumusta. Piliin ang iyong wika.',
  },
];

// Common apologetics data base in English for rich theological and philosophical depth
const baseApologeticsEN: ApologeticItem[] = [
  {
    id: 'ath-1',
    worldview: 'atheism',
    question: 'How do we know God exists? What about the Origin and Fine-Tuning of the Universe?',
    shortAnswer: 'The Kalam Cosmological Argument and cosmic fine-tuning show that our universe had an absolute beginning and is calibrated to extreme mathematical precision.',
    detailedAnswer: 'Modern astrophysics confirms that time, space, matter, and energy came into existence at the Big Bang. Whatever begins to exist must have a cause transcendent to space and time. Furthermore, the fundamental physical constants of physics (the gravitational constant, strong nuclear force, cosmological constant) are calibrated to 1 part in 10^120—a precision analogous to hitting a 1-inch target on the opposite side of the observable universe. Random chance is mathematically untenable; an intentional Cosmic Mind remains the most coherent scientific and philosophical explanation.',
    keyScriptures: ['Genesis 1:1', 'Psalm 19:1', 'Romans 1:20'],
    recommendedThinkers: ['Dr. William Lane Craig', 'Dr. John Lennox', 'Dr. Stephen Meyer'],
  },
  {
    id: 'ath-2',
    worldview: 'atheism',
    question: 'Can objective morality exist without God?',
    shortAnswer: 'Without a transcendent Lawgiver, moral values are merely subjective social preferences or evolutionary herd instincts.',
    detailedAnswer: 'If naturalistic atheism is true, morality is merely an evolutionary mechanism for genetic survival, with no objective moral duty binding anyone. Yet, every honest human recognizes that acts like genocide, torture of innocents, or oppression are truly, objectively evil—not just socially unfashionable. Objective moral values and duties presuppose an absolute transcendent standard of goodness, which Christian theism identifies as the character of God (as C.S. Lewis famously articulated in Mere Christianity).',
    keyScriptures: ['Romans 2:14-15', 'Micah 6:8', 'Matthew 22:37-40'],
    recommendedThinkers: ['C.S. Lewis', 'Dr. Frank Turek', 'Dr. Paul Copan'],
  },
  {
    id: 'ath-3',
    worldview: 'atheism',
    question: 'What historical evidence supports the physical resurrection of Jesus?',
    shortAnswer: 'Historical critical scholars affirm core facts: Jesus died by crucifixion, the tomb was empty, skeptics had unexpected conversion experiences, and the early Church exploded in Jerusalem.',
    detailedAnswer: 'Using the Minimal Facts approach accepted by skeptical historians: (1) Jesus died by Roman crucifixion, (2) He was buried in a known tomb, (3) The tomb was found empty by female witnesses—which no 1st-century author fabricating a myth would invent, (4) Skeptics like James (Jesus\' brother) and Saul of Tarsus (the persecutor) were instantly transformed after encountering the risen Jesus, and (5) The disciples were willing to suffer torture and martyrdom. People will die for what they mistakenly believe is true, but no one dies for what they knowingly fabricated.',
    keyScriptures: ['1 Corinthians 15:3-8', 'Luke 24:36-43', 'Acts 2:22-32'],
    recommendedThinkers: ['Dr. Gary Habermas', 'N.T. Wright', 'Lee Strobel'],
  },
  {
    id: 'isl-1',
    worldview: 'islam',
    question: 'Did Jesus die on the cross, or was someone substituted in his place?',
    shortAnswer: 'Unanimous 1st-century historical evidence, medical analysis, and Roman military records confirm Jesus died on the cross, contradicting Surah 4:157 written 600 years later.',
    detailedAnswer: 'The historical consensus across Christian, Roman, and Jewish historians (Tacitus, Josephus, Lucian) is that Jesus was executed under Pontius Pilate. Roman executioners faced execution themselves if a prisoner survived. Surah An-Nisa 4:157 states "they killed him not, nor crucified him, but it appeared so unto them." The idea of Allah deceiving observers by changing another person’s face (often thought to be Judas) makes God the author of a global religious deception for 600 years. Jesus\' death was prophesied in Isaiah 53 centuries before and confirmed by eyewitnesses who saw His side pierced with blood and water.',
    keyScriptures: ['Isaiah 53:5', 'John 19:33-35', 'Philippians 2:8'],
    recommendedThinkers: ['Nabeel Qureshi', 'Dr. David Wood', 'Dr. James White'],
  },
  {
    id: 'isl-2',
    worldview: 'islam',
    question: 'How can Christians believe in the Trinity without committing polytheism (Shirk)?',
    shortAnswer: 'The Trinity teaches One Being (What God is) in Three Persons (Who God is), not three separate gods.',
    detailedAnswer: 'Christianity is strictly monotheistic (Deuteronomy 6:4). God is one in essence and substance, but eternally exists in three distinct persons: the Father, the Son, and the Holy Spirit. Personhood describes "who", while nature or being describes "what". Because God is eternally love (1 John 4:8), divine love existed before creation between the Father and the Son. In Jesus, God did not create another deity; God Himself stepped into human history to rescue us.',
    keyScriptures: ['Matthew 28:19', '2 Corinthians 13:14', 'John 1:1-3, 14'],
    recommendedThinkers: ['Dr. William Lane Craig', 'St. Augustine', 'Timothy Keller'],
  },
  {
    id: 'isl-3',
    worldview: 'islam',
    question: 'Has the Bible been altered (Tahrif)? How reliable are the manuscripts?',
    shortAnswer: 'We possess over 5,800 Greek New Testament manuscripts dating to within decades of the originals, showing 99.5% textual consistency with zero doctrine compromised.',
    detailedAnswer: 'The Dead Sea Scrolls discovered in 1947 proved that the Old Testament text remained identical over a 1,000-year gap. For the New Testament, early papyri (such as P52 dating to ~125 AD) and early translations into Syriac, Latin, and Coptic confirm that the Gospels were never rewritten. Even the Quran in Surah 5:46-47 and Surah 10:94 tells believers to consult the Gospel and Torah in their possession in the 7th century, confirming the Scriptures had not been lost.',
    keyScriptures: ['Psalm 119:89', 'Isaiah 40:8', '1 Peter 1:24-25'],
    recommendedThinkers: ['Dr. Daniel Wallace', 'F.F. Bruce', 'Dr. Peter J. Williams'],
  },
  {
    id: 'hin-1',
    worldview: 'hinduism',
    question: 'How does the Christian Gospel differ from Karma, Reincarnation, and Maya?',
    shortAnswer: 'Karma requires endless rebirths to pay one’s own debt with no certainty of escape; the Gospel provides Grace where Jesus paid the entire debt once for all.',
    detailedAnswer: 'In Eastern thought, Karma is an impersonal cosmic balance requiring countless reincarnations (Samsara) to exhaust the consequences of past lives, offering no assurance of liberation (Moksha). In dramatic contrast, the Bible teaches that humans are made in the image of God and will live once, then face judgment (Hebrews 9:27). God in His mercy provides Grace (unmerited favor): Jesus Christ bore our sins on the cross so that we receive immediate forgiveness, adoption as children of God, and eternal life as a free gift, not an earned status.',
    keyScriptures: ['Hebrews 9:27', 'Ephesians 2:8-9', 'Titus 3:5'],
    recommendedThinkers: ['Ravi Zacharias', 'Dr. Vishal Mangalwadi', 'Sadhu Sundar Singh'],
  },
  {
    id: 'hin-2',
    worldview: 'hinduism',
    question: 'Is God an impersonal cosmic force (Brahman) or a Personal Loving Father?',
    shortAnswer: 'The Creator is not an indifferent energy, but a personal, relational Being who knows our name and entered our world in Jesus.',
    detailedAnswer: 'Pantheism identifies God with the universe ("all is one, and all is god"). But if God is everything, then God encompasses both good and evil, cancer and healing, cruelty and compassion. The God of the Bible is transcendent and personal. He creates out of love, possesses will, desires relationship, and revealed Himself tangibly by entering human history in Jesus Christ to wipe away our tears.',
    keyScriptures: ['John 17:3', 'Psalm 139:1-4', '1 John 4:9-10'],
    recommendedThinkers: ['Dr. L.T. Jeyachandran', 'C.S. Lewis', 'Francis Schaeffer'],
  },
  {
    id: 'jud-1',
    worldview: 'judaism',
    question: 'Where is Jesus revealed in the Hebrew Scriptures (Tanakh / Old Testament)?',
    shortAnswer: 'Over 300 specific prophecies were fulfilled in Jesus, including Isaiah 53, Psalm 22, Daniel 9, and Micah 5:2.',
    detailedAnswer: 'Centuries before Roman crucifixion was invented, Psalm 22 described the piercing of hands and feet and the casting of lots for garments. Isaiah 53 describes the Suffering Servant: "He was pierced for our transgressions, crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed." Daniel 9:24-26 predicted the Messiah would arrive and be cut off before the destruction of the Second Temple (which occurred in 70 AD). Micah 5:2 named Bethlehem Ephrathah as His birthplace.',
    keyScriptures: ['Isaiah 53:1-12', 'Psalm 22:1-18', 'Micah 5:2', 'Daniel 9:26'],
    recommendedThinkers: ['Dr. Michael Brown', 'Alfred Edersheim', 'Dr. Mitch Glaser'],
  },
  {
    id: 'jud-2',
    worldview: 'judaism',
    question: 'Why does Jesus fulfill the Torah rather than abolish it?',
    shortAnswer: 'Jesus came as the ultimate Passover Lamb and High Priest, fulfilling the sacrificial system and inaugurating the prophesied New Covenant.',
    detailedAnswer: 'In Jeremiah 31:31-34, God promised a New Covenant (Brit Chadashah) with the house of Israel. The animal sacrifices in the Temple were shadows pointing toward the once-for-all sacrifice of the Messiah. Jesus declared: "Do not think that I have come to abolish the Law or the Prophets; I have not come to abolish them but to fulfill them" (Matthew 5:17). In Christ, both Jews and Gentiles are united in one family of Abraham through faith.',
    keyScriptures: ['Jeremiah 31:31-34', 'Matthew 5:17', 'Romans 11:17-24'],
    recommendedThinkers: ['Dr. Michael Brown', 'Stan Telchin', 'Jonathan Cahn'],
  },
];

const baseVideos: VideoItem[] = [
  {
    id: 'vid-gospel-1',
    title: 'The Gospel Explained: 1 Corinthians 15:3-5',
    category: 'Gospel Message',
    speakerOrSource: 'Gospel & Truth (Swiss / English)',
    description: 'A clear walkthrough of 1 Corinthians 15:3–5 explaining that Christ died for our sins, was buried, rose on the third day, and appeared to eyewitnesses.',
    youtubeId: 'V9P4w024w4k', // BibleProject Gospel video
    isCustomGoogleVid: false,
  },
  {
    id: 'vid-apol-1',
    title: 'The Kalam Cosmological Argument in 4 Minutes',
    category: 'Atheism & Science',
    speakerOrSource: 'Dr. William Lane Craig (Reasonable Faith)',
    description: 'Did the universe have a beginning? Watch the famous philosophical and astrophysical proof for the existence of God.',
    youtubeId: '6CulBuMCLg0',
    isCustomGoogleVid: false,
  },
  {
    id: 'vid-apol-2',
    title: 'Did Jesus Really Rise From The Dead?',
    category: 'Resurrection Evidence',
    speakerOrSource: 'Frank Turek (CrossExamined)',
    description: 'Answering skeptics with the 5 Minimal Historical Facts of Jesus of Nazareth and the empty tomb.',
    youtubeId: '4qhQIACh4iQ',
    isCustomGoogleVid: false,
  },
  {
    id: 'vid-apol-3',
    title: 'The Moral Argument: Can We Be Good Without God?',
    category: 'Philosophy & Ethics',
    speakerOrSource: 'Reasonable Faith / C.S. Lewis Institute',
    description: 'Why objective moral values and duties point directly to a personal Moral Lawgiver.',
    youtubeId: 'OxiAikEk2vU',
    isCustomGoogleVid: false,
  },
  {
    id: 'vid-apol-4',
    title: 'The Story of the Bible in 5 Minutes',
    category: 'Foundations',
    speakerOrSource: 'BibleProject',
    description: 'How the whole biblical narrative leads to Jesus and offers unconditional grace for all nations.',
    youtubeId: '7_CGP-12AE0',
    isCustomGoogleVid: false,
  },
  {
    id: 'vid-swiss-vids',
    title: 'Google Vids Multilingual Template (Starter Video)',
    category: 'Swiss-Migrant Series',
    speakerOrSource: 'Evangelism Hub (Custom Vids)',
    description: 'Your uploaded Google Vids unlisted presentation. Paste your own YouTube ID into the editor above to replace this card!',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder ready to be customized
    isCustomGoogleVid: true,
  },
];

const baseChurches: ChurchItem[] = [
  {
    name: 'International Protestant Church of Zurich (IPC)',
    city: 'Zurich',
    canton: 'ZH',
    languages: ['English', 'German'],
    address: 'Schanzengasse 25, 8001 Zürich',
    website: 'https://ipc-zurich.org',
    type: 'International & Reformed',
  },
  {
    name: 'Evangelical Baptist Church of Geneva (IBCG)',
    city: 'Geneva',
    canton: 'GE',
    languages: ['English', 'French'],
    address: 'Chemin de Rieu 18, 1208 Genève',
    website: 'https://ibcg.ch',
    type: 'Baptist & Multilingual',
  },
  {
    name: 'Crossroads International Church Basel',
    city: 'Basel',
    canton: 'BS',
    languages: ['English', 'German'],
    address: 'Gundeldingerstrasse 490, 4053 Basel',
    website: 'https://crossroadsbasel.ch',
    type: 'Evangelical & Free Church',
  },
  {
    name: 'International Church of Bern',
    city: 'Bern',
    canton: 'BE',
    languages: ['English', 'German'],
    address: 'Bollwerk 21, 3011 Bern',
    website: 'https://icbern.ch',
    type: 'Interdenominational',
  },
  {
    name: 'Chapelle de Léman (Lausanne)',
    city: 'Lausanne',
    canton: 'VD',
    languages: ['French', 'English', 'Spanish'],
    address: 'Avenue de Béthusy 56, 1012 Lausanne',
    website: 'https://chapelle-leman.ch',
    type: 'Protestant Evangelique',
  },
  {
    name: 'Chiesa Evangelica di Lugano',
    city: 'Lugano',
    canton: 'TI',
    languages: ['Italian', 'English'],
    address: 'Via Balestra 27, 6900 Lugano',
    website: 'https://evangelicalugano.ch',
    type: 'Evangelical Community',
  },
  {
    name: 'Filipino Christian Fellowship Switzerland',
    city: 'Zurich & Geneva',
    canton: 'ZH / GE',
    languages: ['Filipino / Tagalog', 'English'],
    address: 'Meeting locations in Zurich, Geneva & Bern',
    website: 'https://fcf-switzerland.org',
    type: 'Filipino Migrant Fellowship',
  },
  {
    name: 'Comunidade Evangélica de Língua Portuguesa (CELP)',
    city: 'Zurich & Lausanne',
    canton: 'ZH / VD',
    languages: ['Portuguese'],
    address: 'Zürich & Renens',
    website: 'https://celp-suisse.ch',
    type: 'Portuguese Community',
  },
];

const baseArticlesEN: ResourceArticle[] = [
  {
    id: 'art-1',
    title: 'The Gospel in 4 Simple Chapters: Creation, Fall, Redemption, Restoration',
    category: 'Foundations',
    readTime: '4 min read',
    summary: 'The overarching meta-narrative of human history and why Jesus is the bridge back to God.',
    content: [
      '1. Creation: God lovingly designed a world of beauty, order, and human dignity, created for fellowship with Him.',
      '2. Fall: Humanity chose autonomy and rebellion, fracturing our relationship with God and unleashing spiritual death, guilt, and brokenness into the world.',
      '3. Redemption: Unable to save ourselves by moral efforts or religious rituals, God sent Jesus Christ to live the sinless life we could not, and die in our place on the cross.',
      '4. Restoration: Through Christ’s bodily resurrection, everyone who places their trust in Him is forgiven, adopted as a child of God, and promised eternal renewal.',
    ],
    scriptureReferences: ['Genesis 1:27', 'Romans 3:23', 'John 3:16', 'Revelation 21:4'],
  },
  {
    id: 'art-2',
    title: 'Saved by Grace, Not by Works: The Radical Good News',
    category: 'Theology',
    readTime: '3 min read',
    summary: 'Every world religion tells humanity what they must DO; only the Gospel announces what has already been DONE.',
    content: [
      'Most worldviews present a ladder of works: meditate enough, obey enough laws, perform enough rituals to earn divine favor.',
      'Christianity stands alone in announcing that God descended the ladder to rescue those who were completely helpless.',
      'As Ephesians 2:8-9 states: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast."',
      'Good works are the fruit of salvation, never the root.',
    ],
    scriptureReferences: ['Ephesians 2:8-10', 'Romans 5:8', 'Galatians 2:16'],
  },
  {
    id: 'art-3',
    title: 'Swiss Migrant & Foreigner Faith Guide',
    category: 'Community',
    readTime: '5 min read',
    summary: 'Practical tips on finding fellowship, spiritual nourishment, and community as an expat or migrant in Switzerland.',
    content: [
      'Moving to Switzerland can feel intimidating: four national languages, diverse cantonal laws, and private social structures.',
      'Christian communities across Zurich, Geneva, Basel, Bern, and Ticino are among the most welcoming hubs for newcomers.',
      'Whether you speak German, French, Italian, Spanish, Portuguese, Albanian, Serbian, or Filipino, there is a thriving local or international church waiting to welcome you.',
      'Use our Church Directory below to connect with pastors and home groups near your train route or canton.',
    ],
    scriptureReferences: ['Leviticus 19:34', 'Hebrews 10:24-25', 'Colossians 3:11'],
  },
];

// Complete multilingual translation database for all 10 languages
export const APP_CONTENT: Record<string, LanguageContent> = {
  // 1. GERMAN
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇨🇭',
    welcome: 'Hallo. Wähle deine Sprache.',
    nav: {
      home: 'Startseite',
      gospelScripture: 'Das Evangelium',
      media: 'Medien & Videos',
      apologetics: 'Apologetik FAQ',
      resources: 'Ressourcen',
      churches: 'Gemeinden in der Schweiz',
      nextSteps: 'Nächste Schritte',
    },
    hero: {
      subtitle: 'Glaube, Wahrheit und zeitlose Hoffnung',
      description: 'Willkommen. Egal woher du kommst oder welche Sprache du sprichst: Entdecke die rettende Botschaft von Jesus Christus und fundierte Antworten auf die grossen Fragen des Lebens.',
      ctaGospel: 'Evangelium lesen',
      ctaApologetics: 'Wahrheits-Fragen erkunden',
    },
    gospelMessage: {
      title: 'Die Kernbotschaft des Evangeliums',
      subtitle: 'Aus der Bibel: 1. Korinther 15, Verse 3 bis 5',
      scene1Intro: 'Hallo und herzlich willkommen. Wir freuen uns, dass du hier bist, um gemeinsam über Glauben und Wahrheit nachzudenken. Egal woher du stammst oder welche Sprache du sprichst: Du bist hier von Herzen willkommen.',
      scene2Transition: 'Nehmen wir uns einen Moment Zeit, um die zentrale Botschaft des Evangeliums zu betrachten, wie sie in der Bibel in 1. Korinther Kapitel 15, Verse 3 bis 5 geschrieben steht.',
      scene3ScriptureHeading: '1. Korinther 15, 3–5',
      scene4Closing: 'Vielen Dank fürs Lesen und Anschauen. Entdecke gerne weitere Antworten und Ressourcen in dieser App.',
      scriptureReference: '1. Korinther 15,3-5',
      verses: [
        {
          reference: '1. Korinther 15,3',
          text: 'Denn vor allem habe ich euch weitergegeben, was auch ich empfangen habe: Dass Christus für unsere Sünden gestorben ist nach den Schriften;',
        },
        {
          reference: '1. Korinther 15,4',
          text: 'und dass er begraben wurde und dass er am dritten Tag auferstanden ist nach den Schriften;',
        },
        {
          reference: '1. Korinther 15,5',
          text: 'und dass er Kephas erschienen ist, danach den Zwölfen.',
        },
      ],
      corePillars: [
        {
          title: 'Christus starb für unsere Sünden',
          description: 'Jesus nahm die gerechte Strafe für unsere Schuld auf sich, damit wir Vergebung und Frieden mit Gott haben können.',
        },
        {
          title: 'Er wurde begraben',
          description: 'Sein Tod war ein historisches Ereignis, bezeugt von römischen Wachen und Augenzeugen.',
        },
        {
          title: 'Er ist am dritten Tag auferstanden',
          description: 'Der Sieg über den Tod bestätigt, dass Jesus der Sohn Gottes ist und uns ewiges Leben schenkt.',
        },
        {
          title: 'Er erschien den Zeugen',
          description: 'Er erschien Kephas (Petrus) und den Zwölfen – die Auferstehung ist durch historische Augenzeugen verbürgt.',
        },
      ],
      faithPrayerTitle: 'Ein Gebet des Glaubens',
      faithPrayerText: '„Herr Jesus, ich erkenne an, dass ich gesündigt habe und Gnade brauche. Ich glaube, dass du für meine Sünden am Kreuz gestorben und auferstanden bist. Bitte vergib mir und trete als mein Herr und Erlöser in mein Leben. Amen.“',
    },
    mediaSection: {
      title: 'Mediathek & Videos',
      subtitle: 'Entdecke das Evangelium, Beweise für die Auferstehung und christliche Philosophie im Videoformat.',
      filterAll: 'Alle Videos',
      customVideoPrompt: 'Eigenes Google Vids Video einbinden',
      pasteIdHint: 'Füge deine YouTube Video-ID ein (z.B. V9P4w024w4k):',
      addCustomBtn: 'Video aktualisieren',
    },
    apologeticsSection: {
      title: 'Apologetik: Wahrheit & Weltanschauungen',
      subtitle: 'Verstand und Glaube im Einklang: Antworten zu Atheismus, Islam, Hinduismus und Judentum aus Sicht renommierter christlicher Denker.',
      searchPlaceholder: 'Frage suchen (z.B. Auferstehung, Koran, Moral, Universum)...',
      categories: {
        all: 'Alle Themen',
        atheism: 'Atheismus & Wissenschaft',
        islam: 'Islam & Bibel',
        hinduism: 'Hinduismus & Karma',
        judaism: 'Judentum & Messias',
      },
    },
    resourceSection: {
      title: 'Glaubensressourcen & Leitfäden',
      subtitle: 'Tiefgehende Artikel und biblische Grundlagen für deinen Glaubensweg.',
    },
    churchSection: {
      title: 'Gemeinden in der Schweiz',
      subtitle: 'Finde eine lebendige Gemeinde oder Hauskreis in deinem Kanton und deiner Sprache.',
      searchPlaceholder: 'Nach Stadt oder Kanton suchen (z.B. Zürich, Bern, Genf)...',
      filterCanton: 'Kanton wählen',
    },
    nextStepsSection: {
      title: 'Deine nächsten Schritte',
      subtitle: 'Glaube ist ein lebendiger Weg. Hier erfährst du, wie es weitergeht.',
      step1Title: '1. Bete und nimm Jesus an',
      step1Desc: 'Sprich das Übergabegebet im Vertrauen auf Gottes Versprechen.',
      step2Title: '2. Lies das Johannesevangelium',
      step2Desc: 'Beginne mit dem vierten Buch des Neuen Testaments, um Jesus persönlich kennenzulernen.',
      step3Title: '3. Finde eine örtliche Gemeinde',
      step3Desc: 'Gemeinschaft mit anderen Gläubigen stärkt deinen Glauben und bietet Heimat.',
      step4Title: '4. Teile deine Hoffnung',
      step4Desc: 'Erzähle deinen Freunden und deiner Familie von der Liebe Gottes.',
    },
    videos: baseVideos,
    apologetics: baseApologeticsEN,
    resources: baseArticlesEN,
  },

  // 2. FRENCH
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇨🇭',
    welcome: 'Salut. Choisis ta langue.',
    nav: {
      home: 'Accueil',
      gospelScripture: "L'Évangile",
      media: 'Vidéos & Médias',
      apologetics: 'Questions de Vérité',
      resources: 'Ressources',
      churches: 'Églises en Suisse',
      nextSteps: 'Prochaines Étapes',
    },
    hero: {
      subtitle: 'Foi, raison et espérance éternelle',
      description: 'Bienvenue. D’où que vous veniez et quelle que soit votre langue : découvrez le message libérateur de Jésus-Christ et des réponses solides aux grandes questions de la vie.',
      ctaGospel: "Découvrir l'Évangile",
      ctaApologetics: 'Questions et Réponses',
    },
    gospelMessage: {
      title: "Le Message Central de l'Évangile",
      subtitle: 'Tiré de la Bible : 1 Corinthiens chapitre 15, versets 3 à 5',
      scene1Intro: 'Bonjour et bienvenue. Nous sommes très heureux que vous soyez ici pour explorer la foi et la vérité ensemble. Peu importe d’où vous venez ou la langue que vous parlez, vous êtes les bienvenus.',
      scene2Transition: 'Prenons un moment pour contempler le message fondamental de l’Évangile, consigné dans la Bible en 1 Corinthiens 15, versets 3 à 5.',
      scene3ScriptureHeading: '1 Corinthiens 15:3–5',
      scene4Closing: 'Merci de votre attention. N’hésitez pas à explorer les ressources et les réponses dans cette application.',
      scriptureReference: '1 Corinthiens 15:3-5',
      verses: [
        {
          reference: '1 Corinthiens 15:3',
          text: 'Je vous ai transmis avant tout ce que j’avais aussi reçu : que Christ est mort pour nos péchés, selon les Écritures ;',
        },
        {
          reference: '1 Corinthiens 15:4',
          text: 'qu’il a été enseveli, et qu’il est ressuscité le troisième jour, selon les Écritures ;',
        },
        {
          reference: '1 Corinthiens 15:5',
          text: 'et qu’il est apparu à Céphas, puis aux douze.',
        },
      ],
      corePillars: [
        {
          title: 'Christ est mort pour nos péchés',
          description: 'Jésus a payé le prix de notre culpabilité afin de rétablir notre relation avec Dieu.',
        },
        {
          title: 'Il a été enseveli',
          description: 'Sa mort est un fait historique réel, attesté par des témoins romains et juifs.',
        },
        {
          title: 'Il est ressuscité le 3ème jour',
          description: 'Sa résurrection corporelle triomphe de la mort et nous assure la vie éternelle.',
        },
        {
          title: 'Il est apparu aux témoins',
          description: 'Apparu à Céphas (Pierre) puis aux Douze, confirmant la réalité historique de sa résurrection.',
        },
      ],
      faithPrayerTitle: 'Prière de Foi et d’Acceptation',
      faithPrayerText: '« Seigneur Jésus, je reconnais que j’ai péché et que j’ai besoin de ta grâce. Je crois que tu es mort pour mes péchés et que tu es ressuscité. Pardonne-moi et entre dans ma vie comme mon Sauveur et Seigneur. Amen. »',
    },
    mediaSection: {
      title: 'Vidéothèque & Enseignements',
      subtitle: 'Vidéos explicatives sur la foi chrétienne, la philosophie et les preuves historiques.',
      filterAll: 'Toutes les vidéos',
      customVideoPrompt: 'Intégrer votre vidéo Google Vids',
      pasteIdHint: 'Entrez l’ID YouTube de votre vidéo :',
      addCustomBtn: 'Mettre à jour la vidéo',
    },
    apologeticsSection: {
      title: 'Apologétique Chrétienne',
      subtitle: 'Défendre la vérité avec respect et rigueur face à l’Athéisme, l’Islam, l’Hindouisme et le Judaïsme.',
      searchPlaceholder: 'Rechercher une question (ex: Résurrection, Coran, Morale)...',
      categories: {
        all: 'Tous les thèmes',
        atheism: 'Athéisme & Science',
        islam: 'Islam & Bible',
        hinduism: 'Hindouisme & Karma',
        judaism: 'Judaïsme & Messie',
      },
    },
    resourceSection: {
      title: 'Guides & Ressources Bibliques',
      subtitle: 'Des articles clairs pour affermir votre compréhension spirituelle.',
    },
    churchSection: {
      title: 'Trouver une Église en Suisse',
      subtitle: 'Églises évangéliques et communautés chrétiennes accueillantes en Suisse romande et alémanique.',
      searchPlaceholder: 'Rechercher par ville ou canton...',
      filterCanton: 'Filtrer par canton',
    },
    nextStepsSection: {
      title: 'Vos Prochaines Étapes',
      subtitle: 'Commencer votre marche vivante avec Jésus-Christ.',
      step1Title: '1. Priez et confiez votre vie à Jésus',
      step1Desc: 'Dieu entend chaque prière sincère du cœur.',
      step2Title: "2. Lisez l'Évangile selon Jean",
      step2Desc: 'Découvrez la vie et les paroles profondes de Jésus.',
      step3Title: '3. Rejoignez une église locale',
      step3Desc: 'Grandissez entouré d’une communauté chaleureuse.',
      step4Title: '4. Partagez votre espérance',
      step4Desc: 'Partagez cette bonne nouvelle avec vos proches.',
    },
    videos: baseVideos,
    apologetics: baseApologeticsEN,
    resources: baseArticlesEN,
  },

  // 3. ITALIAN
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇨🇭',
    welcome: 'Ciao. Scegli la tua lingua.',
    nav: {
      home: 'Home',
      gospelScripture: 'Il Vangelo',
      media: 'Video & Media',
      apologetics: 'Apologetica',
      resources: 'Risorse',
      churches: 'Chiese in Svizzera',
      nextSteps: 'Prossimi Passi',
    },
    hero: {
      subtitle: 'Fede, verità e speranza senza tempo',
      description: 'Benvenuto. Da qualunque luogo tu provenga e qualunque lingua tu parli: scopri il messaggio del Vangelo e risposte ponderate alle grandi domande.',
      ctaGospel: 'Leggi il Vangelo',
      ctaApologetics: 'Esplora le Risposte',
    },
    gospelMessage: {
      title: 'Il Messaggio Centrale del Vangelo',
      subtitle: 'Dalla Bibbia: 1 Corinzi capitolo 15, versetti da 3 a 5',
      scene1Intro: 'Ciao e benvenuto. Siamo felici che tu sia qui per esplorare insieme la fede e la verità. Da qualunque parte del mondo tu venga, sei il benvenuto.',
      scene2Transition: 'Prendiamoci un momento per considerare il messaggio centrale del Vangelo, scritto in 1 Corinzi 15, versetti 3-5.',
      scene3ScriptureHeading: '1 Corinzi 15:3–5',
      scene4Closing: 'Grazie per l’attenzione. Sentiti libero di esplorare altre risorse e risposte nell’app.',
      scriptureReference: '1 Corinzi 15:3-5',
      verses: [
        {
          reference: '1 Corinzi 15:3',
          text: 'Poiché vi ho prima di tutto trasmesso quello che anch’io ho ricevuto: che Cristo morì per i nostri peccati, secondo le Scritture;',
        },
        {
          reference: '1 Corinzi 15:4',
          text: 'che fu sepolto e che risuscitò il terzo giorno, secondo le Scritture;',
        },
        {
          reference: '1 Corinzi 15:5',
          text: 'e che apparve a Cefa e poi ai dodici.',
        },
      ],
      corePillars: [
        {
          title: 'Cristo è morto per i nostri peccati',
          description: 'Ha pagato il nostro debito offrendoci piena riconciliazione con Dio.',
        },
        {
          title: 'Fu sepolto',
          description: 'Un fatto storico verificabile, testimoniato da romani e giudei.',
        },
        {
          title: 'È risorto il terzo giorno',
          description: 'La vittoria sulla morte che apre le porte della vita eterna.',
        },
        {
          title: 'Apparve ai testimoni oculari',
          description: 'Apparve a Cefa e poi ai Dodici, confermando la realtà corporea della sua risurrezione.',
        },
      ],
      faithPrayerTitle: 'Preghiera di Fede',
      faithPrayerText: '«Signore Gesù, riconosco di essere un peccatore bisognoso della tua grazia. Credo che sei morto per i miei peccati e risorto. Ti ricevo oggi come mio Salvatore e Signore. Amen.»',
    },
    mediaSection: {
      title: 'Galleria Multimediale',
      subtitle: 'Video sul Vangelo, evidenze della risurrezione e riflessioni teologiche.',
      filterAll: 'Tutti i Video',
      customVideoPrompt: 'Collega il tuo video Google Vids',
      pasteIdHint: 'Inserisci l’ID YouTube del video:',
      addCustomBtn: 'Aggiorna Video',
    },
    apologeticsSection: {
      title: 'Apologetica Cristiana',
      subtitle: 'Risposte ragionate a dubbi su Ateismo, Islam, Induismo e Giudaismo.',
      searchPlaceholder: 'Cerca una domanda...',
      categories: {
        all: 'Tutte le tematiche',
        atheism: 'Ateismo & Scienza',
        islam: 'Islam & Bibbia',
        hinduism: 'Induismo & Karma',
        judaism: 'Giudaismo & Messia',
      },
    },
    resourceSection: {
      title: 'Guide e Risorse di Fede',
      subtitle: 'Articoli per approfondire la verità biblica.',
    },
    churchSection: {
      title: 'Chiese in Svizzera e Ticino',
      subtitle: 'Trova una comunità viva nel cantone Ticino o nel resto della Svizzera.',
      searchPlaceholder: 'Cerca città o cantone...',
      filterCanton: 'Filtra per cantone',
    },
    nextStepsSection: {
      title: 'I Tuoi Prossimi Passi',
      subtitle: 'Inizia il tuo cammino spirituale oggi stesso.',
      step1Title: '1. Prega con sincerità',
      step1Desc: 'Parla con Dio come a un Padre che ti ama.',
      step2Title: '2. Leggi il Vangelo di Giovanni',
      step2Desc: 'Scopri chi è veramente Gesù Cristo.',
      step3Title: '3. Frequenta una comunità cristiana',
      step3Desc: 'Cresci insieme ad altri fratelli nella fede.',
      step4Title: '4. Condividi il Vangelo',
      step4Desc: 'Testimonia della speranza che hai trovato.',
    },
    videos: baseVideos,
    apologetics: baseApologeticsEN,
    resources: baseArticlesEN,
  },

  // 4. ROMANSH
  rm: {
    code: 'rm',
    name: 'Romansh',
    nativeName: 'Rumantsch',
    flag: '🇨🇭',
    welcome: 'Chau. Tscherna tia lingua.',
    nav: {
      home: 'Chasa',
      gospelScripture: "L'Evangeli",
      media: 'Videos & Medias',
      apologetics: 'Veritad & Dumondas',
      resources: 'Resursas',
      churches: 'Baselgias en Svizra',
      nextSteps: 'Proxims Pass',
    },
    hero: {
      subtitle: 'Cretta, veritad e speranza eterna',
      description: 'Bainvegni. Nua che ti eras er adascus: Scuvra il messadi da Jesus Cristus e respostas cleran a las grondas dumondas da la vita.',
      ctaGospel: "Leger l'Evangeli",
      ctaApologetics: 'Dumondas da Veritad',
    },
    gospelMessage: {
      title: "Il Messadi Central da l'Evangeli",
      subtitle: 'Or da la Bibla: 1 Corints chapitel 15, versets 3 a 5',
      scene1Intro: 'Chau e bainvegni. Nus essan fitg leds che ti es qua per explorar la cretta e la veritad ensemen. Ti es bainvegni qua da tut cor.',
      scene2Transition: 'Prendain in mument per guardar il messadi central da l’Evangeli, scrit en 1 Corints 15:3–5.',
      scene3ScriptureHeading: '1 Corints 15:3–5',
      scene4Closing: 'Grazia per tia attenziun. Scuvra dapli resursas e respostas en questa app.',
      scriptureReference: '1 Corints 15:3-5',
      verses: [
        {
          reference: '1 Corints 15:3',
          text: 'Pertutga en emprima lingia hai jau surdà a vus quai che jau hai retschavì: che Cristus è mort per noss标记 sennas tenor las Scrittiras;',
        },
        {
          reference: '1 Corints 15:4',
          text: 'ch’el è vegnì sutterrà e ch’el è residià il terz di tenor las Scrittiras;',
        },
        {
          reference: '1 Corints 15:5',
          text: 'e ch’el è cumparì a Cefas e silsuenter als dudisch.',
        },
      ],
      corePillars: [
        {
          title: 'Cristus è mort per noss标记 sennas',
          description: 'Jesus ha surpiglià la culpa per pussibilitar la reconciliaziun cun Dieu.',
        },
        {
          title: 'El è vegnì sutterrà',
          description: 'In fatg istoric confermà da perditgas oculares.',
        },
        {
          title: 'El è residià il terz di',
          description: 'La victoria definitiva sur da la mort e l’empermischun da la vita eterna.',
        },
        {
          title: 'El è cumparì a las perditgas',
          description: 'El è cumparì a Cefas ed als dudisch sco perditga viva da sia resurdida.',
        },
      ],
      faithPrayerTitle: 'Uraschun da Cretta',
      faithPrayerText: '«Segner Jesus, jau renconusch che jau hai fatg putgads. Jau crai che ti es mort vi da la crusch per mai ed es residià. Perduna a mai e ta daventa Segner da mia vita. Amen.»',
    },
    mediaSection: {
      title: 'Galaria da Videos',
      subtitle: 'Videos davart l’Evangeli e la cretta cristiana.',
      filterAll: 'Tuts videos',
      customVideoPrompt: 'Integrar tes agen video da Google Vids',
      pasteIdHint: 'Endatescha il YouTube ID:',
      addCustomBtn: 'Actualisar video',
    },
    apologeticsSection: {
      title: 'Apologetica & Veritad',
      subtitle: 'Respostas profundas a dumondas davart la cretta e las religiuns dal mund.',
      searchPlaceholder: 'Tschertgar ina dumonda...',
      categories: {
        all: 'Tuts temas',
        atheism: 'Ateissem & Scienza',
        islam: 'Islam & Bibla',
        hinduism: 'Induissem & Karma',
        judaism: 'Gidaissem & Messias',
      },
    },
    resourceSection: {
      title: 'Artitgels & Resursas',
      subtitle: 'Texts per approfundar tia cretta e relaziun cun Dieu.',
    },
    churchSection: {
      title: 'Baselgias en Svizra',
      subtitle: 'Communitads cristianas en il Grischun ed en l’entira Svizra.',
      searchPlaceholder: 'Tschertgar per lieu u chantun...',
      filterCanton: 'Chantun',
    },
    nextStepsSection: {
      title: 'Tes Proxims Pass',
      subtitle: 'Cumenzar tes viadi cun Jesus oz.',
      step1Title: '1. Retschaiva Jesus en tes cor',
      step1Desc: 'Ura cun in cor sincer a Dieu.',
      step2Title: '2. Legia l’Evangeli tenor Gion',
      step2Desc: 'Emprenda ad enconuscher Jesus Cristus.',
      step3Title: '3. Chattscha ina communitad',
      step3Desc: 'Crescha ensemen cun auters cartents.',
      step4Title: '4. Cusseglia tes amis',
      step4Desc: 'Fa part da questa gronda speranza.',
    },
    videos: baseVideos,
    apologetics: baseApologeticsEN,
    resources: baseArticlesEN,
  },

  // 5. ENGLISH
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    welcome: 'Hi there. Choose your language.',
    nav: {
      home: 'Home',
      gospelScripture: 'The Gospel',
      media: 'Media & Videos',
      apologetics: 'Apologetics Q&A',
      resources: 'Resource Hub',
      churches: 'Churches in Switzerland',
      nextSteps: 'Next Steps',
    },
    hero: {
      subtitle: 'Faith, reason, and timeless hope',
      description: 'Welcome. No matter where you come from or what language you speak, discover the core message of Jesus Christ and thoughtful answers to life’s deepest questions.',
      ctaGospel: 'Read the Gospel',
      ctaApologetics: 'Explore Truth Answers',
    },
    gospelMessage: {
      title: 'The Core Message of the Gospel',
      subtitle: 'From the Bible: 1 Corinthians chapter 15, verses 3 through 5',
      scene1Intro: 'Hi there. Welcome. We are so glad you are here to explore faith and truth together. No matter where you are from or what language you speak, you are welcome here.',
      scene2Transition: 'Let’s take a moment to look at the core message of the Gospel, found in the Bible, in 1 Corinthians chapter 15, verses 3 through 5.',
      scene3ScriptureHeading: '1 Corinthians 15:3–5',
      scene4Closing: 'Thank you for watching and reading. Feel free to explore more resources and answers throughout the app.',
      scriptureReference: '1 Corinthians 15:3-5',
      verses: [
        {
          reference: '1 Corinthians 15:3',
          text: 'For what I received I passed on to you as of first importance: that Christ died for our sins according to the Scriptures,',
        },
        {
          reference: '1 Corinthians 15:4',
          text: 'that he was buried, that he was raised on the third day according to the Scriptures,',
        },
        {
          reference: '1 Corinthians 15:5',
          text: 'and that he appeared to Cephas, and then to the Twelve.',
        },
      ],
      corePillars: [
        {
          title: 'Christ Died for Our Sins',
          description: 'Jesus paid the full spiritual penalty for our wrongdoing so we could have peace and eternal reconciliation with God.',
        },
        {
          title: 'He Was Buried',
          description: 'His physical death was an indisputable historical event confirmed by Roman soldiers and public burial in a known tomb.',
        },
        {
          title: 'He Rose on the Third Day',
          description: 'The physical resurrection broke the power of death and validates Jesus as the Son of God.',
        },
        {
          title: 'He Appeared to Eyewitnesses',
          description: 'He appeared to Cephas (Peter) and then to the Twelve, providing overwhelming historical eyewitness confirmation of His victory over death.',
        },
      ],
      faithPrayerTitle: 'A Prayer of Faith & Acceptance',
      faithPrayerText: '“Lord Jesus, I acknowledge that I have sinned and need Your forgiveness. I believe You died on the cross for my sins and rose from the dead. I turn from my own ways and invite You into my life to be my Savior and Lord. Thank You for Your free gift of eternal life. Amen.”',
    },
    mediaSection: {
      title: 'Media Gallery & Videos',
      subtitle: 'Watch curated presentations on the Gospel, the historical evidence for the Resurrection, and cosmological arguments.',
      filterAll: 'All Videos',
      customVideoPrompt: 'Embed Your Google Vids YouTube Presentation',
      pasteIdHint: 'Paste your YouTube Video ID here (e.g. V9P4w024w4k):',
      addCustomBtn: 'Update Video Card',
    },
    apologeticsSection: {
      title: 'Apologetics Truth Accordion',
      subtitle: 'Clear, intellectually rigorous answers addressing Atheism, Islam, Hinduism, and Judaism from renowned Christian thinkers.',
      searchPlaceholder: 'Search apologetics questions (e.g. Resurrection, Quran, Morality, Big Bang)...',
      categories: {
        all: 'All Worldviews',
        atheism: 'Atheism & Science',
        islam: 'Islam & The Quran',
        hinduism: 'Hinduism & Karma',
        judaism: 'Judaism & Prophecy',
      },
    },
    resourceSection: {
      title: 'Resource Hub & Scripture Guides',
      subtitle: 'Thoughtfully written foundations to help you understand salvation and grow in faith.',
    },
    churchSection: {
      title: 'Find a Church in Switzerland',
      subtitle: 'Connecting locals, international residents, and migrants with Bible-believing fellowships across Swiss cantons.',
      searchPlaceholder: 'Filter by city or canton (e.g. Zurich, Geneva, Basel)...',
      filterCanton: 'Select Canton',
    },
    nextStepsSection: {
      title: 'Your Next Steps',
      subtitle: 'Beginning and cultivating a personal walk with God.',
      step1Title: '1. Pray and Accept Christ',
      step1Desc: 'Speak to God directly from your heart, receiving His free gift of grace.',
      step2Title: '2. Read the Gospel of John',
      step2Desc: 'Start with the fourth Gospel in the New Testament to witness who Jesus is.',
      step3Title: '3. Connect with a Local Church',
      step3Desc: 'Fellowship with other believers provides biblical teaching, prayer, and community.',
      step4Title: '4. Share Your Hope',
      step4Desc: 'Tell a friend or family member what God has begun in your life.',
    },
    videos: baseVideos,
    apologetics: baseApologeticsEN,
    resources: baseArticlesEN,
  },

  // 6. ALBANIAN
  sq: {
    code: 'sq',
    name: 'Albanian',
    nativeName: 'Shqip',
    flag: '🇦🇱',
    welcome: 'Çkemi. Zgjidh gjuhën tënde.',
    nav: {
      home: 'Kreu',
      gospelScripture: 'Ungjilli',
      media: 'Video & Media',
      apologetics: 'Përgjigje mbi të Vërtetën',
      resources: 'Burime Besimi',
      churches: 'Kishat në Zvicër',
      nextSteps: 'Hapat e Radhës',
    },
    hero: {
      subtitle: 'Besimi, arsyeja dhe shpresa e përjetshme',
      description: 'Mirë se vini. Pa marrë parasysh se nga vini apo çfarë gjuhe flisni: zbuloni mesazhin e Ungjillit të Jezu Krishtit dhe përgjigje të qarta për pyetjet e thella të jetës.',
      ctaGospel: 'Lexo Ungjillin',
      ctaApologetics: 'Eksploro të Vërtetën',
    },
    gospelMessage: {
      title: 'Mesazhi Kryesor i Ungjillit',
      subtitle: 'Nga Bibla: 1 Korintasve kapitulli 15, vargjet 3 deri në 5',
      scene1Intro: 'Përshëndetje dhe mirë se vini. Jemi shumë të lumtur që jeni këtu për të eksploruar besimin dhe të vërtetën së bashku. Pavarësisht nga vini, jeni të mirëpritur këtu.',
      scene2Transition: 'Le të ndalemi një çast për të parë mesazhin thelbësor të Ungjillit, siç gjendet në Bibël, te 1 Korintasve 15:3–5.',
      scene3ScriptureHeading: '1 Korintasve 15:3–5',
      scene4Closing: 'Faleminderit që ndoqët dhe lexuat. Mos hezitoni të eksploroni më tej në këtë aplikacion.',
      scriptureReference: '1 Korintasve 15:3-5',
      verses: [
        {
          reference: '1 Korintasve 15:3',
          text: 'Sepse së pari ju transmetova atë që edhe vetë e mora: që Krishti vdiq për mëkatet tona sipas Shkrimeve;',
        },
        {
          reference: '1 Korintasve 15:4',
          text: 'dhe se u varros, dhe se u ringjall të tretën ditë sipas Shkrimeve;',
        },
        {
          reference: '1 Korintasve 15:5',
          text: 'dhe se iu shfaq Kefës dhe pastaj të dymbëdhjetëve.',
        },
      ],
      corePillars: [
        {
          title: 'Krishti vdiq për mëkatet tona',
          description: 'Jezusi mori mbi vete dënimin tonë për të na pajtuar me Perëndinë.',
        },
        {
          title: 'Ai u varros',
          description: 'Një ngjarje reale historike e dëshmuar nga ushtarët romakë dhe dëshmitarët.',
        },
        {
          title: 'U ringjall ditën e tretë',
          description: 'Fitorja mbi vdekjen që vërteton se Jezusi është Biri i Perëndisë.',
        },
        {
          title: 'Iu shfaq dëshmitarëve',
          description: 'Iu shfaq Kefës (Pjetrit) dhe pastaj të dymbëdhjetëve si dëshmi e gjallë historike.',
        },
      ],
      faithPrayerTitle: 'Lutje Besimi dhe Pranimi',
      faithPrayerText: '«Zot Jezus, e pranoj se kam mëkatuar dhe kam nevojë për hirin Tënd. Besoj se ke vdekur në kryq për mëkatet e mia dhe je ringjallur. Të lutem më fal dhe eja në jetën time si Zot dhe Shpëtimtar. Amen.»',
    },
    mediaSection: {
      title: 'Galeria e Videove',
      subtitle: 'Video rreth Ungjillit dhe provave historike të ringjalljes.',
      filterAll: 'Të gjitha videot',
      customVideoPrompt: 'Vendos videon tënde të Google Vids',
      pasteIdHint: 'Shkruaj YouTube ID-në e videos tënde:',
      addCustomBtn: 'Përditëso Videon',
    },
    apologeticsSection: {
      title: 'Përgjigje mbi të Vërtetën (Apologjetikë)',
      subtitle: 'Përgjigje të argumentuara mbi Ateizmin, Islamin, Hinduizmin dhe Judaizmin.',
      searchPlaceholder: 'Kërko një pyetje...',
      categories: {
        all: 'Të gjitha temat',
        atheism: 'Ateizmi & Shkenca',
        islam: 'Islami & Bibla',
        hinduism: 'Hinduizmi & Karma',
        judaism: 'Judaizmi & Mesia',
      },
    },
    resourceSection: {
      title: 'Artikuj dhe Udhëzues Besimi',
      subtitle: 'Themelat e jetës së krishterë dhe rritjes shpirtërore.',
    },
    churchSection: {
      title: 'Kishat në Zvicër',
      subtitle: 'Gjej një bashkësi besimtarësh në qytetin dhe kantonin tënd.',
      searchPlaceholder: 'Kërko sipas qytetit ose kantonit...',
      filterCanton: 'Filtro sipas kantonit',
    },
    nextStepsSection: {
      title: 'Hapat e Tu të Radhës',
      subtitle: 'Nisja e ecjes tënde personale me Perëndinë.',
      step1Title: '1. Lutu dhe beso në Krishtin',
      step1Desc: 'Fol me Perëndinë me zemër të sinqertë.',
      step2Title: '2. Lexo Ungjillin sipas Gjonit',
      step2Desc: 'Zbulo jetën dhe mësimet e Jezusit.',
      step3Title: '3. Bashkohu me një kishë lokale',
      step3Desc: 'Bashkësia të forcon dhe të jep mbështetje.',
      step4Title: '4. Ndaj dëshminë tënde',
      step4Desc: 'Tregoju të tjerëve dashurinë e Zotit.',
    },
    videos: baseVideos,
    apologetics: baseApologeticsEN,
    resources: baseArticlesEN,
  },

  // 7. PORTUGUESE
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    welcome: 'Olá. Escolha o seu idioma.',
    nav: {
      home: 'Início',
      gospelScripture: 'O Evangelho',
      media: 'Vídeos & Mídia',
      apologetics: 'Apologética',
      resources: 'Recursos',
      churches: 'Igrejas na Suíça',
      nextSteps: 'Próximos Passos',
    },
    hero: {
      subtitle: 'Fé, razão e esperança eterna',
      description: 'Bem-vindo. Não importa de onde você veio ou qual idioma você fala: descubra a mensagem de Jesus Cristo e respostas seguras para a sua vida.',
      ctaGospel: 'Ler o Evangelho',
      ctaApologetics: 'Ver Respostas',
    },
    gospelMessage: {
      title: 'A Mensagem Central do Evangelho',
      subtitle: 'Da Bíblia: 1 Coríntios capítulo 15, versículos 3 a 5',
      scene1Intro: 'Olá e seja muito bem-vindo. Estamos felizes por você estar aqui para explorar a fé e a verdade conosco. De onde quer que você seja, você é bem-vindo.',
      scene2Transition: 'Vamos dedicar um momento para contemplar a mensagem central do Evangelho em 1 Coríntios 15:3–5.',
      scene3ScriptureHeading: '1 Coríntios 15:3–5',
      scene4Closing: 'Obrigado por assistir e ler. Fique à vontade para explorar mais recursos e respostas no aplicativo.',
      scriptureReference: '1 Coríntios 15:3-5',
      verses: [
        {
          reference: '1 Coríntios 15:3',
          text: 'Pois o que transmiti a vocês foi o que primeiro recebi: que Cristo morreu pelos nossos pecados, segundo as Escrituras;',
        },
        {
          reference: '1 Coríntios 15:4',
          text: 'que foi sepultado e que ressuscitou no terceiro dia, segundo as Escrituras;',
        },
        {
          reference: '1 Coríntios 15:5',
          text: 'e que apareceu a Cefas e depois aos Doze.',
        },
      ],
      corePillars: [
        {
          title: 'Cristo morreu pelos nossos pecados',
          description: 'Jesus assumiu o castigo da nossa culpa para nos reconciliar com Deus.',
        },
        {
          title: 'Foi sepultado',
          description: 'Fato histórico comprovado por testemunhas e autoridades romanas.',
        },
        {
          title: 'Ressuscitou ao terceiro dia',
          description: 'A vitória sobre a morte que garante a vida eterna aos que creem.',
        },
        {
          title: 'Apareceu às testemunhas',
          description: 'Apareceu a Cefas (Pedro) e depois aos Doze, comprovando historicamente a ressurreição.',
        },
      ],
      faithPrayerTitle: 'Oração de Fé e Entrega',
      faithPrayerText: '«Senhor Jesus, reconheço que sou pecador e preciso da Tua graça. Creio que morreste na cruz pelos meus pecados e ressuscitaste. Perdoa-me e entra no meu coração como meu Senhor e Salvador. Amém.»',
    },
    mediaSection: {
      title: 'Galeria de Vídeos',
      subtitle: 'Vídeos elucidativos sobre a fé cristã e evidências da ressurreição.',
      filterAll: 'Todos os vídeos',
      customVideoPrompt: 'Conectar o seu vídeo do Google Vids',
      pasteIdHint: 'Cole o ID do YouTube:',
      addCustomBtn: 'Atualizar Vídeo',
    },
    apologeticsSection: {
      title: 'Apologética Cristã',
      subtitle: 'Respostas fundamentadas diante do Ateísmo, Islamismo, Hinduísmo e Judaísmo.',
      searchPlaceholder: 'Pesquisar pergunta...',
      categories: {
        all: 'Todos os temas',
        atheism: 'Ateísmo & Ciência',
        islam: 'Islamismo & Bíblia',
        hinduism: 'Hinduísmo & Carma',
        judaism: 'Judaísmo & Messias',
      },
    },
    resourceSection: {
      title: 'Recursos & Guias Bíblicos',
      subtitle: 'Artigos para aprofundar seu conhecimento na Palavra de Deus.',
    },
    churchSection: {
      title: 'Igrejas na Suíça',
      subtitle: 'Encontre comunidades de língua portuguesa e internacionais na Suíça.',
      searchPlaceholder: 'Buscar por cidade ou cantão...',
      filterCanton: 'Cantão',
    },
    nextStepsSection: {
      title: 'Seus Próximos Passos',
      subtitle: 'Inicie sua caminhada de fé com Jesus hoje mesmo.',
      step1Title: '1. Ore e receba a Cristo',
      step1Desc: 'Fale com Deus com sinceridade de coração.',
      step2Title: '2. Leia o Evangelho de João',
      step2Desc: 'Conheça o ministério e as promessas de Jesus.',
      step3Title: '3. Una-se a uma igreja local',
      step3Desc: 'Cresça junto de irmãos e irmãs na fé.',
      step4Title: '4. Compartilhe o Evangelho',
      step4Desc: 'Leve esta boa notícia a seus amigos e familiares.',
    },
    videos: baseVideos,
    apologetics: baseApologeticsEN,
    resources: baseArticlesEN,
  },

  // 8. SPANISH
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    welcome: 'Hola. Elige tu idioma.',
    nav: {
      home: 'Inicio',
      gospelScripture: 'El Evangelio',
      media: 'Videos & Medios',
      apologetics: 'Apologética',
      resources: 'Recursos',
      churches: 'Iglesias en Suiza',
      nextSteps: 'Próximos Pasos',
    },
    hero: {
      subtitle: 'Fe, razón y esperanza eterna',
      description: 'Bienvenido. No importa de dónde vengas ni qué idioma hables: descubre el mensaje liberador de Jesucristo y respuestas fundamentadas a las grandes preguntas.',
      ctaGospel: 'Leer el Evangelio',
      ctaApologetics: 'Preguntas de Verdad',
    },
    gospelMessage: {
      title: 'El Mensaje Central del Evangelio',
      subtitle: 'De la Biblia: 1 Corintios capítulo 15, versículos 3 al 5',
      scene1Intro: 'Hola y bienvenido. Estamos muy contentos de que estés aquí para explorar la fe y la verdad juntos. No importa de dónde seas, eres bienvenido.',
      scene2Transition: 'Tomemos un momento para contemplar el mensaje medular del Evangelio en 1 Corintios 15:3–5.',
      scene3ScriptureHeading: '1 Corintios 15:3–5',
      scene4Closing: 'Gracias por mirar y leer. Siéntete libre de explorar más recursos y respuestas en esta aplicación.',
      scriptureReference: '1 Corintios 15:3-5',
      verses: [
        {
          reference: '1 Corintios 15:3',
          text: 'Porque ante todo les transmití a ustedes lo que yo mismo recibí: que Cristo murió por nuestros pecados según las Escrituras;',
        },
        {
          reference: '1 Corintios 15:4',
          text: 'que fue sepultado y que resucitó al tercer día según las Escrituras;',
        },
        {
          reference: '1 Corintios 15:5',
          text: 'y que apareció a Cefas, y después a los doce.',
        },
      ],
      corePillars: [
        {
          title: 'Cristo murió por nuestros pecados',
          description: 'Jesús pagó la deuda de nuestra falta para reconciliarnos con Dios.',
        },
        {
          title: 'Fue sepultado',
          description: 'Un hecho histórico concreto registrado por testigos y fuentes históricas.',
        },
        {
          title: 'Resucitó al tercer día',
          description: 'La victoria sobre la muerte que valida a Jesús como el Hijo de Dios.',
        },
        {
          title: 'Apareció a los testigos',
          description: 'Se apareció a Cefas (Pedro) y después a los doce discípulos, confirmando su victoria sobre la muerte.',
        },
      ],
      faithPrayerTitle: 'Oración de Fe y Aceptación',
      faithPrayerText: '«Señor Jesús, reconozco que he pecado y que necesito de Tu gracia. Creo que moriste en la cruz por mis pecados y resucitaste. Perdóname y entra en mi vida como mi Señor y Salvador. Amén.»',
    },
    mediaSection: {
      title: 'Galería de Videos',
      subtitle: 'Contenido multimedia sobre el Evangelio, la ciencia y la historia de Jesús.',
      filterAll: 'Todos los videos',
      customVideoPrompt: 'Conectar video propio de Google Vids',
      pasteIdHint: 'Ingresa el ID de YouTube:',
      addCustomBtn: 'Actualizar Video',
    },
    apologeticsSection: {
      title: 'Apologética Cristiana',
      subtitle: 'Respuestas rigurosas frente al Ateísmo, el Islam, el Hinduismo y el Judaísmo.',
      searchPlaceholder: 'Buscar una pregunta...',
      categories: {
        all: 'Todos los temas',
        atheism: 'Ateísmo & Ciencia',
        islam: 'Islam & Biblia',
        hinduism: 'Hinduismo & Karma',
        judaism: 'Judaísmo & Mesías',
      },
    },
    resourceSection: {
      title: 'Recursos y Guías de Fe',
      subtitle: 'Artículos para cimentar tu vida espiritual en Cristo.',
    },
    churchSection: {
      title: 'Iglesias en Suiza',
      subtitle: 'Comunidades hispanas e internacionales en los cantones suizos.',
      searchPlaceholder: 'Buscar por ciudad o cantón...',
      filterCanton: 'Cantón',
    },
    nextStepsSection: {
      title: 'Tus Próximos Pasos',
      subtitle: 'Cómo empezar y crecer en tu relación con Dios.',
      step1Title: '1. Ora y recibe a Cristo',
      step1Desc: 'Habla con Dios con sinceridad desde el corazón.',
      step2Title: '2. Lee el Evangelio de Juan',
      step2Desc: 'Descubre quién es Jesús y Sus promesas de vida.',
      step3Title: '3. Únete a una comunidad local',
      step3Desc: 'El compañerismo fortalece tu fe y te acompaña.',
      step4Title: '4. Comparte las Buenas Nuevas',
      step4Desc: 'Anuncia a otros el amor transformador de Dios.',
    },
    videos: baseVideos,
    apologetics: baseApologeticsEN,
    resources: baseArticlesEN,
  },

  // 9. SERBIAN / CROATIAN
  sr: {
    code: 'sr',
    name: 'Serbian / Croatian',
    nativeName: 'Srpski / Hrvatski',
    flag: '🇷🇸',
    welcome: 'Zdravo. Izaberi svoj jezik.',
    nav: {
      home: 'Početna',
      gospelScripture: 'Jevanđelje',
      media: 'Video & Mediji',
      apologetics: 'Pitanja Istine',
      resources: 'Resursi',
      churches: 'Zajednice u Švajcarskoj',
      nextSteps: 'Sledeći Koraci',
    },
    hero: {
      subtitle: 'Vera, razum i večna nada',
      description: 'Dobrodošli. Bez obzira odakle dolazite i kojim jezikom govorite: otkrijte poruku Isusa Hrista i promišljene odgovore na životna pitanja.',
      ctaGospel: 'Pročitaj Jevanđelje',
      ctaApologetics: 'Istraži Istinu',
    },
    gospelMessage: {
      title: 'Srž Jevanđelja',
      subtitle: 'Iz Biblije: 1. Korinćanima 15, stihovi 3 do 5',
      scene1Intro: 'Pozdrav i dobrodošli. Veoma nam je drago što ste ovde da zajedno istražujemo veru i istinu. Bez obzira odakle dolazite, dobrodošli ste.',
      scene2Transition: 'Hajde da na trenutak pogledamo osnovnu poruku Jevanđelja, zapisanu u 1. Korinćanima 15:3–5.',
      scene3ScriptureHeading: '1. Korinćanima 15:3–5',
      scene4Closing: 'Hvala vam na gledanju i čitanju. Slobodno istražite dodatne resurse i odgovore u aplikaciji.',
      scriptureReference: '1. Korinćanima 15:3-5',
      verses: [
        {
          reference: '1. Korinćanima 15:3',
          text: 'Jer vam najpre predadoh što i primih: da Hristos umre za grehe naše po Pismu;',
        },
        {
          reference: '1. Korinćanima 15:4',
          text: 'i da bi pogreben, i da vaskrse treći dan po Pismu;',
        },
        {
          reference: '1. Korinćanima 15:5',
          text: 'i da se javio Kifi, zatim Dvanaestorici.',
        },
      ],
      corePillars: [
        {
          title: 'Hristos je umro za naše grehe',
          description: 'Isus je platio cenu naše krivice da bismo imali mir sa Bogom.',
        },
        {
          title: 'Bio je pogreben',
          description: 'Istorijska činjenica potvrđena od strane rimskih stražara i svedoka.',
        },
        {
          title: 'Vaskrsao je trećeg dana',
          description: 'Pobeda nad smrću koja dokazuje da je Isus Sin Božiji.',
        },
        {
          title: 'Javio se očevicima',
          description: 'Javio se Kifi (Petru) i zatim Dvanaestorici učenika kao živi svedok pobede nad smrću.',
        },
      ],
      faithPrayerTitle: 'Molitva Vere i Predanja',
      faithPrayerText: '„Gospode Isuse, priznajem da sam grešio i da mi je potrebna Tvoja milost. Verujem da si umro na krstu za moje grehe i vaskrsao. Oprosti mi i uđi u moj život kao moj Spasitelj i Gospod. Amin.“',
    },
    mediaSection: {
      title: 'Video Galerija',
      subtitle: 'Video materijali o Jevanđelju i istorijskim dokazima vaskrsenja.',
      filterAll: 'Svi video snimci',
      customVideoPrompt: 'Povežite svoj Google Vids video',
      pasteIdHint: 'Unesite YouTube ID:',
      addCustomBtn: 'Ažuriraj Video',
    },
    apologeticsSection: {
      title: 'Hrišćanska Apologetika',
      subtitle: 'Jasni odgovori na ateizam, islam, hinduizam i judaizam.',
      searchPlaceholder: 'Pretraži pitanje...',
      categories: {
        all: 'Sve teme',
        atheism: 'Ateizam & Nauka',
        islam: 'Islam & Biblija',
        hinduism: 'Hinduizam & Karma',
        judaism: 'Judaizam & Mesija',
      },
    },
    resourceSection: {
      title: 'Duhovni Resursi',
      subtitle: 'Članci za jačanje vere i duhovni rast.',
    },
    churchSection: {
      title: 'Hrišćanske Zajednice u Švajcarskoj',
      subtitle: 'Pronađite zajednicu vernika u Cirihu, Bernu, Bazelu ili Ženevi.',
      searchPlaceholder: 'Pretraga po gradu ili kantonu...',
      filterCanton: 'Kanton',
    },
    nextStepsSection: {
      title: 'Vaši Sledeći Koraci',
      subtitle: 'Započnite hod sa Isusom Hristom.',
      step1Title: '1. Pomolite se i prihvatite Hrista',
      step1Desc: 'Obratite se Bogu iskrenim srcem.',
      step2Title: '2. Čitajte Jevanđelje po Jovanu',
      step2Desc: 'Upoznajte Isusov život i učenja.',
      step3Title: '3. Povežite se sa lokalnom crkvom',
      step3Desc: 'Zajedništvo hrani i podržava vašu veru.',
      step4Title: '4. Podelite nadu sa drugima',
      step4Desc: 'Svedočite o Božijoj ljubevi.',
    },
    videos: baseVideos,
    apologetics: baseApologeticsEN,
    resources: baseArticlesEN,
  },

  // 10. FILIPINO / TAGALOG
  fil: {
    code: 'fil',
    name: 'Filipino',
    nativeName: 'Filipino',
    flag: '🇵🇭',
    welcome: 'Kumusta. Piliin ang iyong wika.',
    nav: {
      home: 'Tahanan',
      gospelScripture: 'Ang Ebanghelyo',
      media: 'Mga Video & Media',
      apologetics: 'Katotohanan & Apologetika',
      resources: 'Mga Gabay sa Pananampalataya',
      churches: 'Mga Simbahan sa Switzerland',
      nextSteps: 'Susunod na Hakbang',
    },
    hero: {
      subtitle: 'Pananampalataya, katotohanan at walang-hanggang pag-asa',
      description: 'Maligayang pagdating. Saan ka man nanggaling o anuman ang iyong wika: tuklasin ang nagliligtas na mensahe ni Jesu-Cristo at matatag na mga sagot sa mahahalagang katanungan ng buhay.',
      ctaGospel: 'Basahin ang Ebanghelyo',
      ctaApologetics: 'Tingnan ang mga Sagot',
    },
    gospelMessage: {
      title: 'Ang Pangunahing Mensahe ng Ebanghelyo',
      subtitle: 'Mula sa Bibliya: 1 Corinto kabanata 15, mga talata 3 hanggang 5',
      scene1Intro: 'Kumusta at maligayang pagdating. Lubos kaming nagagalak na nandito ka upang sama-sama nating tuklasin ang pananampalataya at katotohanan. Saan ka man nagmula, malugod kang tinatanggap dito.',
      scene2Transition: 'Maglaan tayo ng sandali upang tunghayan ang pangunahing mensahe ng Ebanghelyo, na matatagpuan sa Bibliya sa 1 Corinto kabanata 15, mga talata 3 hanggang 5.',
      scene3ScriptureHeading: '1 Corinto 15:3–5',
      scene4Closing: 'Salamat sa panonood at pagbabasa. Huwag mag-atubiling galugarin ang iba pang mga gabay at kasagutan sa app na ito.',
      scriptureReference: '1 Corinto 15:3-5',
      verses: [
        {
          reference: '1 Corinto 15:3',
          text: 'Sapagkat ibinigay ko sa inyo bilang pinakamahalaga ang akin ding tinanggap: na si Cristo ay namatay para sa ating mga kasalanan, ayon sa Kasulatan;',
        },
        {
          reference: '1 Corinto 15:4',
          text: 'na Siya ay inilibing, at muling nabuhay sa ikatlong araw ayon sa Kasulatan;',
        },
        {
          reference: '1 Corinto 15:5',
          text: 'at Siya ay nagpakita kay Cefas, at pagkatapos ay sa Labindalawa.',
        },
      ],
      corePillars: [
        {
          title: 'Si Cristo ay namatay para sa ating mga kasalanan',
          description: 'Binayaran ni Jesus ang ating kaparusahan upang magkaroon tayo ng kapayapaan at pakikipagkasundo sa Diyos.',
        },
        {
          title: 'Siya ay inilibing',
          description: 'Isang tunay na makasaysayang pangyayari na sinaksihan ng mga kawal na Romano at mga alagad.',
        },
        {
          title: 'Muling nabuhay sa ikatlong araw',
          description: 'Ang tagumpay laban sa kamatayan na nagpapatunay na si Jesus ang Anak ng Diyos.',
        },
        {
          title: 'Nagpakita sa mga saksi',
          description: 'Nagpakita Siya kay Cefas (Pedro) at sa Labindalawa, nagpapatunay sa Kanyang muling pagkabuhay.',
        },
      ],
      faithPrayerTitle: 'Panalangin ng Pagtanggap at Pananampalataya',
      faithPrayerText: '“Panginoong Jesus, inaamin ko po na ako ay nagkasala at nangangailangan ng Iyong biyaya. Naniniwala ako na Ikaw ay namatay sa krus para sa aking mga kasalanan at muling nabuhay. Patawarin Mo po ako at pumasok Ka sa aking buhay bilang aking Tagapagligtas at Panginoon. Amen.”',
    },
    mediaSection: {
      title: 'Galerya ng mga Video',
      subtitle: 'Manood ng mga pagpapaliwanag tungkol sa Ebanghelyo, katibayan ng muling pagkabuhay, at pananampalataya.',
      filterAll: 'Lahat ng Video',
      customVideoPrompt: 'I-embed ang iyong sariling Google Vids YouTube video',
      pasteIdHint: 'I-paste ang iyong YouTube Video ID:',
      addCustomBtn: 'I-update ang Video',
    },
    apologeticsSection: {
      title: 'Katotohanan & Apologetika',
      subtitle: 'Matalinong pagtatanggol sa pananampalataya laban sa Ateismo, Islam, Hinduismo, at Judaismo mula sa mga kilalang pantas.',
      searchPlaceholder: 'Maghanap ng tanong (hal. Muling Pagkabuhay, Quran, Moralidad)...',
      categories: {
        all: 'Lahat ng Paksa',
        atheism: 'Ateismo & Agham',
        islam: 'Islam & Bibliya',
        hinduism: 'Hinduismo & Karma',
        judaism: 'Judaismo & Mesiyas',
      },
    },
    resourceSection: {
      title: 'Mga Gabay sa Pananampalataya',
      subtitle: 'Mga artikulo upang palalimin ang iyong pagkaunawa sa salita ng Diyos.',
    },
    churchSection: {
      title: 'Mga Simbahan sa Switzerland',
      subtitle: 'Makahanap ng masiglang pamayanang Kristiyano (Filipino at International) sa Switzerland.',
      searchPlaceholder: 'Maghanap ayon sa lungsod o canton (hal. Zurich, Geneva)...',
      filterCanton: 'Pumili ng Canton',
    },
    nextStepsSection: {
      title: 'Ang Iyong mga Susunod na Hakbang',
      subtitle: 'Pagsisimula ng personal na ugnayan sa Diyos.',
      step1Title: '1. Manalangin at tanggapin si Cristo',
      step1Desc: 'Makiusap sa Diyos nang buong puso at tanggapin ang Kanyang biyaya.',
      step2Title: '2. Basahin ang Ebanghelyo ni Juan',
      step2Desc: 'Tuklasin ang buhay, pag-ibig, at mga aral ni Jesus.',
      step3Title: '3. Sumali sa isang lokal na fellowship',
      step3Desc: 'Ang samahan ng mga mananampalataya ay nagbibigay ng lakas at patnubay.',
      step4Title: '4. Ibahagi ang Mabuting Balita',
      step4Desc: 'Ikwento sa pamilya at mga kaibigan ang pag-asa na iyong natagpuan.',
    },
    videos: baseVideos,
    apologetics: baseApologeticsEN,
    resources: baseArticlesEN,
  },
};

export const SWISS_CHURCHES = baseChurches;
