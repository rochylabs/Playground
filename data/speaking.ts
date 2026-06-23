export interface SpeakingPart1Data {
  taskLabel: string; partLabel: string; instruction: string;
  cardTitle: string;
  prompts: Array<{ keyword: string; example: string }>;
  tip: string;
}

export interface SpeakingPart2Card {
  theme: string;
  keyword: string;
  imageKey: string;
  exampleQuestion: string;
  exampleAnswer: string;
}

export interface SpeakingPart2Data {
  taskLabel: string; partLabel: string; instruction: string;
  cards: SpeakingPart2Card[];
  tip: string;
}

export type Part3CardType = "bitten" | "reagieren" | "verboten";

export interface SpeakingPart3Card {
  situation: string;
  imageKey: string;
  type: Part3CardType;
  partnerPrompt?: string;  // what partner says (for reagieren / verboten)
  modelResponse: string;
  partnerReply?: string;
}

export interface SpeakingPart3Data {
  taskLabel: string; partLabel: string; instruction: string;
  cards: SpeakingPart3Card[];
  tip: string;
}

export interface SpeakingExamSet {
  part1: SpeakingPart1Data;
  part2: SpeakingPart2Data;
  part3: SpeakingPart3Data;
}

// ─── SET 1 ───────────────────────────────────────────────────────────────────
const set1: SpeakingExamSet = {
  part1: {
    taskLabel: "Aufgabe 1", partLabel: "Sprechen · Teil 1",
    instruction: "Stellen Sie sich vor. Beantworten Sie die Fragen auf der Karte. Sprechen Sie circa eine Minute.",
    cardTitle: "Angaben zur Person",
    prompts: [
      { keyword: "Name?",          example: "Mein Name ist Maria Reyes." },
      { keyword: "Herkunft?",      example: "Ich komme aus den Philippinen." },
      { keyword: "Wohnort?",       example: "Ich wohne in Berlin." },
      { keyword: "Sprachen?",      example: "Ich spreche Englisch, Tagalog und ein bisschen Deutsch." },
      { keyword: "Beruf / Schule?",example: "Ich bin Lehrerin." },
      { keyword: "Hobbys?",        example: "In meiner Freizeit lese ich gern und gehe spazieren." },
    ],
    tip: "Sprechen Sie langsam und deutlich. Benutzen Sie die Stichwörter auf der Karte als Hilfe. Sie müssen keine langen Sätze sagen — kurze, klare Antworten reichen. (Speak slowly and clearly. Use the keywords on the card as a guide. Short, clear answers are fine.)",
  },
  part2: {
    taskLabel: "Aufgabe 2", partLabel: "Sprechen · Teil 2",
    instruction: "Ziehen Sie eine Themenkarte. Stellen Sie Ihrem Partner eine Frage zum Thema und antworten Sie auch auf seine Frage.",
    cards: [
      { theme: "Essen und Trinken", keyword: "Lieblingsessen", imageKey: "food",      exampleQuestion: "Was ist dein Lieblingsessen?", exampleAnswer: "Mein Lieblingsessen ist Pizza. Ich esse sehr gerne Pizza mit Tomaten und Käse." },
      { theme: "Freizeit",          keyword: "Hobby",          imageKey: "sport",     exampleQuestion: "Was machst du in deiner Freizeit?", exampleAnswer: "In meiner Freizeit spiele ich Fußball und lese Bücher." },
      { theme: "Familie",           keyword: "Geschwister",    imageKey: "family",    exampleQuestion: "Hast du Geschwister?", exampleAnswer: "Ja, ich habe eine Schwester. Sie wohnt in Hamburg." },
      { theme: "Wohnen",            keyword: "Wohnung",        imageKey: "apartment", exampleQuestion: "Wo wohnst du?", exampleAnswer: "Ich wohne in einer kleinen Wohnung in der Stadtmitte. Es gibt zwei Zimmer." },
      { theme: "Arbeit / Schule",   keyword: "Arbeitszeiten",  imageKey: "clock",     exampleQuestion: "Wann fängst du morgens an zu arbeiten?", exampleAnswer: "Ich fange um acht Uhr an. Ich arbeite bis fünf Uhr nachmittags." },
      { theme: "Reisen",            keyword: "Lieblingsstadt", imageKey: "airplane",  exampleQuestion: "Welche Stadt magst du am liebsten?", exampleAnswer: "Ich mag Wien am liebsten. Die Stadt ist sehr schön und hat viele Museen." },
    ],
    tip: "Hören Sie Ihrem Partner gut zu. Stellen Sie eine klare Frage und antworten Sie in einem vollständigen Satz. (Listen carefully to your partner. Ask a clear question and answer in a complete sentence.)",
  },
  part3: {
    taskLabel: "Aufgabe 3", partLabel: "Sprechen · Teil 3",
    instruction: "Ziehen Sie eine Bildkarte. Bitten Sie Ihren Partner um etwas (bitten), reagieren Sie auf eine Bitte (reagieren), oder erklären Sie, dass etwas nicht erlaubt ist (verboten).",
    cards: [
      { situation: "Sie sind im Unterricht. Sie brauchen einen Stift.", imageKey: "pencil",    type: "bitten", modelResponse: "Entschuldigung, kannst du mir bitte einen Stift leihen?", partnerReply: "Ja, klar! Hier bitte." },
      { situation: "Sie sind im Büro. Sie brauchen ein Blatt Papier.", imageKey: "paper",     type: "bitten", modelResponse: "Entschuldigung, kannst du mir bitte ein Blatt Papier geben?", partnerReply: "Natürlich, kein Problem." },
      { situation: "Sie sind in der Bibliothek. Jemand telefoniert laut.", imageKey: "no-phone",  type: "verboten", partnerPrompt: "Darf ich hier telefonieren?", modelResponse: "Tut mir leid, das ist hier leider verboten. In der Bibliothek darf man nicht telefonieren.", partnerReply: "Oh, Entschuldigung! Ich gehe nach draußen." },
      { situation: "Sie sind zu Hause. Ihr Handy ist leer.", imageKey: "charger",   type: "bitten", modelResponse: "Kannst du mir bitte dein Ladekabel leihen? Mein Handy ist leer.", partnerReply: "Ja, gerne. Hier ist es." },
      { situation: "Im Museum möchte jemand fotografieren.", imageKey: "no-camera", type: "verboten", partnerPrompt: "Darf ich hier ein Foto machen?", modelResponse: "Tut mir leid, das ist hier nicht erlaubt. Im Museum darf man leider nicht fotografieren.", partnerReply: "Oh, das wusste ich nicht. Entschuldigung." },
    ],
    tip: "Achten Sie auf das Symbol auf der Karte: bitten = Sie stellen eine Bitte, reagieren = Sie antworten auf eine Bitte, verboten = Sie erklären, dass etwas nicht erlaubt ist. (Pay attention to the card type: bitten = you make a request, reagieren = you respond to a request, verboten = you explain something is not allowed.)",
  },
};

// ─── SET 2 ───────────────────────────────────────────────────────────────────
const set2: SpeakingExamSet = {
  part1: {
    taskLabel: "Aufgabe 1", partLabel: "Sprechen · Teil 1",
    instruction: "Stellen Sie sich vor. Beantworten Sie die Fragen auf der Karte. Sprechen Sie circa eine Minute.",
    cardTitle: "Angaben zur Person",
    prompts: [
      { keyword: "Name?",    example: "Ich heiße Carlos Mendez." },
      { keyword: "Alter?",   example: "Ich bin 29 Jahre alt." },
      { keyword: "Herkunft?",example: "Ich komme aus Spanien, aus Madrid." },
      { keyword: "Wohnort?", example: "Jetzt wohne ich in Berlin." },
      { keyword: "Beruf?",   example: "Ich bin Ingenieur." },
      { keyword: "Familie?", example: "Ich bin verheiratet und habe ein Kind." },
    ],
    tip: "Beginnen Sie mit Ihrem Namen und woher Sie kommen. Dann sprechen Sie über Beruf und Familie. Machen Sie eine kurze Pause zwischen den Themen. (Start with your name and where you're from. Then talk about your job and family.)",
  },
  part2: {
    taskLabel: "Aufgabe 2", partLabel: "Sprechen · Teil 2",
    instruction: "Ziehen Sie eine Themenkarte. Stellen Sie Ihrem Partner eine Frage zum Thema und antworten Sie auch auf seine Frage.",
    cards: [
      { theme: "Verkehr",       keyword: "Transportmittel",  imageKey: "subway",     exampleQuestion: "Wie fährst du zur Arbeit?", exampleAnswer: "Ich fahre mit der U-Bahn. Das dauert ungefähr 20 Minuten." },
      { theme: "Gesundheit",    keyword: "Sport",            imageKey: "jogging",    exampleQuestion: "Machst du Sport?", exampleAnswer: "Ja, ich gehe dreimal pro Woche joggen. Das macht mir viel Spaß." },
      { theme: "Einkaufen",     keyword: "Lieblingsgeschäft",imageKey: "shopping",   exampleQuestion: "Wo kaufst du am liebsten ein?", exampleAnswer: "Ich kaufe meistens im Supermarkt ein. Manchmal gehe ich auch auf den Markt." },
      { theme: "Wetter",        keyword: "Jahreszeit",       imageKey: "sun",        exampleQuestion: "Welche Jahreszeit magst du am liebsten?", exampleAnswer: "Ich mag den Sommer am liebsten, weil es warm und sonnig ist." },
      { theme: "Schule / Kurse",keyword: "Lernmethode",     imageKey: "books",      exampleQuestion: "Wie lernst du Deutsch?", exampleAnswer: "Ich lerne mit einem Kurs und auch mit Apps auf dem Handy." },
      { theme: "Technologie",   keyword: "Handy",            imageKey: "smartphone", exampleQuestion: "Wozu benutzt du dein Handy?", exampleAnswer: "Ich benutze es für Nachrichten, Musik und Navigation." },
    ],
    tip: "Wenn Sie eine Frage nicht verstehen, sagen Sie: Können Sie das bitte wiederholen? oder Ich verstehe das nicht ganz. (If you don't understand, say: Can you repeat that? or I don't quite understand.)",
  },
  part3: {
    taskLabel: "Aufgabe 3", partLabel: "Sprechen · Teil 3",
    instruction: "Ziehen Sie eine Bildkarte. Bitten Sie Ihren Partner um etwas (bitten), reagieren Sie auf eine Bitte (reagieren), oder erklären Sie, dass etwas nicht erlaubt ist (verboten).",
    cards: [
      { situation: "Sie sind im Café. Sie möchten, dass jemand auf Ihre Tasche aufpasst.", imageKey: "handbag",    type: "bitten", modelResponse: "Entschuldigung, können Sie bitte kurz auf meine Tasche aufpassen? Ich bin gleich zurück.", partnerReply: "Ja, natürlich. Kein Problem." },
      { situation: "Sie sind in der Straßenbahn. Sie brauchen einen Sitzplatz, weil Sie krank sind.", imageKey: "tram",       type: "bitten", modelResponse: "Entschuldigung, darf ich mich bitte setzen? Mir ist nicht gut.", partnerReply: "Ja, natürlich. Bitte sehr." },
      { situation: "Im Park möchte jemand auf dem Rasen sitzen. Das Schild sagt: Rasen betreten verboten.", imageKey: "park",       type: "verboten", partnerPrompt: "Darf ich hier auf dem Rasen sitzen?", modelResponse: "Tut mir leid, das ist hier verboten. Bitte lesen Sie das Schild — Rasen betreten verboten.", partnerReply: "Oh, das habe ich nicht gesehen. Danke!" },
      { situation: "Sie suchen den Bahnhof. Sie brauchen eine Wegbeschreibung.", imageKey: "map",        type: "bitten", modelResponse: "Entschuldigung, wie komme ich zum Bahnhof?", partnerReply: "Gehen Sie geradeaus, dann links. Der Bahnhof ist 5 Minuten zu Fuß." },
      { situation: "Im Bus möchte jemand rauchen.", imageKey: "no-smoking", type: "verboten", partnerPrompt: "Kann ich hier rauchen?", modelResponse: "Nein, das ist leider verboten. Im Bus darf man nicht rauchen.", partnerReply: "Entschuldigung, ich höre sofort auf." },
    ],
    tip: "Achten Sie auf das Symbol auf der Karte: bitten = Sie stellen eine Bitte, reagieren = Sie antworten auf eine Bitte, verboten = Sie erklären, dass etwas nicht erlaubt ist. (Pay attention to the card type: bitten = you make a request, reagieren = you respond to a request, verboten = you explain something is not allowed.)",
  },
};

// ─── SET 3 ───────────────────────────────────────────────────────────────────
const set3: SpeakingExamSet = {
  part1: {
    taskLabel: "Aufgabe 1", partLabel: "Sprechen · Teil 1",
    instruction: "Stellen Sie sich vor. Beantworten Sie die Fragen auf der Karte. Sprechen Sie circa eine Minute.",
    cardTitle: "Angaben zur Person",
    prompts: [
      { keyword: "Name?",           example: "Mein Name ist Yuki Tanaka." },
      { keyword: "Herkunft?",       example: "Ich bin aus Japan, aus Tokyo." },
      { keyword: "Wohnort?",        example: "Seit einem Jahr wohne ich in Köln." },
      { keyword: "Sprachen?",       example: "Ich spreche Japanisch, Englisch und lerne Deutsch." },
      { keyword: "Studium / Beruf?",example: "Ich studiere Medizin an der Universität Köln." },
      { keyword: "Freizeit?",       example: "Ich koche gerne und mache Yoga." },
    ],
    tip: "Sie können auch über Ihre Pläne sprechen. Zum Beispiel: Ich möchte nach dem Studium in Deutschland arbeiten. (You can also talk about your plans: I'd like to work in Germany after my studies.)",
  },
  part2: {
    taskLabel: "Aufgabe 2", partLabel: "Sprechen · Teil 2",
    instruction: "Ziehen Sie eine Themenkarte. Stellen Sie Ihrem Partner eine Frage zum Thema und antworten Sie auch auf seine Frage.",
    cards: [
      { theme: "Wohnen",    keyword: "Stadt oder Land", imageKey: "city",     exampleQuestion: "Lebst du lieber in der Stadt oder auf dem Land?", exampleAnswer: "Ich lebe lieber in der Stadt, weil alles nah ist und es viel zu tun gibt." },
      { theme: "Freizeit",  keyword: "Kino",            imageKey: "cinema",   exampleQuestion: "Gehst du gerne ins Kino?", exampleAnswer: "Ja, ich gehe gerne ins Kino. Am liebsten schaue ich Komödien." },
      { theme: "Essen",     keyword: "Frühstück",       imageKey: "breakfast",exampleQuestion: "Was isst du zum Frühstück?", exampleAnswer: "Ich esse meistens Brot mit Marmelade und trinke Tee." },
      { theme: "Sprachen",  keyword: "Lerntipp",        imageKey: "speech",   exampleQuestion: "Hast du einen Tipp für das Deutschlernen?", exampleAnswer: "Ja! Höre jeden Tag deutsche Musik. Das hilft sehr." },
      { theme: "Reisen",    keyword: "Traumreise",      imageKey: "globe",    exampleQuestion: "Wohin möchtest du gerne reisen?", exampleAnswer: "Ich möchte gerne nach Australien reisen. Die Natur dort ist fantastisch." },
      { theme: "Alltag",    keyword: "Morgenroutine",   imageKey: "alarm",    exampleQuestion: "Was machst du morgens zuerst?", exampleAnswer: "Zuerst dusche ich, dann frühstücke ich und lese die Nachrichten." },
    ],
    tip: "Wenn Sie antworten, geben Sie auch einen Grund an. Benutzen Sie 'weil' oder 'denn'. Zum Beispiel: Ich mag Sommer, weil es warm ist. (When answering, give a reason using 'because'.)",
  },
  part3: {
    taskLabel: "Aufgabe 3", partLabel: "Sprechen · Teil 3",
    instruction: "Ziehen Sie eine Bildkarte. Bitten Sie Ihren Partner um etwas (bitten), reagieren Sie auf eine Bitte (reagieren), oder erklären Sie, dass etwas nicht erlaubt ist (verboten).",
    cards: [
      { situation: "Sie sind im Restaurant. Das Essen ist kalt. Sie möchten es zurückgeben.", imageKey: "restaurant", type: "bitten",    modelResponse: "Entschuldigung, mein Essen ist leider kalt. Können Sie es bitte aufwärmen?", partnerReply: "Oh, das tut mir leid! Natürlich." },
      { situation: "Sie sind im Hotel. Ihr Zimmer ist zu laut.", imageKey: "hotel",      type: "reagieren", partnerPrompt: "Mein Zimmer ist sehr laut. Haben Sie ein ruhigeres Zimmer?", modelResponse: "Ja, natürlich. Zimmer 302 ist frei und liegt auf der ruhigen Seite.", partnerReply: "Vielen Dank!" },
      { situation: "In der Arztpraxis möchte jemand im Wartezimmer essen.", imageKey: "medical",    type: "verboten",  partnerPrompt: "Darf ich hier etwas essen?", modelResponse: "Tut mir leid, das ist hier nicht erlaubt. Im Wartezimmer darf man leider nicht essen.", partnerReply: "Oh, Entschuldigung!" },
      { situation: "Sie möchten einen Termin beim Arzt machen.", imageKey: "calendar",  type: "bitten",    modelResponse: "Guten Tag, ich möchte einen Termin beim Doktor machen. Ich habe Halsschmerzen.", partnerReply: "Wann passt es Ihnen? Morgen um 10 Uhr?" },
      { situation: "Im Kino sitzt jemand auf Ihrem reservierten Platz.", imageKey: "ticket",    type: "reagieren", partnerPrompt: "Entschuldigung, ich glaube, das ist mein Platz.", modelResponse: "Oh, Entschuldigung! Ich suche meinen Platz. Hier ist meine Karte — Reihe 5, Platz 12.", partnerReply: "Kein Problem!" },
    ],
    tip: "Bleiben Sie ruhig und freundlich, auch wenn die Situation schwierig ist. Ein Lächeln hilft immer! (Stay calm and friendly even in difficult situations. A smile always helps!)",
  },
};

// ─── SET 4 ───────────────────────────────────────────────────────────────────
const set4: SpeakingExamSet = {
  part1: {
    taskLabel: "Aufgabe 1", partLabel: "Sprechen · Teil 1",
    instruction: "Stellen Sie sich vor. Beantworten Sie die Fragen auf der Karte. Sprechen Sie circa eine Minute.",
    cardTitle: "Angaben zur Person",
    prompts: [
      { keyword: "Name?",    example: "Mein Name ist Fatima Al-Hassan." },
      { keyword: "Herkunft?",example: "Ich komme aus Kairo in Ägypten." },
      { keyword: "Wohnort?", example: "Seit zwei Jahren wohne ich in Hamburg." },
      { keyword: "Beruf?",   example: "Ich bin Ärztin. Ich arbeite in einem Krankenhaus." },
      { keyword: "Sprachen?",example: "Ich spreche Arabisch, Englisch und Deutsch." },
      { keyword: "Freizeit?",example: "In meiner Freizeit schwimme ich gerne und lese Bücher." },
    ],
    tip: "Sprechen Sie über Ihre Erfahrungen in Deutschland. Zum Beispiel: Ich finde Deutschland sehr interessant, weil... (Talk about your experiences in Germany: I find Germany very interesting because…)",
  },
  part2: {
    taskLabel: "Aufgabe 2", partLabel: "Sprechen · Teil 2",
    instruction: "Ziehen Sie eine Themenkarte. Stellen Sie Ihrem Partner eine Frage zum Thema und antworten Sie auch auf seine Frage.",
    cards: [
      { theme: "Gesundheit", keyword: "Arztbesuch",      imageKey: "stethoscope", exampleQuestion: "Gehst du oft zum Arzt?", exampleAnswer: "Nein, ich gehe nur zum Arzt, wenn ich krank bin. Zum Glück bin ich selten krank." },
      { theme: "Arbeit",     keyword: "Traumjob",        imageKey: "briefcase",   exampleQuestion: "Was ist dein Traumjob?", exampleAnswer: "Mein Traumjob ist Ärztin. Ich möchte Menschen helfen." },
      { theme: "Essen",      keyword: "Kochen",          imageKey: "cooking",     exampleQuestion: "Kochst du gerne?", exampleAnswer: "Ja, ich koche sehr gerne. Ich mache oft arabische Gerichte." },
      { theme: "Freizeit",   keyword: "Lesen",           imageKey: "reading",     exampleQuestion: "Was liest du gerne?", exampleAnswer: "Ich lese gerne Romane. Gerade lese ich ein Buch auf Deutsch!" },
      { theme: "Wohnen",     keyword: "Traumwohnung",    imageKey: "house",       exampleQuestion: "Wie sieht deine Traumwohnung aus?", exampleAnswer: "Meine Traumwohnung ist groß und hell, mit einem Balkon und Blick auf das Wasser." },
      { theme: "Deutschland",keyword: "Unterschiede",    imageKey: "germany",     exampleQuestion: "Was ist anders in Deutschland als in deiner Heimat?", exampleAnswer: "Das Wetter ist sehr anders! In Ägypten ist es viel wärmer. Aber ich mag den deutschen Sommer." },
    ],
    tip: "Versuchen Sie, nicht nur 'Ja' oder 'Nein' zu sagen. Geben Sie immer eine kurze Erklärung dazu. (Try not to just say yes or no. Always add a short explanation.)",
  },
  part3: {
    taskLabel: "Aufgabe 3", partLabel: "Sprechen · Teil 3",
    instruction: "Ziehen Sie eine Bildkarte. Bitten Sie Ihren Partner um etwas (bitten), reagieren Sie auf eine Bitte (reagieren), oder erklären Sie, dass etwas nicht erlaubt ist (verboten).",
    cards: [
      { situation: "Sie sind in der Bibliothek. Sie möchten ein Buch ausleihen, haben aber Ihren Ausweis nicht dabei.", imageKey: "library-book", type: "bitten",    modelResponse: "Guten Tag. Ich möchte dieses Buch ausleihen, aber ich habe meinen Ausweis nicht dabei. Was kann ich tun?", partnerReply: "Kein Problem. Bringen Sie den Ausweis morgen mit." },
      { situation: "Im Schwimmbad möchte jemand mit Essen in das Becken.", imageKey: "pool",         type: "verboten",  partnerPrompt: "Darf ich mein Essen mit ins Wasser nehmen?", modelResponse: "Nein, das ist leider verboten. Im Schwimmbad darf man nicht essen, besonders nicht im Wasser.", partnerReply: "Okay, dann esse ich nachher." },
      { situation: "Ihr Nachbar macht nachts Lärm. Sie sprechen mit ihm.", imageKey: "quiet",        type: "bitten",    modelResponse: "Guten Abend. Ich kann wegen des Lärms nicht schlafen. Können Sie bitte leiser sein?", partnerReply: "Oh, Entschuldigung! Ich wusste das nicht. Natürlich." },
      { situation: "Im Zug möchte jemand in der Stille-Zone telefonieren.", imageKey: "train",        type: "verboten",  partnerPrompt: "Stört es Sie, wenn ich hier telefoniere?", modelResponse: "Tut mir leid, das ist hier leider nicht erlaubt. Das ist die Ruhe-Zone — hier darf man nicht telefonieren.", partnerReply: "Oh, Entschuldigung! Ich gehe in den anderen Waggon." },
      { situation: "Sie möchten in einem Geschäft ein T-Shirt umtauschen.", imageKey: "tshirt",       type: "bitten",    modelResponse: "Guten Tag. Ich habe dieses T-Shirt gekauft, aber es ist zu klein. Kann ich es bitte umtauschen?", partnerReply: "Ja, natürlich. Haben Sie die Quittung dabei?" },
    ],
    tip: "Wenn Sie nervös sind, atmen Sie tief durch. Sprechen Sie langsam. Die Prüferin oder der Prüfer möchte sehen, dass Sie kommunizieren können — keine Perfektion. (If nervous, breathe deeply and speak slowly. The examiner wants communication, not perfection.)",
  },
};

export const speakingExamSets: SpeakingExamSet[] = [set1, set2, set3, set4];
export const speakingPart1 = set1.part1;
export const speakingPart2 = set1.part2;
export const speakingPart3 = set1.part3;
