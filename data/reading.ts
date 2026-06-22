export interface ReadingQuestion {
  id: string;
  statement: string;
  answer: boolean | string;
  explanation?: string;
}

export interface ReadingNotice {
  label: string;
  text: string;
}

export interface ReadingText {
  label?: string;
  title?: string;
  body: string;
}

export type ReadingPartType = "richtig-falsch" | "matching";

export interface ReadingPart {
  part: 1 | 2 | 3;
  taskLabel: string;
  partLabel: string;
  instruction: string;
  texts?: ReadingText[];
  notices?: ReadingNotice[];
  type: ReadingPartType;
  questions: ReadingQuestion[];
  points: number;
}

export interface ReadingExamSet {
  parts: ReadingPart[];
}

// ─── SET 1 (original) ────────────────────────────────────────────────────────
const set1: ReadingExamSet = { parts: [
  {
    part: 1, taskLabel: "Aufgabe 1", partLabel: "Lesen · Teil 1",
    type: "richtig-falsch", points: 5,
    instruction: "Lesen Sie die Texte und die Aufgaben 1 bis 5. Sind die Aussagen richtig oder falsch? Kreuzen Sie an.",
    texts: [
      { label: "Text A", title: "Aushang im Supermarkt", body: "Liebe Kunden,\n\nunsere Fleischabteilung ist vom 12. bis 14. März wegen Umbauarbeiten geschlossen.\nAb dem 15. März stehen wir Ihnen wieder mit unserem vollen Angebot zur Verfügung.\n\nWir bitten um Ihr Verständnis.\nIhr Supermarkt-Team" },
      { label: "Text B", title: "Notiz an der Bürotür", body: "Bin bis 14:00 Uhr beim Arzt.\nBitte alle Anrufe notieren.\nDringende Sachen an Frau Becker (Zimmer 204) weitergeben.\n\n— Klaus" },
      { label: "Text C", title: "Kurzmitteilung", body: "Hallo Sabine,\n\nich kann heute Abend leider nicht zum Kurs kommen — mein Kind ist krank.\nKannst du mir bitte die Hausaufgaben schicken?\n\nDanke! Lena" },
    ],
    questions: [
      { id: "r1-1", statement: "Die Fleischabteilung ist drei Tage lang geschlossen.", answer: true, explanation: "Richtig: 12. bis 14. März = 3 Tage. (Correct: 12th to 14th March = 3 days.)" },
      { id: "r1-2", statement: "Der Supermarkt ist wegen einer Feier geschlossen.", answer: false, explanation: "Falsch. Der Supermarkt schließt wegen Umbauarbeiten, nicht wegen einer Feier. (False: it closes for renovation, not a celebration.)" },
      { id: "r1-3", statement: "Klaus ist den ganzen Tag nicht im Büro.", answer: false, explanation: "Falsch. Klaus ist nur bis 14:00 Uhr beim Arzt. (False: Klaus is only at the doctor until 14:00.)" },
      { id: "r1-4", statement: "Wichtige Nachrichten soll man an Frau Becker geben.", answer: true, explanation: "Richtig. Klaus schreibt: Dringende Sachen an Frau Becker weitergeben. (Correct: pass urgent matters to Ms Becker.)" },
      { id: "r1-5", statement: "Lena möchte die Hausaufgaben von Sabine haben.", answer: true, explanation: "Richtig. Lena fragt: Kannst du mir bitte die Hausaufgaben schicken? (Correct: Lena asks Sabine to send her the homework.)" },
    ],
  },
  {
    part: 2, taskLabel: "Aufgabe 2", partLabel: "Lesen · Teil 2",
    type: "matching", points: 5,
    instruction: "Lesen Sie die Anzeigen a bis f und die Aufgaben 6 bis 10. Welche Anzeige passt zu welcher Person? Für eine Aufgabe gibt es keine Lösung. Schreiben Sie in diesem Fall ein X.",
    notices: [
      { label: "a", text: "Sprachschule Sonnenschein\nDeutschkurs A1 — Abendkurs\nDienstag & Donnerstag, 18:30–20:00 Uhr\nNur 12 Teilnehmer pro Kurs!\nTel.: 030 / 44 55 66" },
      { label: "b", text: "Babysitter gesucht\nFür 2 Kinder (3 und 6 Jahre), montags und mittwochs ab 16 Uhr.\nErfahrung mit Kindern erwünscht. Bezahlung: 12 Euro/Std.\nBitte melden: familie.mueller@email.de" },
      { label: "c", text: "Fahrradmarkt\nSamstag, 22. März, 9–14 Uhr\nStadtpark Eingang Ost\nGebrauchte Fahrräder kaufen & verkaufen\nEintritt frei!" },
      { label: "d", text: "Arztpraxis Dr. Hofmann\nMo, Di, Do: 8:00–12:00 und 14:00–17:00 Uhr\nMi, Fr: 8:00–12:00 Uhr\nTermine nur nach Vereinbarung\nTel.: 089 / 22 33 44" },
      { label: "e", text: "Wohnung zu vermieten\n2-Zimmer-Wohnung, 55 m², ruhige Lage\nMiete: 750 Euro + Nebenkosten\nFrei ab 1. April\nTel.: 0176 123 45 67" },
      { label: "f", text: "Volkshochschule — Kochkurs\n»Kochen aus aller Welt«\nJeden Samstag, 10:00–13:00 Uhr\nKursgebühr: 80 Euro (8 Termine)\nAnmeldung: vhs-berlin.de" },
    ],
    questions: [
      { id: "r2-6", statement: "Pedro kommt aus Brasilien und möchte Deutsch lernen. Er arbeitet tagsüber.", answer: "a", explanation: "Anzeige a ist ein Abend-Deutschkurs — perfekt für jemanden, der tagsüber arbeitet. (Ad a is an evening German course.)" },
      { id: "r2-7", statement: "Familie Koch sucht eine neue, kleinere Wohnung für zwei Personen.", answer: "e", explanation: "Anzeige e bietet eine 2-Zimmer-Wohnung zur Miete an. (Ad e offers a 2-room flat for rent.)" },
      { id: "r2-8", statement: "Anna möchte am Wochenende kochen lernen und neue Gerichte ausprobieren.", answer: "f", explanation: "Anzeige f ist ein Kochkurs jeden Samstag. (Ad f is a cooking course every Saturday.)" },
      { id: "r2-9", statement: "Herr Bauer braucht ein günstiges Fahrrad. Er hat am Wochenende Zeit.", answer: "c", explanation: "Anzeige c ist ein Fahrradmarkt am Samstag. (Ad c is a bicycle market on Saturday.)" },
      { id: "r2-10", statement: "Frau Yildiz sucht Arbeit als Sporttrainerin am Nachmittag.", answer: "X", explanation: "Keine der Anzeigen sucht eine Sporttrainerin. (None of the ads seeks a sports trainer.)" },
    ],
  },
  {
    part: 3, taskLabel: "Aufgabe 3", partLabel: "Lesen · Teil 3",
    type: "richtig-falsch", points: 5,
    instruction: "Lesen Sie den Text und die Aufgaben 11 bis 15. Sind die Aussagen richtig oder falsch? Kreuzen Sie an.",
    texts: [{ title: "E-Mail von einer Freundin", body: "Von: sarah.klein@mail.de\nAn: mia.wagner@mail.de\nBetreff: Mein neuer Job!\n\nLiebe Mia,\n\nwie geht es dir? Ich habe tolle Neuigkeiten! Seit letztem Montag arbeite ich in einer neuen Firma. Das Büro ist in der Stadtmitte — nur 10 Minuten mit dem Fahrrad von meiner Wohnung entfernt. Ich fahre also jeden Tag mit dem Rad zur Arbeit.\n\nMeine Kollegen sind sehr nett. Am ersten Tag haben sie mich zum Mittagessen eingeladen. Wir waren in einem italienischen Restaurant — das Essen war fantastisch!\n\nMein Chef heißt Herr Brandt. Er ist streng, aber fair. Die Arbeitszeiten sind von 8 bis 17 Uhr. Am Freitag darf man schon um 15 Uhr nach Hause gehen — das finde ich super!\n\nIch verdiene jetzt mehr Geld als vorher. Deshalb möchte ich im Sommer eine Reise nach Japan machen. Möchtest du mitkommen?\n\nLiebe Grüße,\nSarah" }],
    questions: [
      { id: "r3-11", statement: "Sarah hat seit einer Woche einen neuen Job.", answer: true, explanation: "Richtig. Sarah schreibt: Seit letztem Montag arbeite ich in einer neuen Firma. (Correct.)" },
      { id: "r3-12", statement: "Sarah fährt mit der U-Bahn zur Arbeit.", answer: false, explanation: "Falsch. Sarah fährt mit dem Fahrrad. (False: Sarah cycles to work.)" },
      { id: "r3-13", statement: "Die Kollegen haben Sarah am ersten Tag zum Essen eingeladen.", answer: true, explanation: "Richtig: Am ersten Tag haben sie mich zum Mittagessen eingeladen. (Correct.)" },
      { id: "r3-14", statement: "Am Freitag arbeitet Sarah bis 17 Uhr.", answer: false, explanation: "Falsch. Am Freitag darf sie schon um 15 Uhr nach Hause gehen. (False: she can leave at 15:00 on Fridays.)" },
      { id: "r3-15", statement: "Sarah möchte im Sommer nach Japan reisen.", answer: true, explanation: "Richtig: Deshalb möchte ich im Sommer eine Reise nach Japan machen. (Correct.)" },
    ],
  },
]};

// ─── SET 2 ────────────────────────────────────────────────────────────────────
const set2: ReadingExamSet = { parts: [
  {
    part: 1, taskLabel: "Aufgabe 1", partLabel: "Lesen · Teil 1",
    type: "richtig-falsch", points: 5,
    instruction: "Lesen Sie die Texte und die Aufgaben 1 bis 5. Sind die Aussagen richtig oder falsch? Kreuzen Sie an.",
    texts: [
      { label: "Text A", title: "Aushang im Sportzentrum", body: "Achtung!\n\nDas Schwimmbad ist vom 3. bis 5. November wegen Reinigungsarbeiten geschlossen.\nDie Sauna und das Fitnessstudio sind wie gewohnt geöffnet.\n\nWir freuen uns auf Ihren Besuch!\nIhre Sportzentrum-Leitung" },
      { label: "Text B", title: "Nachricht auf dem Handy", body: "Hi Tom,\nder Zug hat 20 Minuten Verspätung. Ich bin erst um 18:20 Uhr am Bahnhof. Warte bitte auf mich!\n— Julia" },
      { label: "Text C", title: "E-Mail", body: "Hallo Frau Meier,\n\nvielen Dank für Ihr Interesse an unserer Wohnung. Leider haben wir die Wohnung schon vergeben. Wir haben aber eine andere Wohnung im vierten Stock — 3 Zimmer, 70 m², 900 Euro warm. Haben Sie Interesse?\n\nMit freundlichen Grüßen,\nHerr Gruber" },
    ],
    questions: [
      { id: "s2-r1-1", statement: "Das Schwimmbad ist drei Tage lang geschlossen.", answer: true, explanation: "Richtig: 3. bis 5. November = 3 Tage. (Correct: 3 days.)" },
      { id: "s2-r1-2", statement: "Das Fitnessstudio ist auch geschlossen.", answer: false, explanation: "Falsch. Nur das Schwimmbad ist zu, das Fitnessstudio ist offen. (False: only the pool is closed.)" },
      { id: "s2-r1-3", statement: "Julia kommt um 18:00 Uhr am Bahnhof an.", answer: false, explanation: "Falsch. Der Zug hat 20 Minuten Verspätung, also kommt Julia um 18:20 Uhr an. (False: she arrives at 18:20.)" },
      { id: "s2-r1-4", statement: "Tom soll auf Julia warten.", answer: true, explanation: "Richtig. Julia schreibt: Warte bitte auf mich! (Correct: Julia asks Tom to wait.)" },
      { id: "s2-r1-5", statement: "Herr Gruber bietet Frau Meier eine andere Wohnung an.", answer: true, explanation: "Richtig. Er schreibt: Wir haben aber eine andere Wohnung ... Haben Sie Interesse? (Correct: he offers another flat.)" },
    ],
  },
  {
    part: 2, taskLabel: "Aufgabe 2", partLabel: "Lesen · Teil 2",
    type: "matching", points: 5,
    instruction: "Lesen Sie die Anzeigen a bis f und die Aufgaben 6 bis 10. Welche Anzeige passt zu welcher Person? Für eine Aufgabe gibt es keine Lösung. Schreiben Sie in diesem Fall ein X.",
    notices: [
      { label: "a", text: "Musikschule Harmony\nGitarrenunterricht für Erwachsene\nEinzel- und Gruppenunterricht\nAnfänger und Fortgeschrittene willkommen\nInfo: 0178 / 33 44 55" },
      { label: "b", text: "Zimmer zu vermieten\nMöbliertes WG-Zimmer, 18 m²\nNähe Universität, ruhig\n350 Euro/Monat inkl. Nebenkosten\nKontakt: wg-berlin@mail.de" },
      { label: "c", text: "Nachhilfelehrer gesucht\nFür Mathematik, Klasse 8\n2× pro Woche, nachmittags\n15 Euro pro Stunde\nTel.: 030 / 99 88 77" },
      { label: "d", text: "Flohmarkt\nEvery Sunday 8–14 Uhr\nPlatz der Republik\nKleidung, Bücher, Haushaltswaren\nEintritt 1 Euro" },
      { label: "e", text: "Fahrschule Schmidt\nAuto- und Motorradführerschein\nFlexible Fahrstunden\nKompetente Fahrlehrer\nTel.: 089 / 11 22 33" },
      { label: "f", text: "Yogakurs für Anfänger\nJeweils mittwochs 19:00–20:30 Uhr\nKleine Gruppen, max. 10 Personen\nMonatsbeitrag: 45 Euro\nAnmeldung erforderlich" },
    ],
    questions: [
      { id: "s2-r2-6", statement: "Mehmet möchte abends Sport machen und entspannen. Er ist Anfänger.", answer: "f", explanation: "Anzeige f ist ein Yoga-Anfängerkurs mittwochabends. (Ad f is a beginner yoga course on Wednesday evenings.)" },
      { id: "s2-r2-7", statement: "Leon studiert und sucht ein günstiges Zimmer in der Nähe der Uni.", answer: "b", explanation: "Anzeige b ist ein WG-Zimmer nahe der Universität für 350 Euro. (Ad b is a room near the university for 350 euros.)" },
      { id: "s2-r2-8", statement: "Frau Park möchte Auto fahren lernen.", answer: "e", explanation: "Anzeige e ist eine Fahrschule für den Autoführerschein. (Ad e is a driving school.)" },
      { id: "s2-r2-9", statement: "Herr Kaya kann einem Kind bei den Mathe-Hausaufgaben helfen.", answer: "c", explanation: "Anzeige c sucht einen Nachhilfelehrer für Mathematik. (Ad c seeks a maths tutor.)" },
      { id: "s2-r2-10", statement: "Sofia sucht eine Tanzschule für Salsa am Wochenende.", answer: "X", explanation: "Keine der Anzeigen bietet Salsa-Tanzunterricht an. (None of the ads offers salsa dancing.)" },
    ],
  },
  {
    part: 3, taskLabel: "Aufgabe 3", partLabel: "Lesen · Teil 3",
    type: "richtig-falsch", points: 5,
    instruction: "Lesen Sie den Text und die Aufgaben 11 bis 15. Sind die Aussagen richtig oder falsch? Kreuzen Sie an.",
    texts: [{ title: "Nachricht von einem Freund", body: "Von: kai.becker@mail.de\nAn: lukas.braun@mail.de\nBetreff: Meine neue Wohnung!\n\nHallo Lukas,\n\nich habe gute Neuigkeiten: Ich habe endlich eine neue Wohnung gefunden! Sie ist nicht sehr groß — nur 40 Quadratmeter — aber sie liegt sehr zentral, nur 5 Minuten zu Fuß vom Bahnhof.\n\nIch ziehe am 1. Oktober ein. Meine Freundin hilft mir beim Umzug, und mein Bruder bringt seinen Transporter mit. Das ist super!\n\nDie Wohnung hat keinen Balkon, aber es gibt einen kleinen Garten, den alle Mieter benutzen dürfen. Im Sommer kann man dort grillen.\n\nDie Miete ist 620 Euro warm — das ist für die Lage sehr günstig. Ich freue mich sehr auf mein neues Zuhause!\n\nBis bald,\nKai" }],
    questions: [
      { id: "s2-r3-11", statement: "Kais neue Wohnung ist sehr groß.", answer: false, explanation: "Falsch. Die Wohnung ist nur 40 Quadratmeter groß. (False: it is only 40 square metres.)" },
      { id: "s2-r3-12", statement: "Die Wohnung liegt in der Nähe des Bahnhofs.", answer: true, explanation: "Richtig. Sie liegt 5 Minuten zu Fuß vom Bahnhof. (Correct: 5 minutes' walk from the station.)" },
      { id: "s2-r3-13", statement: "Kai zieht alleine um.", answer: false, explanation: "Falsch. Seine Freundin und sein Bruder helfen ihm. (False: his girlfriend and brother help him.)" },
      { id: "s2-r3-14", statement: "Die Wohnung hat einen Balkon.", answer: false, explanation: "Falsch. Die Wohnung hat keinen Balkon, aber einen Garten. (False: no balcony, but there is a garden.)" },
      { id: "s2-r3-15", statement: "Die Miete beträgt 620 Euro inklusive Nebenkosten.", answer: true, explanation: "Richtig. Kai schreibt: Die Miete ist 620 Euro warm. (Correct: 620 euros all-inclusive.)" },
    ],
  },
]};

// ─── SET 3 ────────────────────────────────────────────────────────────────────
const set3: ReadingExamSet = { parts: [
  {
    part: 1, taskLabel: "Aufgabe 1", partLabel: "Lesen · Teil 1",
    type: "richtig-falsch", points: 5,
    instruction: "Lesen Sie die Texte und die Aufgaben 1 bis 5. Sind die Aussagen richtig oder falsch? Kreuzen Sie an.",
    texts: [
      { label: "Text A", title: "Schild an der Tür", body: "Wegen Krankheit heute geschlossen.\nAb Montag wieder geöffnet.\nSprechstunde nur nach telefonischer Vereinbarung.\nTel.: 030 / 22 11 00\n\n— Praxis Dr. Lange" },
      { label: "Text B", title: "Zettel auf dem Kühlschrank", body: "Hallo Max,\n\nbin kurz einkaufen. Bin um 17 Uhr zurück.\nDein Abendessen ist im Ofen. 200 Grad, 20 Minuten.\nBitte ruf Oma an — sie hat zweimal angerufen!\n\nMama" },
      { label: "Text C", title: "Aushang im Deutschkurs", body: "Liebe Kursteilnehmer,\n\nnächste Woche findet unser Kurs ausnahmsweise am Mittwoch statt (nicht am Montag).\nUhrzeit und Raum bleiben gleich: 9 Uhr, Raum 12.\n\nIhre Kursleiterin" },
    ],
    questions: [
      { id: "s3-r1-1", statement: "Die Arztpraxis ist heute geöffnet.", answer: false, explanation: "Falsch. Die Praxis ist heute wegen Krankheit geschlossen. (False: the practice is closed today due to illness.)" },
      { id: "s3-r1-2", statement: "Man braucht einen Termin für die Sprechstunde.", answer: true, explanation: "Richtig. Es steht: Sprechstunde nur nach telefonischer Vereinbarung. (Correct: appointment by phone only.)" },
      { id: "s3-r1-3", statement: "Die Mutter ist bis 17 Uhr weg.", answer: true, explanation: "Richtig. Sie schreibt: Bin um 17 Uhr zurück. (Correct: she is back at 17:00.)" },
      { id: "s3-r1-4", statement: "Max soll seine Oma anrufen.", answer: true, explanation: "Richtig. Die Mutter schreibt: Bitte ruf Oma an. (Correct: call grandma.)" },
      { id: "s3-r1-5", statement: "Der Deutschkurs findet nächste Woche am Montag statt.", answer: false, explanation: "Falsch. Nächste Woche ist der Kurs am Mittwoch, nicht am Montag. (False: next week's class is on Wednesday.)" },
    ],
  },
  {
    part: 2, taskLabel: "Aufgabe 2", partLabel: "Lesen · Teil 2",
    type: "matching", points: 5,
    instruction: "Lesen Sie die Anzeigen a bis f und die Aufgaben 6 bis 10. Welche Anzeige passt zu welcher Person? Für eine Aufgabe gibt es keine Lösung. Schreiben Sie in diesem Fall ein X.",
    notices: [
      { label: "a", text: "Sprachkurs Englisch B1\nMontag & Mittwoch, 18:00–19:30 Uhr\nKleine Gruppen (max. 8 Personen)\nStartkurs: 15. September\nAnmeldung: sprachzentrum.de" },
      { label: "b", text: "Tierheim Berlin sucht Helfer!\nSpazierengehen mit Hunden\nSamstag oder Sonntag, 2–3 Stunden\nKeine Vorkenntnisse nötig\nKontakt: tierheim-berlin.de" },
      { label: "c", text: "Zu verschenken\nKinderbücher und Spielzeug\nAlles in gutem Zustand\nAbholung in Berlin-Mitte\nTel.: 0163 / 55 66 77" },
    ],
    questions: [
      { id: "s3-r2-6", statement: "Ali möchte sein Englisch verbessern. Er hat abends Zeit.", answer: "a", explanation: "Anzeige a ist ein Englischkurs B1 montags und mittwochs abends. (Ad a is an evening English B1 course.)" },
      { id: "s3-r2-7", statement: "Emma liebt Tiere und möchte am Wochenende helfen.", answer: "b", explanation: "Anzeige b sucht Helfer für das Tierheim am Wochenende. (Ad b seeks weekend volunteers for the animal shelter.)" },
      { id: "s3-r2-8", statement: "Frau Schulz hat Kinderbücher und sucht jemanden, der sie haben möchte.", answer: "c", explanation: "Anzeige c verschenkt Kinderbücher und Spielzeug. (Ad c gives away children's books and toys.)" },
      { id: "s3-r2-9", statement: "Herr Wang möchte einen Computerkurs besuchen.", answer: "X", explanation: "Keine Anzeige bietet einen Computerkurs an. (No ad offers a computer course.)" },
      { id: "s3-r2-10", statement: "Sofia sucht Kinderbücher für ihre Tochter und möchte welche kaufen.", answer: "X", explanation: "Die Bücher werden verschenkt, nicht verkauft — aber Sofia möchte kaufen. Das passt nicht. (The books are free, not for sale.)" },
    ],
  },
  {
    part: 3, taskLabel: "Aufgabe 3", partLabel: "Lesen · Teil 3",
    type: "richtig-falsch", points: 5,
    instruction: "Lesen Sie den Text und die Aufgaben 11 bis 15. Sind die Aussagen richtig oder falsch? Kreuzen Sie an.",
    texts: [{ title: "Brief an eine Freundin", body: "Von: nina.wolf@mail.de\nAn: julia.hartmann@mail.de\nBetreff: Unser Urlaub!\n\nLiebe Julia,\n\nwir sind gestern aus dem Urlaub zurückgekommen. Wir waren zwei Wochen in Portugal — es war wunderschön!\n\nWir sind mit dem Flugzeug nach Lissabon geflogen. Das Hotel war direkt am Meer, nur 200 Meter vom Strand entfernt. Jeden Morgen sind wir schwimmen gegangen.\n\nDas Essen in Portugal ist super. Ich habe viel Fisch gegessen — frischen Fisch direkt vom Markt! Mein Mann Paul hat lieber Fleisch gegessen.\n\nLeider war das Wetter nicht immer schön. Am letzten Tag hat es geregnet, und wir konnten nicht an den Strand. Aber insgesamt war es ein toller Urlaub.\n\nKommst du mich bald besuchen? Ich zeige dir die Fotos!\n\nLiebe Grüße,\nNina" }],
    questions: [
      { id: "s3-r3-11", statement: "Nina war drei Wochen in Urlaub.", answer: false, explanation: "Falsch. Nina war zwei Wochen in Portugal. (False: she was on holiday for two weeks.)" },
      { id: "s3-r3-12", statement: "Das Hotel war nah am Meer.", answer: true, explanation: "Richtig. Das Hotel war direkt am Meer, nur 200 Meter vom Strand. (Correct: 200 metres from the beach.)" },
      { id: "s3-r3-13", statement: "Nina hat im Urlaub viel Fisch gegessen.", answer: true, explanation: "Richtig. Nina schreibt: Ich habe viel Fisch gegessen. (Correct.)" },
      { id: "s3-r3-14", statement: "Das Wetter war die ganzen zwei Wochen schön.", answer: false, explanation: "Falsch. Am letzten Tag hat es geregnet. (False: it rained on the last day.)" },
      { id: "s3-r3-15", statement: "Nina möchte Julia die Urlaubsfotos zeigen.", answer: true, explanation: "Richtig. Nina schreibt: Ich zeige dir die Fotos! (Correct.)" },
    ],
  },
]};

// ─── SET 4 ────────────────────────────────────────────────────────────────────
const set4: ReadingExamSet = { parts: [
  {
    part: 1, taskLabel: "Aufgabe 1", partLabel: "Lesen · Teil 1",
    type: "richtig-falsch", points: 5,
    instruction: "Lesen Sie die Texte und die Aufgaben 1 bis 5. Sind die Aussagen richtig oder falsch? Kreuzen Sie an.",
    texts: [
      { label: "Text A", title: "Aushang an der Wohnungstür", body: "Liebe Nachbarn,\n\nam Samstag, 20. April, findet in unserer Wohnung (Nr. 14) eine kleine Geburtstagsfeier statt.\nWir entschuldigen uns für eventuelle Lärm bis ca. 23 Uhr.\n\nVielen Dank für Ihr Verständnis!\nFamilie Brauer" },
      { label: "Text B", title: "SMS-Nachricht", body: "Hi Ben! Ich bin am Bahnhof. Wo bist du? Der Zug fährt in 10 Minuten ab! Beeil dich!\n— Chris" },
      { label: "Text C", title: "Aushang in der Schule", body: "ACHTUNG: Elternabend\nDienstag, 23. April, um 19:00 Uhr\nThema: Schulausflug nach Hamburg im Mai\nBitte kommen Sie alle!\n— Klasse 7b" },
    ],
    questions: [
      { id: "s4-r1-1", statement: "Familie Brauer feiert am Samstag Geburtstag.", answer: true, explanation: "Richtig. Der Aushang kündigt eine Geburtstagsfeier am Samstag an. (Correct: a birthday party on Saturday.)" },
      { id: "s4-r1-2", statement: "Die Feier endet um Mitternacht.", answer: false, explanation: "Falsch. Die Feier endet ca. um 23 Uhr, nicht um Mitternacht. (False: it ends around 23:00, not midnight.)" },
      { id: "s4-r1-3", statement: "Ben ist schon am Bahnhof.", answer: false, explanation: "Falsch. Chris ist am Bahnhof und wartet auf Ben. (False: Chris is at the station, waiting for Ben.)" },
      { id: "s4-r1-4", statement: "Der Zug fährt in 10 Minuten ab.", answer: true, explanation: "Richtig. Chris schreibt: Der Zug fährt in 10 Minuten ab. (Correct.)" },
      { id: "s4-r1-5", statement: "Beim Elternabend geht es um einen Schulausflug.", answer: true, explanation: "Richtig. Das Thema ist: Schulausflug nach Hamburg im Mai. (Correct: the topic is the school trip to Hamburg.)" },
    ],
  },
  {
    part: 2, taskLabel: "Aufgabe 2", partLabel: "Lesen · Teil 2",
    type: "matching", points: 5,
    instruction: "Lesen Sie die Anzeigen a bis f und die Aufgaben 6 bis 10. Welche Anzeige passt zu welcher Person? Für eine Aufgabe gibt es keine Lösung. Schreiben Sie in diesem Fall ein X.",
    notices: [
      { label: "a", text: "Verkaufe Waschmaschine\nBosch, 5 Jahre alt, gut erhalten\nFassungsvermögen 7 kg\nPreis: 150 Euro, VB\nTel.: 0157 / 11 22 33" },
      { label: "b", text: "Deutschkurs B1 — Online\nMontag bis Freitag, 8:00–9:30 Uhr\nZertifikatsvorbereitung\nKosten: 199 Euro/Monat\nwww.deutschonline.de" },
      { label: "c", text: "Zimmer frei!\nIn 3er-WG, 20 m², möbliert\nNähe U-Bahn Stadtmitte\n400 Euro/Monat\nKontakt: wg-anfrage@mail.de" },
      { label: "d", text: "Restaurant Zur Sonne\nMittags-Menü 11–15 Uhr\n2 Gänge für 9,90 Euro\nTäglich frisch gekocht\nReservierung: 030 / 88 77 66" },
      { label: "e", text: "Gitarrenkurs für Kinder\n8–12 Jahre\nSamstags 10:00–11:00 Uhr\nKleine Gruppen (max. 5 Kinder)\nAnmeldung: musikhaus-berlin.de" },
      { label: "f", text: "Nachhilfe — alle Fächer\nErfahrener Lehrer\nEinzelunterricht, flexibel\n20 Euro/Stunde\nTel.: 0176 / 44 55 66" },
    ],
    questions: [
      { id: "s4-r2-6", statement: "Frau Richter möchte mittags günstig essen gehen.", answer: "d", explanation: "Anzeige d bietet ein Mittagsmenü für 9,90 Euro an. (Ad d offers a lunch menu for 9.90 euros.)" },
      { id: "s4-r2-7", statement: "Oliver sucht ein WG-Zimmer, nicht zu weit vom Zentrum.", answer: "c", explanation: "Anzeige c ist ein WG-Zimmer nahe der U-Bahn Stadtmitte. (Ad c is a room near the city centre metro.)" },
      { id: "s4-r2-8", statement: "Herr Kim hat eine alte Waschmaschine und möchte sie verkaufen.", answer: "a", explanation: "Anzeige a verkauft eine gebrauchte Waschmaschine. (Ad a sells a used washing machine.)" },
      { id: "s4-r2-9", statement: "Laras 9-jährige Tochter möchte Gitarre lernen.", answer: "e", explanation: "Anzeige e ist ein Gitarrenkurs für Kinder von 8–12 Jahren. (Ad e is a guitar course for children aged 8–12.)" },
      { id: "s4-r2-10", statement: "Herr Santos sucht einen Schwimmkurs für Erwachsene.", answer: "X", explanation: "Keine Anzeige bietet einen Schwimmkurs an. (No ad offers a swimming course.)" },
    ],
  },
  {
    part: 3, taskLabel: "Aufgabe 3", partLabel: "Lesen · Teil 3",
    type: "richtig-falsch", points: 5,
    instruction: "Lesen Sie den Text und die Aufgaben 11 bis 15. Sind die Aussagen richtig oder falsch? Kreuzen Sie an.",
    texts: [{ title: "E-Mail an einen Freund", body: "Von: ben.keller@mail.de\nAn: jonas.richter@mail.de\nBetreff: Meine Sprachschule\n\nHallo Jonas,\n\nwie geht es dir? Ich lerne jetzt seit drei Monaten Deutsch und es macht mir wirklich Spaß!\n\nIch gehe jeden Montag und Mittwoch in die Sprachschule. Der Unterricht dauert zwei Stunden. Meine Lehrerin heißt Frau König. Sie ist sehr geduldig und erklärt alles sehr gut.\n\nIn der Klasse sind wir 10 Schüler aus verschiedenen Ländern: Japan, Brasilien, Türkei, Spanien und mehr. Wir sprechen im Unterricht nur Deutsch — das ist manchmal schwer, aber sehr effektiv!\n\nNächsten Monat mache ich die A1-Prüfung. Ich lerne jeden Abend eine Stunde. Ich bin ein bisschen nervös, aber auch sehr motiviert.\n\nWünsch mir viel Glück!\nBen" }],
    questions: [
      { id: "s4-r3-11", statement: "Ben lernt seit einem Jahr Deutsch.", answer: false, explanation: "Falsch. Ben lernt seit drei Monaten Deutsch. (False: he has been learning for three months.)" },
      { id: "s4-r3-12", statement: "Ben geht zweimal pro Woche in die Sprachschule.", answer: true, explanation: "Richtig: jeden Montag und Mittwoch = zweimal pro Woche. (Correct: twice a week.)" },
      { id: "s4-r3-13", statement: "Alle Schüler kommen aus dem gleichen Land.", answer: false, explanation: "Falsch. Die Schüler kommen aus verschiedenen Ländern. (False: they come from different countries.)" },
      { id: "s4-r3-14", statement: "Im Unterricht sprechen die Schüler nur Deutsch.", answer: true, explanation: "Richtig. Ben schreibt: Wir sprechen im Unterricht nur Deutsch. (Correct.)" },
      { id: "s4-r3-15", statement: "Ben macht nächsten Monat die A1-Prüfung.", answer: true, explanation: "Richtig. Ben schreibt: Nächsten Monat mache ich die A1-Prüfung. (Correct.)" },
    ],
  },
]};

export const readingExamSets: ReadingExamSet[] = [set1, set2, set3, set4];
export const readingParts = set1.parts; // backward compat
