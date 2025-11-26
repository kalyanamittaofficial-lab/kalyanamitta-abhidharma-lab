
import { AbhidharmaEntity, EntityType, LabModule, QuizItem, VithiStage, CittaChallenge, CetasikaGroup, KammaScenario, KammaSituation, Language } from './types';

// --- UI TRANSLATIONS ---
export const UI_TEXT = {
  si: {
    appTitle: "අභිධර්ම විද්‍යාගාරය",
    subTitle: "ඩිජිටල් විද්‍යාගාරය",
    sidebarTitle: "පාඩම් මාලාව",
    footerText: "ශුද්ධ ථේරවාද සම්ප්‍රදාය",
    tutor: "උපදේශක",
    back: "ආපසු",
    visual: "දර්ශනය",
    analysis: "විග්‍රහය",
    touch: "ස්පර්ශ කර බලන්න",
    act: "ක්‍රියාත්මක කරන්න",
    reset: "නැවත අරඹන්න",
    next: "ඊළඟ",
    score: "ලකුණු",
    question: "ප්‍රශ්නය",
    correct: "නිවැරදියි!",
    incorrect: "වැරදියි.",
    concept: "සම්මුති (Concept)",
    reality: "පරමාර්ථ (Reality)",
    analyze: "විශ්ලේෂණය",
    analyzePlaceholder: "උදා: රස කෑමක් දුටු විට...",
    analyzing: "සිතමින්...",
    kammaTitle: "කර්ම විද්‍යාගාරය",
    scenario: "සිද්ධිය",
    prediction: "ඔබේ ප්‍රතිචාරය",
    controls: "පාලක",
    generating: "කර්මය සකස් වෙමින් පවතී...",
    buildMode: "නිදහස්",
    challengeMode: "අභියෝග",
    check: "පරීක්ෂා කරන්න",
    help: "උදව්ව",
    success: "අභියෝගය ජයගත්තා!",
    wrongConfig: "වැරදි සංයුතියකි",
    mindMoments: "චිත්ත වීථිය",
    play: "ක්‍රියාත්මක කරන්න",
    pause: "නවත්වන්න",
    tutorWelcome: "නමෝ තස්ස භගවතෝ අරහතෝ සම්මා සම්බුද්ධස්ස! \n\nආයුබෝවන්, මම ඔබේ අභිධර්ම සහායකයා වෙමි. ඔබට අභිධර්මය ගැන ඕනෑම ගැටලුවක් මගෙන් විමසන්න.",
    tutorPlaceholder: "ඔබේ ගැටලුව මෙතන සටහන් කරන්න...",
    thinking: "සිතමින් පවතී...",
    quickQ1: "සිත vs චෛතසික",
    quickQ2: "පරමාර්ථ 4",
    quickQ3: "සිත් විශ්ලේෂණය"
  },
  en: {
    appTitle: "Abhidharma Lab",
    subTitle: "Digital Laboratory",
    sidebarTitle: "Curriculum",
    footerText: "Pure Theravada Tradition",
    tutor: "AI Tutor",
    back: "Back",
    visual: "Visual",
    analysis: "Analysis",
    touch: "Touch & Feel",
    act: "Execute Action",
    reset: "Restart",
    next: "Next",
    score: "Score",
    question: "Question",
    correct: "Correct!",
    incorrect: "Incorrect.",
    concept: "Concept (Pannatti)",
    reality: "Reality (Paramattha)",
    analyze: "Analyze",
    analyzePlaceholder: "Ex: When I see delicious food...",
    analyzing: "Analyzing...",
    kammaTitle: "Kamma Laboratory",
    scenario: "Scenario",
    prediction: "Your Reaction",
    controls: "Controls",
    generating: "Generating Kamma...",
    buildMode: "Free Build",
    challengeMode: "Challenge",
    check: "Check",
    help: "Hint",
    success: "Challenge Complete!",
    wrongConfig: "Invalid Configuration",
    mindMoments: "Citta Vithi",
    play: "Play",
    pause: "Pause",
    tutorWelcome: "Namo Tassa Bhagavato Arahato Samma Sambuddhassa! \n\nGreetings, I am your Abhidharma Assistant. Ask me anything about Buddhist Psychology.",
    tutorPlaceholder: "Type your question here...",
    thinking: "Thinking...",
    quickQ1: "Citta vs Cetasika",
    quickQ2: "4 Realities",
    quickQ3: "Analyze Mind"
  }
};

// --- DATA GETTERS ---

export const getLabModules = (lang: Language): LabModule[] => [
  {
    id: 'intro',
    title: lang === 'si' ? 'පරමාර්ථ සත්‍යය' : 'Ultimate Reality',
    description: lang === 'si' ? 'ආධුනිකයින්ට: සම්මුති සත්‍යය (පඤ්ඤප්ති) සහ පරමාර්ථ සත්‍යය හඳුනාගැනීම.' : 'For Beginners: Distinguish between Conceptual Truth (Pannatti) and Ultimate Truth (Paramattha).',
    entities: []
  },
  {
    id: 'citta',
    title: lang === 'si' ? 'සිත් විද්‍යාගාරය' : 'Citta Lab (Mind)',
    description: lang === 'si' ? 'මධ්‍යම මට්ටම: විවිධ සිත් සකස් වන ආකාරය (Root, Feeling) ගොඩනගන්න.' : 'Intermediate: Construct different states of consciousness using Roots and Feelings.',
    entities: []
  },
  {
    id: 'cetasika',
    title: lang === 'si' ? 'චෛතසික 52' : '52 Mental Factors',
    description: lang === 'si' ? 'සිතක් වර්ණවත් කරන මානසික ගතිගුණ 52 අන්තර්ක්‍රියාකාරීව ඉගෙන ගන්න.' : 'Learn the 52 Mental Factors that color the mind interactively.',
    entities: []
  },
  {
    id: 'rupa',
    title: lang === 'si' ? 'රූප විද්‍යාගාරය' : 'Rupa Lab (Matter)',
    description: lang === 'si' ? 'මහා භූත රූප 4 (පඨවි, ආපෝ, තේජෝ, වායෝ) සමතුලිතතාවය පරීක්ෂා කරන්න.' : 'Experiment with the balance of the 4 Great Elements (Earth, Water, Fire, Air).',
    entities: []
  },
  {
    id: 'vithi',
    title: lang === 'si' ? 'චිත්ත වීථි' : 'Cognitive Process',
    description: lang === 'si' ? 'උසස් මට්ටම: අරමුණක් දැනගැනීමේදී සිත ක්‍රියාත්මක වන ක්‍රියාවලිය.' : 'Advanced: Visualize the 17 mind-moments of sensory perception.',
    entities: []
  },
  {
    id: 'kamma',
    title: lang === 'si' ? 'කර්ම විද්‍යාගාරය' : 'Kamma Lab',
    description: lang === 'si' ? 'කර්මය සකස් වන ආකාරය (Javana) සහ එහි විපාක (Rebirth) අත්හදා බලන්න.' : 'Simulate how Kamma is generated (Javana) and its results (Rebirth).',
    entities: []
  }
];

export const getTutorSystemInstruction = (lang: Language) => `
You are a wise and precise Abhidharma Teacher in the pure Theravada tradition (based on the Abhidhammattha Sangaha).
IMPORTANT: You MUST reply in ${lang === 'si' ? 'SINHALA' : 'ENGLISH'} Language.

Your Goal:
Help beginners understand the Abhidharma (Buddhist Psychology) by analyzing their questions or scenarios into Ultimate Realities (Paramattha Dhammas).

Guidelines:
1. STRICT THERAVADA: Do not use Mahayana concepts. Stick strictly to the Pali Canon.
2. ANALYTICAL: Break scenarios down into Citta (knowing), Cetasika (feeling, perception, greed/wisdom), and Rupa (sensory data).
3. TONE: Patient, scholarly yet encouraging.
4. LANGUAGE: ${lang === 'si' ? 'Sinhala' : 'English'}. Use Pali terms with explanations.
`;

export const getIntroQuizData = (lang: Language): QuizItem[] => [
  { id: 'q1', term: lang === 'si' ? 'රතු පැහැති ෆෙරාරි (Ferrari) රථයක්' : 'A Red Ferrari Car', type: 'concept', explanation: lang === 'si' ? '"කාර් එකක්" යනු වර්ණය, හැඩය සහ කොටස් එකතු කර අප සාදාගත් නමකි (පඤ්ඤප්ති). එය පරමාර්ථයක් නොවේ.' : '"Car" is a name we give to a collection of parts, color, and shape (Pannatti). It is not an ultimate reality.' },
  { id: 'q2', term: lang === 'si' ? 'කේන්තිය / තරහව' : 'Anger / Rage', type: 'reality', explanation: lang === 'si' ? 'කේන්තිය (ද්වේෂය) යනු චෛතසිකයකි. එය සැබවින්ම දැනෙන මානසික ස්වභාවයකි.' : 'Anger (Dosa) is a Cetasika (Mental Factor). It is a reality that is truly felt.' },
  { id: 'q3', term: lang === 'si' ? 'මගේ ආත්මය' : 'My Soul', type: 'concept', explanation: lang === 'si' ? 'ථේරවාදයට අනුව ස්ථිර වූ ආත්මයක් නොමැත. එය හුදෙක් සම්මුතියකි (Concept).' : 'In Theravada, there is no permanent soul. "Soul" is just a concept.' },
  { id: 'q4', term: lang === 'si' ? 'ශබ්දය' : 'Sound', type: 'reality', explanation: lang === 'si' ? 'ශබ්දය යනු රූපයකි. එය කනට ගැටෙන පරමාර්ථ ධර්මයකි.' : 'Sound is a Rupa (Matter). It is an ultimate reality that strikes the ear.' },
  { id: 'q5', term: lang === 'si' ? 'හෙට දවස' : 'Tomorrow', type: 'concept', explanation: lang === 'si' ? 'කාලය යනු සිත් සහ රූප වල පැවැත්ම අනුව අප පනවාගත් සම්මුතියකි.' : 'Time is a concept derived from the continuity of mind and matter.' },
  { id: 'q6', term: lang === 'si' ? 'තද ගතිය' : 'Hardness', type: 'reality', explanation: lang === 'si' ? 'තද ගතිය යනු පඨවි ධාතුවයි. එය ස්පර්ශයට දැනෙන පරමාර්ථයකි.' : 'Hardness is the Earth Element (Pathavi). It is a tangible reality.' },
];

export const getVithiStages = (lang: Language): VithiStage[] => [
  { id: '1', paliName: 'අතීත භවාංග', englishName: 'Past Life Continuum', function: lang === 'si' ? 'අරමුණක් ගැටීමට පෙර පැවති සිත.' : 'The stream of consciousness before an object impacts.', duration: 1 },
  { id: '2', paliName: 'භවාංග චලන', englishName: 'Vibrating Bhavanga', function: lang === 'si' ? 'අලුත් අරමුණක් ගැටීම නිසා භවාංගය සෙලවීම.' : 'The life-continuum vibrates due to new impact.', duration: 1 },
  { id: '3', paliName: 'භවාංග උපච්ඡේද', englishName: 'Arrest Bhavanga', function: lang === 'si' ? 'භවාංග ප්‍රවාහය සිඳී යාම.' : 'The flow is cut off.', duration: 1 },
  { id: '4', paliName: 'පඤ්චද්වාරාවජ්ජන', englishName: '5-Door Adverting', function: lang === 'si' ? 'පංච ඉන්ද්‍රිය දෙසට සිත යොමු වීම.' : 'Turning the mind towards the sense door.', duration: 1 },
  { id: '5', paliName: 'චක්ඛු විඤ්ඤාණ', englishName: 'Eye Consciousness', function: lang === 'si' ? 'රූපය දැකීම මාත්‍රය.' : 'Mere seeing of the form.', duration: 1 },
  { id: '6', paliName: 'සම්පටිච්ඡන', englishName: 'Receiving', function: lang === 'si' ? 'රූපය පිළිගැනීම.' : 'Receiving the object.', duration: 1 },
  { id: '7', paliName: 'සන්තීරණ', englishName: 'Investigating', function: lang === 'si' ? 'රූපය විමර්ශනය කිරීම.' : 'Investigating the object.', duration: 1 },
  { id: '8', paliName: 'වොත්ථපන', englishName: 'Determining', function: lang === 'si' ? 'රූපය කුමක්දැයි තීරණය කිරීම.' : 'Determining what the object is.', duration: 1 },
  { id: '9', paliName: 'ජවන් (Javana)', englishName: 'Impulsion', function: lang === 'si' ? 'කුසල් හෝ අකුසල් රැස් කරන අවස්ථාව (7 වරක් උපදී).' : 'The active stage where Kamma is generated (runs 7 times).', duration: 7 },
  { id: '10', paliName: 'තදාලම්බන', englishName: 'Registration', function: lang === 'si' ? 'අරමුණ රස විඳීම/ලියාපදිංචි වීම (2 වරක් උපදී).' : 'Registration of the experience (runs 2 times).', duration: 2 },
];

export const getCittaChallenges = (lang: Language): CittaChallenge[] => [
  {
    id: 'ch1',
    name: lang === 'si' ? 'දෘෂ්ටිගත ලෝභ සිතක්' : 'Greed with Wrong View',
    description: lang === 'si' ? '"මේ කෑම හරිම රසයි, මේ සැපය මගේමයි, එය සැමදා පවතී" යැයි සිතමින් රස විඳින අවස්ථාව.' : 'Enjoying food thinking "This is mine, this pleasure is permanent".',
    criteria: { root: 'greed', feeling: 'joy', view: 'wrong' },
    hint: lang === 'si' ? 'ආශාව ලෝභයයි. "මගේ" යැයි ගැනීම මිත්‍යා දෘෂ්ටියයි (Wrong View).' : 'Desire is Greed. Thinking "Mine" is Wrong View.'
  },
  {
    id: 'ch2',
    name: lang === 'si' ? 'ද්වේෂය / තරහව' : 'Anger / Hatred',
    description: lang === 'si' ? 'පය පැටලී ඇඟිල්ල වැදුණු විට ඇතිවන කේන්තිය.' : 'Sudden anger when stubbing your toe.',
    criteria: { root: 'hatred', feeling: 'misery', view: 'none' }, 
    hint: lang === 'si' ? 'ද්වේෂය සැමවිටම දොම්නස් සහගතයි (Misery).' : 'Hatred is always accompanied by Misery.'
  },
  {
    id: 'ch3',
    name: lang === 'si' ? 'මහා කුසල් සිතක්' : 'Great Wholesome Citta',
    description: lang === 'si' ? 'කර්මය කර්ම ඵලය විශ්වාස කරමින් දානයක් පූජා කරන අවස්ථාව.' : 'Offering alms believing in the Law of Kamma.',
    criteria: { root: 'beautiful', feeling: 'joy', view: 'right' }, 
    hint: lang === 'si' ? 'මෙය "ශෝභන" සිතකි. කර්මය විශ්වාස කිරීම ඥානයයි (Right View).' : 'This is a Beautiful Citta. Belief in Kamma is Wisdom (Right View).'
  },
  {
    id: 'ch4',
    name: lang === 'si' ? 'විචිකිච්ඡාව (සැකය)' : 'Doubt (Vicikiccha)',
    description: lang === 'si' ? 'නිවන් මාර්ගය ගැන හෝ රත්නත්‍රය ගැන සැක කරන අවස්ථාව.' : 'Doubting the Path or the Triple Gem.',
    criteria: { root: 'delusion', feeling: 'neutral', view: 'none' },
    hint: lang === 'si' ? 'මුලාව මෝහයයි. සැකය වේදනාවක් හෝ සැපක් නොවේ (උපේක්ෂා). දෘෂ්ටියක් ද නොවේ.' : 'Root is Delusion. Doubt feels Neutral. It is not a View.'
  }
];

export const getCetasikaGroups = (lang: Language): CetasikaGroup[] => [
  {
    id: 'universal',
    name: lang === 'si' ? 'සබ්බචිත්ත සාධාරණ (7)' : 'Universals (7)',
    color: 'bg-indigo-100 border-indigo-200 text-indigo-800 dark:bg-indigo-900/40 dark:border-indigo-800 dark:text-indigo-200',
    items: [
      { id: 'c1', paliName: 'ඵස්ස', englishName: 'Contact', description: lang === 'si' ? 'අරමුණ ස්පර්ශ කිරීම.' : 'Mental contact with the object.', type: EntityType.CETASIKA },
      { id: 'c2', paliName: 'වේදනා', englishName: 'Feeling', description: lang === 'si' ? 'අරමුණේ රස විඳීම.' : 'Experiencing the flavor of the object.', type: EntityType.CETASIKA },
      { id: 'c3', paliName: 'සඤ්ඤා', englishName: 'Perception', description: lang === 'si' ? 'හඳුනාගැනීම.' : 'Marking and recognizing.', type: EntityType.CETASIKA },
      { id: 'c4', paliName: 'චේතනා', englishName: 'Volition', description: lang === 'si' ? 'සිත මෙහෙයවීම (කර්මය).' : 'Will/Intention (Kamma).', type: EntityType.CETASIKA },
      { id: 'c5', paliName: 'ඒකග්ගතා', englishName: 'One-pointedness', description: lang === 'si' ? 'සිත එක අරමුණක තැබීම.' : 'Unification of mind.', type: EntityType.CETASIKA },
      { id: 'c6', paliName: 'ජීවිතින්ද්‍රිය', englishName: 'Life Faculty', description: lang === 'si' ? 'සිතේ ජීවය පවත්වා ගැනීම.' : 'Maintains mental life.', type: EntityType.CETASIKA },
      { id: 'c7', paliName: 'මනසිකාර', englishName: 'Attention', description: lang === 'si' ? 'අරමුණ මෙනෙහි කිරීම.' : 'Directing mind to object.', type: EntityType.CETASIKA },
    ]
  },
  {
    id: 'occasional',
    name: lang === 'si' ? 'පකිණ්ණක (6)' : 'Occasionals (6)',
    color: 'bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900/40 dark:border-blue-800 dark:text-blue-200',
    items: [
      { id: 'c8', paliName: 'විතක්ක', englishName: 'Initial Application', description: lang === 'si' ? 'සිත අරමුණට නැංවීම.' : 'Directing the mind onto the object.', type: EntityType.CETASIKA },
      { id: 'c9', paliName: 'විචාර', englishName: 'Sustained Application', description: lang === 'si' ? 'අරමුණෙහි හැසිරීම.' : 'Keeping the mind anchored.', type: EntityType.CETASIKA },
      { id: 'c10', paliName: 'අධිමොක්ඛ', englishName: 'Decision', description: lang === 'si' ? 'තීරණය කිරීම.' : 'Resolve or decision.', type: EntityType.CETASIKA },
      { id: 'c11', paliName: 'විරිය', englishName: 'Energy', description: lang === 'si' ? 'උත්සාහය.' : 'Effort/Energy.', type: EntityType.CETASIKA },
      { id: 'c12', paliName: 'පීති', englishName: 'Zest/Joy', description: lang === 'si' ? 'ප්‍රීතිය.' : 'Joy or rapture.', type: EntityType.CETASIKA },
      { id: 'c13', paliName: 'ඡන්ද', englishName: 'Desire to act', description: lang === 'si' ? 'කැමැත්ත.' : 'Will to do.', type: EntityType.CETASIKA },
    ]
  },
  {
    id: 'akusala',
    name: lang === 'si' ? 'අකුසල (14)' : 'Unwholesome (14)',
    color: 'bg-red-100 border-red-200 text-red-800 dark:bg-red-900/40 dark:border-red-800 dark:text-red-200',
    items: [
      { id: 'c14', paliName: 'මෝහ', englishName: 'Delusion', description: lang === 'si' ? 'මුලාව, නොදැනීම.' : 'Blindness to reality.', type: EntityType.CETASIKA },
      { id: 'c15', paliName: 'අහිරික', englishName: 'Shamelessness', description: lang === 'si' ? 'පවට ලැජ්ජා නැතිකම.' : 'Lack of shame to do evil.', type: EntityType.CETASIKA },
      { id: 'c16', paliName: 'අනොත්තප්ප', englishName: 'Fearlessness of Wrong', description: lang === 'si' ? 'පවට බිය නැතිකම.' : 'Lack of fear to do evil.', type: EntityType.CETASIKA },
      { id: 'c17', paliName: 'උද්ධච්ච', englishName: 'Restlessness', description: lang === 'si' ? 'සිතේ නොසන්සුන්කම.' : 'Agitation of mind.', type: EntityType.CETASIKA },
      { id: 'c18', paliName: 'ලෝභ', englishName: 'Greed', description: lang === 'si' ? 'ආශාව, ඇලීම.' : 'Attachment/Craving.', type: EntityType.CETASIKA },
      { id: 'c19', paliName: 'දිට්ඨි', englishName: 'Wrong View', description: lang === 'si' ? 'වැරදි දැක්ම.' : 'Incorrect belief.', type: EntityType.CETASIKA },
      { id: 'c20', paliName: 'මාන', englishName: 'Conceit', description: lang === 'si' ? 'උඩඟුකම.' : 'Pride.', type: EntityType.CETASIKA },
      { id: 'c21', paliName: 'දෝස', englishName: 'Hatred', description: lang === 'si' ? 'තරහව.' : 'Anger/Aversion.', type: EntityType.CETASIKA },
      { id: 'c22', paliName: 'ඉස්සා', englishName: 'Envy', description: lang === 'si' ? 'ඊර්ෂ්‍යාව.' : 'Jealousy.', type: EntityType.CETASIKA },
      { id: 'c23', paliName: 'මච්ඡරිය', englishName: 'Avarice', description: lang === 'si' ? 'මසුරුකම.' : 'Stinginess.', type: EntityType.CETASIKA },
      { id: 'c24', paliName: 'කුක්කුච්ච', englishName: 'Worry', description: lang === 'si' ? 'පසුතැවීම.' : 'Remorse.', type: EntityType.CETASIKA },
      { id: 'c25', paliName: 'ථීන', englishName: 'Sloth', description: lang === 'si' ? 'සිතේ අලස බව.' : 'Sluggishness of mind.', type: EntityType.CETASIKA },
      { id: 'c26', paliName: 'මිද්ධ', englishName: 'Torpor', description: lang === 'si' ? 'චෛතසිකයන්ගේ අලස බව.' : 'Sluggishness of factors.', type: EntityType.CETASIKA },
      { id: 'c27', paliName: 'විචිකිච්ඡා', englishName: 'Doubt', description: lang === 'si' ? 'සැකය.' : 'Skeptical doubt.', type: EntityType.CETASIKA },
    ]
  },
  {
    id: 'sobhana',
    name: lang === 'si' ? 'ශෝභන (25)' : 'Beautiful (25)',
    color: 'bg-emerald-100 border-emerald-200 text-emerald-800 dark:bg-emerald-900/40 dark:border-emerald-800 dark:text-emerald-200',
    items: [
      { id: 'c28', paliName: 'සද්ධා', englishName: 'Faith', description: lang === 'si' ? 'පැහැදීම.' : 'Confidence/Faith.', type: EntityType.CETASIKA },
      { id: 'c29', paliName: 'සති', englishName: 'Mindfulness', description: lang === 'si' ? 'සිහිය.' : 'Awareness.', type: EntityType.CETASIKA },
      { id: 'c30', paliName: 'හිරි', englishName: 'Shame', description: lang === 'si' ? 'පවට ඇති ලැජ්ජාව.' : 'Moral shame.', type: EntityType.CETASIKA },
      { id: 'c31', paliName: 'ඔත්තප්ප', englishName: 'Fear of Wrong', description: lang === 'si' ? 'පවට ඇති බිය.' : 'Moral dread.', type: EntityType.CETASIKA },
      { id: 'c32', paliName: 'අලෝභ', englishName: 'Non-greed', description: lang === 'si' ? 'ත්‍යාගය.' : 'Generosity.', type: EntityType.CETASIKA },
      { id: 'c33', paliName: 'අදෝස', englishName: 'Non-hatred', description: lang === 'si' ? 'මෛත්‍රිය.' : 'Loving-kindness.', type: EntityType.CETASIKA },
      { id: 'c34', paliName: 'තත්‍රමජ්ඣත්තතා', englishName: 'Neutrality', description: lang === 'si' ? 'මැදහත් බව.' : 'Balance of mind.', type: EntityType.CETASIKA },
      { id: 'c35', paliName: 'කායපස්සද්ධි', englishName: 'Tranquillity of body', description: lang === 'si' ? 'චෛතසික සංසිඳීම.' : 'Calmness of factors.', type: EntityType.CETASIKA },
      { id: 'c36', paliName: 'චිත්තපස්සද්ධි', englishName: 'Tranquillity of mind', description: lang === 'si' ? 'සිතේ සංසිඳීම.' : 'Calmness of mind.', type: EntityType.CETASIKA },
      { id: 'c52', paliName: 'පඤ්ඤා (අමෝහ)', englishName: 'Wisdom', description: lang === 'si' ? 'ඇත්ත ඇති සැටි දැකීම.' : 'Understanding reality.', type: EntityType.CETASIKA },
    ]
  }
];

export const getKammaSituations = (lang: Language): KammaSituation[] => [
  {
    id: 's1',
    title: lang === 'si' ? 'මදුරුවෙකු අතට පැමිණීම' : 'Mosquito Landing',
    description: lang === 'si' ? 'මදුරුවෙකු ඔබේ අතට පැමිණ දෂ්ට කිරීමට සැරසෙයි.' : 'A mosquito lands on your hand and prepares to bite.',
    imageIcon: 'mosquito'
  },
  {
    id: 's2',
    title: lang === 'si' ? 'යාචකයෙකු මුදල් ඉල්ලීම' : 'Beggar asking for help',
    description: lang === 'si' ? 'මහලු යාචකයෙකු ඔබ වෙත පැමිණ කෑමට යමක් ඉල්ලයි.' : 'An old beggar asks you for some food.',
    imageIcon: 'beggar'
  },
  {
    id: 's3',
    title: lang === 'si' ? 'බුදු පිළිමයක් දැකීම' : 'Seeing a Buddha Statue',
    description: lang === 'si' ? 'පන්සලකට ඇතුළු වන විට අලංකාර බුදු පිළිමයක් නෙත ගැටෙයි.' : 'You see a serene Buddha statue while entering a temple.',
    imageIcon: 'buddha'
  },
  {
    id: 's4',
    title: lang === 'si' ? 'ප්‍රශංසාවක් ලැබීම' : 'Receiving Praise',
    description: lang === 'si' ? 'ඔබ කළ හොඳ වැඩක් ගැන පිරිසක් ඉදිරියේ ප්‍රශංසා කරයි.' : 'Someone praises you in front of a crowd for your work.',
    imageIcon: 'praise'
  }
];

export const KAMMA_SCENARIOS: KammaScenario[] = [
  {
    id: 'k1',
    title: 'මදුරුවෙකු මැරීම',
    description: 'ඔබට දෂ්ට කිරීමට පැමිණි මදුරුවෙකු අතින් ගසා මරා දැමීම.',
    correctType: 'akusala',
    roots: ['dosa', 'moha'],
    explanation: 'සත්ව ඝාතනය ද්වේෂය (තරහව) මූලිකව සිදු වේ. මෝහය ද යෙදේ. මෙය අකුසලයකි.'
  }
];
