export interface PersonInfo { label: string; value: string; }
export interface FormField { label: string; correctAnswer: string; hint?: string; }

export interface WritingPart1Data {
  taskLabel: string; partLabel: string; instruction: string;
  personCard: { title: string; info: PersonInfo[]; };
  formFields: FormField[];
  points: number;
}

export interface WritingPart2Data {
  taskLabel: string; partLabel: string; instruction: string;
  situation: string; promptPoints: string[];
  wordTarget: string; modelAnswer: string; usefulPhrases: string[];
  points: number;
}

export interface WritingExamSet {
  part1: WritingPart1Data;
  part2: WritingPart2Data;
}

// ─── SET 1 (original) ────────────────────────────────────────────────────────
const set1: WritingExamSet = {
  part1: {
    taskLabel: "Aufgabe 1", partLabel: "Schreiben · Teil 1", points: 5,
    instruction: "Lesen Sie den Steckbrief. Füllen Sie dann das Formular aus.",
    personCard: {
      title: "Steckbrief: Anna Berger",
      info: [
        { label: "Vorname", value: "Anna" }, { label: "Familienname", value: "Berger" },
        { label: "Geburtsdatum", value: "14.07.1988" }, { label: "Geburtsort", value: "Wien" },
        { label: "Nationalität", value: "österreichisch" }, { label: "Beruf", value: "Lehrerin" },
        { label: "Adresse", value: "Rosenstraße 7, 80331 München" },
        { label: "Telefon", value: "089 / 44 55 66" }, { label: "E-Mail", value: "anna.berger@mail.de" },
      ],
    },
    formFields: [
      { label: "Familienname", correctAnswer: "Berger" },
      { label: "Geburtsdatum", correctAnswer: "14.07.1988", hint: "TT.MM.JJJJ" },
      { label: "Nationalität", correctAnswer: "österreichisch" },
      { label: "Beruf", correctAnswer: "Lehrerin" },
      { label: "Telefon", correctAnswer: "089 / 44 55 66" },
    ],
  },
  part2: {
    taskLabel: "Aufgabe 2", partLabel: "Schreiben · Teil 2", points: 10,
    instruction: "Schreiben Sie eine E-Mail. Schreiben Sie zu allen drei Punkten.",
    situation: "Ihr Freund Peter hat Sie zu seiner Geburtstagsparty am Samstag eingeladen. Sie können leider nicht kommen. Schreiben Sie Peter eine E-Mail (circa 30 Wörter):",
    promptPoints: ["Bedanken Sie sich für die Einladung.", "Erklären Sie, warum Sie nicht kommen können.", "Machen Sie einen anderen Terminvorschlag."],
    wordTarget: "circa 30 Wörter",
    modelAnswer: "Lieber Peter,\n\nvielen Dank für die Einladung zu deiner Party! Leider kann ich am Samstag nicht kommen — ich besuche meine Eltern in Hamburg. Können wir uns nächste Woche treffen, vielleicht am Mittwoch?\n\nLiebe Grüße,\n[Dein Name]",
    usefulPhrases: ["Lieber Peter, / Hallo Peter,", "Vielen Dank für … (Thank you for …)", "Leider kann ich nicht … (Unfortunately I cannot …)", "Ich muss … / Ich besuche … (I have to … / I am visiting …)", "Können wir uns … treffen? (Can we meet …?)", "Liebe Grüße / Viele Grüße (Kind regards)"],
  },
};

// ─── SET 2 ────────────────────────────────────────────────────────────────────
const set2: WritingExamSet = {
  part1: {
    taskLabel: "Aufgabe 1", partLabel: "Schreiben · Teil 1", points: 5,
    instruction: "Lesen Sie den Steckbrief. Füllen Sie dann das Formular aus.",
    personCard: {
      title: "Steckbrief: Carlos Mendez",
      info: [
        { label: "Vorname", value: "Carlos" }, { label: "Familienname", value: "Mendez" },
        { label: "Geburtsdatum", value: "03.02.1995" }, { label: "Geburtsort", value: "Madrid" },
        { label: "Nationalität", value: "spanisch" }, { label: "Beruf", value: "Ingenieur" },
        { label: "Adresse", value: "Hauptstraße 22, 10115 Berlin" },
        { label: "Telefon", value: "030 / 12 34 56" }, { label: "E-Mail", value: "carlos.mendez@mail.de" },
      ],
    },
    formFields: [
      { label: "Vorname", correctAnswer: "Carlos" },
      { label: "Geburtsdatum", correctAnswer: "03.02.1995", hint: "TT.MM.JJJJ" },
      { label: "Nationalität", correctAnswer: "spanisch" },
      { label: "Beruf", correctAnswer: "Ingenieur" },
      { label: "E-Mail", correctAnswer: "carlos.mendez@mail.de" },
    ],
  },
  part2: {
    taskLabel: "Aufgabe 2", partLabel: "Schreiben · Teil 2", points: 10,
    instruction: "Schreiben Sie eine E-Mail. Schreiben Sie zu allen drei Punkten.",
    situation: "Sie haben ein Paket bestellt, aber es ist nicht angekommen. Schreiben Sie der Firma eine E-Mail (circa 30 Wörter):",
    promptPoints: ["Erklären Sie das Problem.", "Geben Sie Ihre Bestellnummer an (z. B. #12345).", "Bitten Sie um eine schnelle Antwort."],
    wordTarget: "circa 30 Wörter",
    modelAnswer: "Sehr geehrte Damen und Herren,\n\nich habe am 10. März ein Paket bestellt (Bestellnummer #12345), aber es ist noch nicht angekommen. Bitte informieren Sie mich so schnell wie möglich.\n\nMit freundlichen Grüßen,\n[Ihr Name]",
    usefulPhrases: ["Sehr geehrte Damen und Herren, (Dear Sir/Madam,)", "Ich habe … bestellt. (I ordered …)", "Das Paket ist nicht angekommen. (The package has not arrived.)", "Bitte informieren Sie mich … (Please let me know …)", "Mit freundlichen Grüßen (Yours sincerely)"],
  },
};

// ─── SET 3 ────────────────────────────────────────────────────────────────────
const set3: WritingExamSet = {
  part1: {
    taskLabel: "Aufgabe 1", partLabel: "Schreiben · Teil 1", points: 5,
    instruction: "Lesen Sie den Steckbrief. Füllen Sie dann das Formular aus.",
    personCard: {
      title: "Steckbrief: Yuki Tanaka",
      info: [
        { label: "Vorname", value: "Yuki" }, { label: "Familienname", value: "Tanaka" },
        { label: "Geburtsdatum", value: "28.11.2000" }, { label: "Geburtsort", value: "Tokyo" },
        { label: "Nationalität", value: "japanisch" }, { label: "Beruf", value: "Studentin" },
        { label: "Adresse", value: "Gartenweg 5, 50667 Köln" },
        { label: "Telefon", value: "0221 / 98 76 54" }, { label: "E-Mail", value: "yuki.tanaka@mail.de" },
      ],
    },
    formFields: [
      { label: "Familienname", correctAnswer: "Tanaka" },
      { label: "Geburtsdatum", correctAnswer: "28.11.2000", hint: "TT.MM.JJJJ" },
      { label: "Geburtsort", correctAnswer: "Tokyo" },
      { label: "Beruf", correctAnswer: "Studentin" },
      { label: "Adresse", correctAnswer: "Gartenweg 5, 50667 Köln" },
    ],
  },
  part2: {
    taskLabel: "Aufgabe 2", partLabel: "Schreiben · Teil 2", points: 10,
    instruction: "Schreiben Sie eine E-Mail. Schreiben Sie zu allen drei Punkten.",
    situation: "Ihre Freundin Maria hat nächste Woche Geburtstag. Sie möchten ihr gratulieren. Schreiben Sie Maria eine E-Mail (circa 30 Wörter):",
    promptPoints: ["Gratulieren Sie ihr zum Geburtstag.", "Machen Sie ein Geschenk-Vorschlag (z. B. gemeinsam essen gehen).", "Fragen Sie, wann sie Zeit hat."],
    wordTarget: "circa 30 Wörter",
    modelAnswer: "Liebe Maria,\n\nherzlichen Glückwunsch zum Geburtstag! Ich möchte dich gerne zum Essen einladen — als kleines Geschenk von mir. Wann hast du nächste Woche Zeit?\n\nLiebe Grüße,\n[Dein Name]",
    usefulPhrases: ["Herzlichen Glückwunsch zum Geburtstag! (Happy birthday!)", "Ich möchte dich einladen … (I'd like to invite you …)", "Wann hast du Zeit? (When are you free?)", "Das ist mein Geschenk für dich. (This is my gift for you.)", "Liebe Grüße (Kind regards)"],
  },
};

// ─── SET 4 ────────────────────────────────────────────────────────────────────
const set4: WritingExamSet = {
  part1: {
    taskLabel: "Aufgabe 1", partLabel: "Schreiben · Teil 1", points: 5,
    instruction: "Lesen Sie den Steckbrief. Füllen Sie dann das Formular aus.",
    personCard: {
      title: "Steckbrief: Fatima Al-Hassan",
      info: [
        { label: "Vorname", value: "Fatima" }, { label: "Familienname", value: "Al-Hassan" },
        { label: "Geburtsdatum", value: "15.04.1990" }, { label: "Geburtsort", value: "Kairo" },
        { label: "Nationalität", value: "ägyptisch" }, { label: "Beruf", value: "Ärztin" },
        { label: "Adresse", value: "Bergstraße 3, 20095 Hamburg" },
        { label: "Telefon", value: "040 / 33 22 11" }, { label: "E-Mail", value: "f.alhassan@mail.de" },
      ],
    },
    formFields: [
      { label: "Vorname", correctAnswer: "Fatima" },
      { label: "Familienname", correctAnswer: "Al-Hassan" },
      { label: "Nationalität", correctAnswer: "ägyptisch" },
      { label: "Beruf", correctAnswer: "Ärztin" },
      { label: "Telefon", correctAnswer: "040 / 33 22 11" },
    ],
  },
  part2: {
    taskLabel: "Aufgabe 2", partLabel: "Schreiben · Teil 2", points: 10,
    instruction: "Schreiben Sie eine E-Mail. Schreiben Sie zu allen drei Punkten.",
    situation: "Sie suchen ein Zimmer in einer WG. Sie haben eine Anzeige gelesen. Schreiben Sie der WG eine E-Mail (circa 30 Wörter):",
    promptPoints: ["Stellen Sie sich kurz vor.", "Erklären Sie, warum Sie ein Zimmer suchen.", "Fragen Sie, wann Sie das Zimmer besichtigen können."],
    wordTarget: "circa 30 Wörter",
    modelAnswer: "Hallo,\n\nmein Name ist Fatima, ich bin Ärztin und suche ein ruhiges Zimmer ab Mai. Ich habe Ihre Anzeige gelesen und interessiere mich sehr. Wann kann ich das Zimmer besichtigen?\n\nViele Grüße,\nFatima",
    usefulPhrases: ["Hallo, / Guten Tag,", "Mein Name ist … und ich bin … (My name is … and I am …)", "Ich suche ein Zimmer ab … (I am looking for a room from …)", "Ich habe Ihre Anzeige gelesen. (I read your advertisement.)", "Wann kann ich … besichtigen? (When can I view …?)"],
  },
};

export const writingExamSets: WritingExamSet[] = [set1, set2, set3, set4];
export const writingPart1 = set1.part1;
export const writingPart2 = set1.part2;
