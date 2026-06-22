export interface ListeningQuestion {
  id: string;
  statement: string;
  options?: string[];
  answer: string;
  explanation?: string;
}

export interface ListeningScript {
  label?: string;
  text: string;
}

export type ListeningPartType = "multiple-choice" | "richtig-falsch";

export interface ListeningPart {
  part: 1 | 2 | 3;
  taskLabel: string;
  partLabel: string;
  instruction: string;
  type: ListeningPartType;
  playsLabel: string;
  youtubeId: string;
  startSeconds: number;
  scripts: ListeningScript[];
  questions: ListeningQuestion[];
  points: number;
}

// ─── SET 1 (original) ────────────────────────────────────────────────────────
const set1: ListeningPart[] = [
  {
    part: 1, taskLabel: "Aufgabe 1", partLabel: "Hören · Teil 1",
    type: "multiple-choice", points: 6,
    playsLabel: "Sie hören jeden Text zweimal.",
    youtubeId: "HaXIutuRCdU", startSeconds: 0,
    instruction: "Sie hören sechs kurze Gespräche. Zu jedem Gespräch gibt es eine Aufgabe. Kreuzen Sie die richtige Antwort an (a, b oder c).",
    scripts: [
      { label: "Gespräch 1 — Im Supermarkt", text: "Verkäufer: Guten Tag! Kann ich Ihnen helfen?\nKundin: Ja, bitte. Wo finde ich den Käse?\nVerkäufer: Der Käse ist in Gang 3, links neben der Milch.\nKundin: Vielen Dank!" },
      { label: "Gespräch 2 — Am Telefon", text: "Frau Bauer: Bauer.\nHerr Klein: Guten Tag, Klein hier. Kann ich bitte Frau Hoffmann sprechen?\nFrau Bauer: Tut mir leid, sie ist nicht da. Kann ich etwas ausrichten?\nHerr Klein: Ja, bitte sagen Sie ihr, ich rufe morgen Vormittag wieder an." },
      { label: "Gespräch 3 — Am Bahnhof", text: "Reisender: Entschuldigung, wann fährt der nächste Zug nach Hamburg?\nMitarbeiterin: Der nächste Zug fährt um 14:32 Uhr von Gleis 5.\nReisender: Und wie lange dauert die Fahrt?\nMitarbeiterin: Ungefähr zwei Stunden." },
      { label: "Gespräch 4 — Im Restaurant", text: "Kellner: Was darf ich Ihnen bringen?\nGast: Ich hätte gern ein Schnitzel mit Pommes und einen Orangensaft, bitte.\nKellner: Möchten Sie auch eine Vorspeise?\nGast: Nein danke, nur die Hauptspeise." },
      { label: "Gespräch 5 — Im Büro", text: "Kollegin A: Wann beginnt die Besprechung heute?\nKollegin B: Um 10 Uhr. Aber Herr Müller kommt erst um halb elf.\nKollegin A: Dann fangen wir ohne ihn an.\nKollegin B: Ja, gut." },
      { label: "Gespräch 6 — Beim Arzt", text: "Arzt: Was fehlt Ihnen denn?\nPatient: Ich habe seit drei Tagen Kopfschmerzen und fühle mich sehr müde.\nArzt: Haben Sie auch Fieber?\nPatient: Ja, gestern Abend hatte ich 38,5 Grad." },
    ],
    questions: [
      { id: "h1-1", statement: "Wo ist der Käse?", options: ["a) Gang 1, rechts neben dem Brot", "b) Gang 3, links neben der Milch", "c) Gang 5, neben dem Ausgang"], answer: "b", explanation: "Der Verkäufer sagt: Gang 3, links neben der Milch. (The salesperson says: aisle 3, to the left of the milk.)" },
      { id: "h1-2", statement: "Was macht Herr Klein?", options: ["a) Er spricht mit Frau Hoffmann.", "b) Er hinterlässt eine Nachricht.", "c) Er kommt später ins Büro."], answer: "b", explanation: "Herr Klein bittet Frau Bauer, auszurichten, dass er morgen Vormittag zurückruft. (He leaves a message saying he will call back tomorrow morning.)" },
      { id: "h1-3", statement: "Wann fährt der Zug nach Hamburg?", options: ["a) Um 13:32 Uhr", "b) Um 14:23 Uhr", "c) Um 14:32 Uhr"], answer: "c", explanation: "Die Mitarbeiterin sagt: Der nächste Zug fährt um 14:32 Uhr. (The next train departs at 14:32.)" },
      { id: "h1-4", statement: "Was bestellt der Gast?", options: ["a) Eine Vorspeise und ein Schnitzel", "b) Ein Schnitzel mit Pommes und einen Orangensaft", "c) Ein Schnitzel und ein Wasser"], answer: "b", explanation: "Der Gast bestellt: ein Schnitzel mit Pommes und einen Orangensaft. (The guest orders schnitzel with chips and an orange juice.)" },
      { id: "h1-5", statement: "Wann beginnt die Besprechung?", options: ["a) Um 9:00 Uhr", "b) Um 10:00 Uhr", "c) Um 10:30 Uhr"], answer: "b", explanation: "Die Besprechung beginnt um 10 Uhr. Herr Müller kommt erst um halb elf, aber man wartet nicht. (The meeting starts at 10:00.)" },
      { id: "h1-6", statement: "Was hat der Patient?", options: ["a) Bauchschmerzen und Fieber", "b) Kopfschmerzen und Fieber", "c) Halsschmerzen und Müdigkeit"], answer: "b", explanation: "Der Patient sagt: Kopfschmerzen, Müdigkeit, und gestern Abend 38,5 Grad Fieber. (The patient reports headache, tiredness, and a fever of 38.5°C.)" },
    ],
  },
  {
    part: 2, taskLabel: "Aufgabe 2", partLabel: "Hören · Teil 2",
    type: "richtig-falsch", points: 4,
    playsLabel: "Sie hören jeden Text einmal.",
    youtubeId: "HaXIutuRCdU", startSeconds: 60,
    instruction: "Sie hören vier Ansagen. Zu jeder Ansage gibt es eine Aufgabe. Sind die Aussagen richtig oder falsch? Kreuzen Sie an.",
    scripts: [
      { label: "Ansage 1 — Bahnhof", text: "Achtung! Der Intercity-Zug nach München, Abfahrt 14:32 Uhr, fährt heute von Gleis 7 ab. Bitte beachten Sie: Der Zug hat 10 Minuten Verspätung. Vielen Dank für Ihre Geduld." },
      { label: "Ansage 2 — Kaufhaus", text: "Sehr geehrte Damen und Herren, unser Kaufhaus schließt heute Abend ausnahmsweise bereits um 19 Uhr — eine Stunde früher als gewöhnlich. Wir bedanken uns für Ihr Verständnis." },
      { label: "Ansage 3 — Schwimmbad", text: "Achtung, werte Badegäste! Das Hallenbad ist am kommenden Samstag wegen einer Schulveranstaltung für die Öffentlichkeit geschlossen. Ab Sonntag sind wir wieder geöffnet." },
      { label: "Ansage 4 — Flughafen", text: "Aufruf für Herrn Thomas Fischer: Bitte kommen Sie umgehend zu Schalter 12 in der Abflughalle. Ihr Flug nach Wien startet in 20 Minuten." },
    ],
    questions: [
      { id: "h2-7", statement: "Der Zug nach München fährt von Gleis 7 ab.", answer: "richtig", explanation: "Richtig. Die Ansage sagt: Der Zug fährt heute von Gleis 7 ab. (Correct: the train departs from platform 7 today.)" },
      { id: "h2-8", statement: "Das Kaufhaus schließt heute zwei Stunden früher als normal.", answer: "falsch", explanation: "Falsch. Das Kaufhaus schließt nur eine Stunde früher (um 19 Uhr statt 20 Uhr). (False: it closes only one hour early.)" },
      { id: "h2-9", statement: "Das Hallenbad ist am Samstag wegen einer Schulveranstaltung geschlossen.", answer: "richtig", explanation: "Richtig. Die Ansage sagt genau das. (Correct: the announcement states exactly this.)" },
      { id: "h2-10", statement: "Herr Fischer soll sofort zum Flugzeug gehen.", answer: "falsch", explanation: "Falsch. Herr Fischer soll zu Schalter 12 in der Abflughalle gehen, nicht direkt zum Flugzeug. (False: he is called to counter 12, not directly to the aircraft.)" },
    ],
  },
  {
    part: 3, taskLabel: "Aufgabe 3", partLabel: "Hören · Teil 3",
    type: "multiple-choice", points: 5,
    playsLabel: "Sie hören jeden Text zweimal.",
    youtubeId: "HaXIutuRCdU", startSeconds: 130,
    instruction: "Sie hören fünf Ansagen auf dem Anrufbeantworter. Zu jeder Ansage gibt es eine Aufgabe. Kreuzen Sie die richtige Antwort an (a, b oder c).",
    scripts: [
      { label: "Nachricht 1", text: "Hallo Lisa, hier ist Tanja. Ich wollte fragen, ob wir uns morgen zum Kaffee treffen können. Ich bin ab 15 Uhr frei. Ruf mich bitte zurück!" },
      { label: "Nachricht 2", text: "Guten Tag, hier spricht das Reisebüro Sonnenschein. Ihre Reise nach Spanien ist gebucht. Bitte kommen Sie bis Freitag vorbei, um Ihre Reiseunterlagen abzuholen." },
      { label: "Nachricht 3", text: "Hallo, ich bin's, Mama. Ich rufe an, weil du deinen Schal hier vergessen hast. Ich kann ihn dir am Wochenende vorbeibringen. Bis dann!" },
      { label: "Nachricht 4", text: "Guten Tag, hier ist die Arztpraxis Dr. Meyer. Wir müssen Ihren Termin am Dienstag leider verschieben. Bitte rufen Sie uns an, damit wir einen neuen Termin vereinbaren können." },
      { label: "Nachricht 5", text: "Hi Marco, hier ist Stefan. Das Fußballspiel am Samstag beginnt nicht um 15 Uhr, sondern um 16:30 Uhr. Komm bitte nicht zu früh! Wir treffen uns vor dem Stadion." },
    ],
    questions: [
      { id: "h3-11", statement: "Tanja möchte sich mit Lisa ...", options: ["a) heute zum Kaffee treffen.", "b) morgen ab 15 Uhr treffen.", "c) am Wochenende treffen."], answer: "b", explanation: "Tanja sagt: morgen ab 15 Uhr bin ich frei. (Tanja says she is free tomorrow from 15:00.)" },
      { id: "h3-12", statement: "Lisa soll ins Reisebüro kommen, um ...", options: ["a) eine Reise zu buchen.", "b) ihre Reiseunterlagen abzuholen.", "c) ihren Flug zu bezahlen."], answer: "b", explanation: "Das Reisebüro sagt: kommen Sie vorbei, um Ihre Reiseunterlagen abzuholen. (Come to collect your travel documents.)" },
      { id: "h3-13", statement: "Die Mutter ruft an, weil ...", options: ["a) sie krank ist.", "b) Lisa etwas vergessen hat.", "c) sie am Wochenende kommt."], answer: "b", explanation: "Die Mutter sagt: du hast deinen Schal hier vergessen. (You forgot your scarf here.)" },
      { id: "h3-14", statement: "Der Termin beim Arzt ...", options: ["a) ist am Dienstag bestätigt.", "b) muss neu vereinbart werden.", "c) findet am Mittwoch statt."], answer: "b", explanation: "Die Praxis sagt: Der Termin muss verschoben werden — bitte anrufen. (The appointment must be rescheduled.)" },
      { id: "h3-15", statement: "Das Fußballspiel beginnt um ...", options: ["a) 15:00 Uhr.", "b) 15:30 Uhr.", "c) 16:30 Uhr."], answer: "c", explanation: "Stefan sagt: Das Spiel beginnt nicht um 15 Uhr, sondern um 16:30 Uhr. (The game starts at 16:30, not 15:00.)" },
    ],
  },
];

// ─── SET 2 ────────────────────────────────────────────────────────────────────
const set2: ListeningPart[] = [
  {
    part: 1, taskLabel: "Aufgabe 1", partLabel: "Hören · Teil 1",
    type: "multiple-choice", points: 6,
    playsLabel: "Sie hören jeden Text zweimal.",
    youtubeId: "HaXIutuRCdU", startSeconds: 0,
    instruction: "Sie hören sechs kurze Gespräche. Zu jedem Gespräch gibt es eine Aufgabe. Kreuzen Sie die richtige Antwort an (a, b oder c).",
    scripts: [
      { label: "Gespräch 1 — Im Café", text: "Kellnerin: Guten Morgen! Was darf es sein?\nKunde: Einen Kaffee und ein Croissant, bitte.\nKellnerin: Mit Milch und Zucker?\nKunde: Nur mit Milch, bitte. Keinen Zucker." },
      { label: "Gespräch 2 — Im Hotel", text: "Rezeptionistin: Guten Abend, willkommen im Hotel Stern!\nGast: Guten Abend. Ich habe eine Reservierung. Mein Name ist Weber.\nRezeptionistin: Ja, Herr Weber. Zimmer 205, zweiter Stock. Das Frühstück ist von 7 bis 10 Uhr.\nGast: Danke schön." },
      { label: "Gespräch 3 — Beim Friseur", text: "Friseurin: Was möchten Sie heute machen lassen?\nKundin: Nur schneiden, bitte. Nicht zu kurz.\nFriseurin: Wie viel soll ich abschneiden?\nKundin: Ungefähr fünf Zentimeter." },
      { label: "Gespräch 4 — In der Apotheke", text: "Apothekerin: Kann ich Ihnen helfen?\nPatient: Ja, ich brauche etwas gegen Kopfschmerzen.\nApothekerin: Haben Sie eine Allergie gegen Aspirin?\nPatient: Nein, keine Allergie." },
      { label: "Gespräch 5 — Auf dem Markt", text: "Händlerin: Guten Tag! Was hätten Sie gern?\nKäufer: Ein Kilo Äpfel und 500 Gramm Tomaten, bitte.\nHändlerin: Die Äpfel kosten 2 Euro das Kilo. Die Tomaten 1,50 Euro.\nKäufer: Gut, ich nehme beides." },
      { label: "Gespräch 6 — An der Kasse", text: "Kassierer: Das macht 18 Euro 50, bitte.\nKundin: Hier sind 20 Euro.\nKassierer: Und 1 Euro 50 zurück. Haben Sie eine Kundenkarte?\nKundin: Nein, leider nicht." },
    ],
    questions: [
      { id: "s2-h1-1", statement: "Der Kunde möchte seinen Kaffee ...", options: ["a) mit Milch und Zucker.", "b) nur mit Milch.", "c) schwarz ohne Milch."], answer: "b", explanation: "Der Kunde sagt: Nur mit Milch, bitte. Keinen Zucker. (The customer says: only with milk, no sugar.)" },
      { id: "s2-h1-2", statement: "Das Frühstück im Hotel ist ...", options: ["a) von 6 bis 9 Uhr.", "b) von 7 bis 10 Uhr.", "c) von 8 bis 11 Uhr."], answer: "b", explanation: "Die Rezeptionistin sagt: Das Frühstück ist von 7 bis 10 Uhr. (Breakfast is from 7 to 10 o'clock.)" },
      { id: "s2-h1-3", statement: "Die Kundin möchte beim Friseur ...", options: ["a) die Haare färben.", "b) die Haare sehr kurz schneiden.", "c) ungefähr 5 cm abschneiden."], answer: "c", explanation: "Die Kundin sagt: Ungefähr fünf Zentimeter. (About five centimetres.)" },
      { id: "s2-h1-4", statement: "Der Patient braucht Medikamente gegen ...", options: ["a) Bauchschmerzen.", "b) Kopfschmerzen.", "c) Halsschmerzen."], answer: "b", explanation: "Der Patient sagt: ich brauche etwas gegen Kopfschmerzen. (He needs something for a headache.)" },
      { id: "s2-h1-5", statement: "Der Käufer kauft auf dem Markt ...", options: ["a) nur Äpfel.", "b) Tomaten und Kartoffeln.", "c) Äpfel und Tomaten."], answer: "c", explanation: "Der Käufer bestellt: Ein Kilo Äpfel und 500 Gramm Tomaten. (He orders apples and tomatoes.)" },
      { id: "s2-h1-6", statement: "Die Kundin bezahlt ...", options: ["a) genau 18,50 Euro.", "b) 20 Euro und bekommt Wechselgeld.", "c) mit Kreditkarte."], answer: "b", explanation: "Die Kundin gibt 20 Euro und bekommt 1,50 Euro zurück. (She pays with 20 euros and gets 1.50 euros change.)" },
    ],
  },
  {
    part: 2, taskLabel: "Aufgabe 2", partLabel: "Hören · Teil 2",
    type: "richtig-falsch", points: 4,
    playsLabel: "Sie hören jeden Text einmal.",
    youtubeId: "HaXIutuRCdU", startSeconds: 60,
    instruction: "Sie hören vier Ansagen. Zu jeder Ansage gibt es eine Aufgabe. Sind die Aussagen richtig oder falsch? Kreuzen Sie an.",
    scripts: [
      { label: "Ansage 1 — Bibliothek", text: "Sehr geehrte Besucher, die Stadtbibliothek schließt heute wegen einer Veranstaltung bereits um 17 Uhr. Morgen sind wir wieder zu den normalen Zeiten geöffnet: 9 bis 20 Uhr. Wir bitten um Verständnis." },
      { label: "Ansage 2 — Supermarkt", text: "Achtung, liebe Kunden! Heute haben wir ein besonderes Angebot: Alle Milchprodukte sind 20 Prozent günstiger. Das Angebot gilt nur heute bis Ladenschluss um 21 Uhr." },
      { label: "Ansage 3 — Museum", text: "Das Stadtmuseum ist dienstags geschlossen. Von Mittwoch bis Sonntag sind wir von 10 bis 18 Uhr für Sie da. Der Eintritt für Kinder unter 14 Jahren ist kostenlos." },
      { label: "Ansage 4 — Bushaltestelle", text: "Achtung, Fahrgäste! Die Linie 42 fährt heute wegen Straßenarbeiten nicht über die Hauptstraße. Bitte nutzen Sie die Haltestelle Parkstraße als Ersatz. Wir bitten um Entschuldigung." },
    ],
    questions: [
      { id: "s2-h2-7", statement: "Die Bibliothek schließt heute um 17 Uhr.", answer: "richtig", explanation: "Richtig. Die Ansage sagt: die Stadtbibliothek schließt heute bereits um 17 Uhr. (Correct: the library closes at 17:00 today.)" },
      { id: "s2-h2-8", statement: "Das Angebot im Supermarkt gilt für alle Produkte.", answer: "falsch", explanation: "Falsch. Nur Milchprodukte sind 20% günstiger, nicht alle Produkte. (False: only dairy products are discounted.)" },
      { id: "s2-h2-9", statement: "Das Museum ist montags und dienstags geschlossen.", answer: "falsch", explanation: "Falsch. Nur dienstags ist das Museum geschlossen, nicht montags. (False: only on Tuesdays, not Mondays.)" },
      { id: "s2-h2-10", statement: "Der Bus fährt heute eine andere Route.", answer: "richtig", explanation: "Richtig. Die Linie 42 fährt wegen Straßenarbeiten eine andere Strecke. (Correct: bus 42 takes an alternative route due to road works.)" },
    ],
  },
  {
    part: 3, taskLabel: "Aufgabe 3", partLabel: "Hören · Teil 3",
    type: "multiple-choice", points: 5,
    playsLabel: "Sie hören jeden Text zweimal.",
    youtubeId: "HaXIutuRCdU", startSeconds: 130,
    instruction: "Sie hören fünf Ansagen auf dem Anrufbeantworter. Zu jeder Ansage gibt es eine Aufgabe. Kreuzen Sie die richtige Antwort an (a, b oder c).",
    scripts: [
      { label: "Nachricht 1", text: "Hallo Jana, hier ist Sabine. Ich mache am Freitag eine kleine Party. Kannst du kommen? Bitte bring etwas zu essen mit. Ruf mich an!" },
      { label: "Nachricht 2", text: "Guten Tag, hier ist die Zahnarztpraxis Dr. Vogel. Ihr Termin am Montag um 10 Uhr ist bestätigt. Bitte kommen Sie fünf Minuten früher. Auf Wiederhören." },
      { label: "Nachricht 3", text: "Hallo, ich bin's, dein Bruder Tom. Ich bin nächste Woche in Berlin und möchte dich besuchen. Bist du am Mittwoch zu Hause? Schreib mir eine Nachricht." },
      { label: "Nachricht 4", text: "Guten Tag, hier spricht Herr Schneider von der Firma Elektro Plus. Ihr Kühlschrank ist repariert und kann abgeholt werden. Wir haben montags bis freitags von 9 bis 17 Uhr geöffnet." },
      { label: "Nachricht 5", text: "Hi Lena, hier ist Maria. Der Deutschkurs beginnt diese Woche nicht am Montag, sondern am Dienstag um 18 Uhr. Bitte vergiss das Lehrbuch nicht!" },
    ],
    questions: [
      { id: "s2-h3-11", statement: "Sabines Party ist ...", options: ["a) am Mittwoch.", "b) am Freitag.", "c) am Samstag."], answer: "b", explanation: "Sabine sagt: Ich mache am Freitag eine kleine Party. (Sabine says the party is on Friday.)" },
      { id: "s2-h3-12", statement: "Der Zahnarzttermin ist ...", options: ["a) am Montag um 9 Uhr.", "b) am Montag um 10 Uhr.", "c) am Dienstag um 10 Uhr."], answer: "b", explanation: "Die Praxis sagt: Ihr Termin am Montag um 10 Uhr ist bestätigt. (Your appointment on Monday at 10 is confirmed.)" },
      { id: "s2-h3-13", statement: "Tom möchte wissen, ob ...", options: ["a) man ihn in Hamburg besuchen kann.", "b) die Person am Mittwoch zu Hause ist.", "c) die Person am Dienstag Zeit hat."], answer: "b", explanation: "Tom fragt: Bist du am Mittwoch zu Hause? (Tom asks: are you at home on Wednesday?)" },
      { id: "s2-h3-14", statement: "Der Kühlschrank ...", options: ["a) ist noch nicht repariert.", "b) kann abgeholt werden.", "c) wird am Montag geliefert."], answer: "b", explanation: "Herr Schneider sagt: Ihr Kühlschrank ist repariert und kann abgeholt werden. (Your fridge is repaired and can be collected.)" },
      { id: "s2-h3-15", statement: "Der Deutschkurs beginnt diese Woche ...", options: ["a) am Montag.", "b) am Dienstag.", "c) am Mittwoch."], answer: "b", explanation: "Maria sagt: Der Kurs beginnt diese Woche nicht am Montag, sondern am Dienstag. (The course starts on Tuesday this week.)" },
    ],
  },
];

// ─── SET 3 ────────────────────────────────────────────────────────────────────
const set3: ListeningPart[] = [
  {
    part: 1, taskLabel: "Aufgabe 1", partLabel: "Hören · Teil 1",
    type: "multiple-choice", points: 6,
    playsLabel: "Sie hören jeden Text zweimal.",
    youtubeId: "HaXIutuRCdU", startSeconds: 0,
    instruction: "Sie hören sechs kurze Gespräche. Zu jedem Gespräch gibt es eine Aufgabe. Kreuzen Sie die richtige Antwort an (a, b oder c).",
    scripts: [
      { label: "Gespräch 1 — Im Kino", text: "Kassiererin: Guten Abend! Für welchen Film?\nBesucher: Einmal für den neuen Film um 20 Uhr, bitte.\nKassiererin: Mit Studierendenrabatt?\nBesucher: Nein, normal bitte. Hier ist meine Karte." },
      { label: "Gespräch 2 — An der Post", text: "Postbeamter: Guten Tag, was kann ich für Sie tun?\nKundin: Ich möchte dieses Paket nach Polen schicken.\nPostbeamter: Wie schwer ist es?\nKundin: Ungefähr drei Kilogramm." },
      { label: "Gespräch 3 — Im Fitnessstudio", text: "Mitarbeiterin: Willkommen! Sind Sie schon Mitglied?\nNeuling: Nein, ich möchte mich gerne anmelden.\nMitarbeiterin: Für wie lange? Einen Monat oder ein Jahr?\nNeuling: Erstmal nur einen Monat, bitte." },
      { label: "Gespräch 4 — Im Reisebüro", text: "Beraterin: Guten Tag! Wohin möchten Sie reisen?\nKunde: Nach Italien, am liebsten im Juli.\nBeraterin: Zwei Wochen oder länger?\nKunde: Genau zwei Wochen wären ideal." },
      { label: "Gespräch 5 — Beim Bäcker", text: "Bäckerin: Guten Morgen! Was hätten Sie gern?\nKunde: Vier Brötchen und ein Roggenbrot, bitte.\nBäckerin: Möchten Sie die Brötchen aufgewärmt?\nKunde: Nein danke, so ist es gut." },
      { label: "Gespräch 6 — Im Deutschkurs", text: "Lehrerin: Hat jemand die Hausaufgabe nicht gemacht?\nSchüler: Entschuldigung, ich hatte leider keine Zeit.\nLehrerin: Das ist das zweite Mal diese Woche.\nSchüler: Es tut mir sehr leid. Das passiert nicht mehr." },
    ],
    questions: [
      { id: "s3-h1-1", statement: "Der Besucher kauft eine Kinokarte ...", options: ["a) mit Rabatt für Studenten.", "b) zum normalen Preis.", "c) für einen Film um 21 Uhr."], answer: "b", explanation: "Der Besucher sagt: Nein, normal bitte. (He says: no, normal price please.)" },
      { id: "s3-h1-2", statement: "Das Paket wiegt ...", options: ["a) ungefähr 1 Kilogramm.", "b) ungefähr 3 Kilogramm.", "c) genau 5 Kilogramm."], answer: "b", explanation: "Die Kundin sagt: Ungefähr drei Kilogramm. (Approximately three kilograms.)" },
      { id: "s3-h1-3", statement: "Der Neuling möchte sich ...", options: ["a) für ein Jahr anmelden.", "b) für einen Monat anmelden.", "c) nur einmal das Studio anschauen."], answer: "b", explanation: "Er sagt: Erstmal nur einen Monat, bitte. (Just one month for now, please.)" },
      { id: "s3-h1-4", statement: "Der Kunde möchte nach Italien reisen ...", options: ["a) im Juni für eine Woche.", "b) im Juli für zwei Wochen.", "c) im August für drei Wochen."], answer: "b", explanation: "Der Kunde sagt: nach Italien, am liebsten im Juli, und genau zwei Wochen. (Italy, preferably in July, for exactly two weeks.)" },
      { id: "s3-h1-5", statement: "Der Kunde kauft beim Bäcker ...", options: ["a) vier Brötchen und ein Weißbrot.", "b) vier Brötchen und ein Roggenbrot.", "c) zwei Brötchen und ein Roggenbrot."], answer: "b", explanation: "Der Kunde sagt: Vier Brötchen und ein Roggenbrot, bitte. (Four rolls and a rye bread, please.)" },
      { id: "s3-h1-6", statement: "Der Schüler hat die Hausaufgabe ...", options: ["a) gemacht aber vergessen.", "b) nicht gemacht.", "c) zu spät abgegeben."], answer: "b", explanation: "Der Schüler sagt: ich hatte leider keine Zeit — er hat sie nicht gemacht. (He did not do it as he had no time.)" },
    ],
  },
  {
    part: 2, taskLabel: "Aufgabe 2", partLabel: "Hören · Teil 2",
    type: "richtig-falsch", points: 4,
    playsLabel: "Sie hören jeden Text einmal.",
    youtubeId: "HaXIutuRCdU", startSeconds: 60,
    instruction: "Sie hören vier Ansagen. Zu jeder Ansage gibt es eine Aufgabe. Sind die Aussagen richtig oder falsch? Kreuzen Sie an.",
    scripts: [
      { label: "Ansage 1 — Zoo", text: "Willkommen im Berliner Zoo! Heute findet um 14 Uhr eine Fütterung der Löwen statt. Bitte kommen Sie rechtzeitig zu dem Bereich C. Für Kinder unter 6 Jahren ist der Eintritt gratis." },
      { label: "Ansage 2 — Konzert", text: "Sehr geehrte Konzertbesucher, das heutige Konzert beginnt aus technischen Gründen 30 Minuten später als geplant — also um 20:30 Uhr statt um 20:00 Uhr. Bitte bewahren Sie Ihre Plätze." },
      { label: "Ansage 3 — Einkaufszentrum", text: "Liebe Kunden, unser Einkaufszentrum ist montags bis samstags von 9 bis 21 Uhr geöffnet. Sonntags bleiben wir geschlossen. Unser Kundenparkplatz steht Ihnen kostenlos zur Verfügung." },
      { label: "Ansage 4 — Stadtbus", text: "Achtung! Der Bus der Linie 7 hat heute circa 15 Minuten Verspätung. Grund ist ein Unfall auf der Berliner Allee. Wir bitten alle Fahrgäste um Geduld. Vielen Dank." },
    ],
    questions: [
      { id: "s3-h2-7", statement: "Die Löwenfütterung findet um 14 Uhr in Bereich C statt.", answer: "richtig", explanation: "Richtig. Die Ansage sagt genau das. (Correct: the lion feeding is at 14:00 in area C.)" },
      { id: "s3-h2-8", statement: "Das Konzert beginnt eine Stunde später als geplant.", answer: "falsch", explanation: "Falsch. Das Konzert beginnt nur 30 Minuten später (um 20:30 statt 20:00). (False: it starts 30 minutes late, not one hour.)" },
      { id: "s3-h2-9", statement: "Das Einkaufszentrum ist auch sonntags geöffnet.", answer: "falsch", explanation: "Falsch. Sonntags bleibt das Einkaufszentrum geschlossen. (False: it is closed on Sundays.)" },
      { id: "s3-h2-10", statement: "Der Bus hat wegen eines Unfalls Verspätung.", answer: "richtig", explanation: "Richtig. Die Ansage nennt einen Unfall als Grund für die Verspätung. (Correct: an accident is the reason for the delay.)" },
    ],
  },
  {
    part: 3, taskLabel: "Aufgabe 3", partLabel: "Hören · Teil 3",
    type: "multiple-choice", points: 5,
    playsLabel: "Sie hören jeden Text zweimal.",
    youtubeId: "HaXIutuRCdU", startSeconds: 130,
    instruction: "Sie hören fünf Ansagen auf dem Anrufbeantworter. Zu jeder Ansage gibt es eine Aufgabe. Kreuzen Sie die richtige Antwort an (a, b oder c).",
    scripts: [
      { label: "Nachricht 1", text: "Hallo Peter, hier ist Kai. Wir gehen heute Abend ins Kino. Der Film beginnt um 19:30 Uhr. Treffen wir uns um 19 Uhr vor dem Kino?" },
      { label: "Nachricht 2", text: "Guten Tag, hier ist der Sportverein Germania. Ihre Anmeldung zum Schwimmkurs wurde bestätigt. Der Kurs beginnt am nächsten Montag um 18 Uhr in der Schwimmhalle Nord." },
      { label: "Nachricht 3", text: "Hallo, ich bin's, deine Tante Helga. Ich besuche dich am Wochenende. Ich komme am Samstag mit dem Zug an — um 11 Uhr 15 am Hauptbahnhof. Kannst du mich abholen?" },
      { label: "Nachricht 4", text: "Guten Tag, hier ist das Hotel am See. Wir bestätigen Ihre Reservierung für zwei Nächte vom 15. bis 17. Juli. Bitte melden Sie sich bis 18 Uhr an der Rezeption an." },
      { label: "Nachricht 5", text: "Hi Laura, hier ist dein Klassenkamerad Ben. Wir müssen unser Schulprojekt bis Freitag fertig haben. Können wir uns morgen Nachmittag treffen und zusammenarbeiten?" },
    ],
    questions: [
      { id: "s3-h3-11", statement: "Kai und Peter treffen sich ...", options: ["a) um 19:30 Uhr im Kino.", "b) um 19 Uhr vor dem Kino.", "c) um 20 Uhr im Café."], answer: "b", explanation: "Kai schlägt vor: Treffen wir uns um 19 Uhr vor dem Kino. (Let's meet at 19:00 in front of the cinema.)" },
      { id: "s3-h3-12", statement: "Der Schwimmkurs beginnt ...", options: ["a) am Montag um 17 Uhr.", "b) am Montag um 18 Uhr.", "c) am Dienstag um 18 Uhr."], answer: "b", explanation: "Der Verein sagt: Der Kurs beginnt am nächsten Montag um 18 Uhr. (The course starts next Monday at 18:00.)" },
      { id: "s3-h3-13", statement: "Tante Helga kommt ...", options: ["a) am Freitag am Hauptbahnhof an.", "b) am Samstag um 11:15 Uhr an.", "c) am Sonntag mit dem Bus."], answer: "b", explanation: "Tante Helga sagt: Ich komme am Samstag — um 11 Uhr 15 am Hauptbahnhof. (She arrives on Saturday at 11:15 at the main station.)" },
      { id: "s3-h3-14", statement: "Das Hotel erwartet den Gast ...", options: ["a) vom 14. bis 16. Juli.", "b) vom 15. bis 17. Juli.", "c) vom 16. bis 18. Juli."], answer: "b", explanation: "Das Hotel bestätigt: zwei Nächte vom 15. bis 17. Juli. (Two nights from 15th to 17th July.)" },
      { id: "s3-h3-15", statement: "Ben und Laura wollen ...", options: ["a) das Projekt allein machen.", "b) sich morgen Nachmittag treffen.", "c) sich am Freitag in der Schule treffen."], answer: "b", explanation: "Ben fragt: Können wir uns morgen Nachmittag treffen und zusammenarbeiten? (Can we meet tomorrow afternoon to work together?)" },
    ],
  },
];

// ─── SET 4 ────────────────────────────────────────────────────────────────────
const set4: ListeningPart[] = [
  {
    part: 1, taskLabel: "Aufgabe 1", partLabel: "Hören · Teil 1",
    type: "multiple-choice", points: 6,
    playsLabel: "Sie hören jeden Text zweimal.",
    youtubeId: "HaXIutuRCdU", startSeconds: 0,
    instruction: "Sie hören sechs kurze Gespräche. Zu jedem Gespräch gibt es eine Aufgabe. Kreuzen Sie die richtige Antwort an (a, b oder c).",
    scripts: [
      { label: "Gespräch 1 — Im Zug", text: "Schaffner: Guten Tag, Ihre Fahrkarte bitte.\nReisende: Hier bitte. Ich fahre nach Frankfurt.\nSchaffner: Das ist der falsche Zug. Sie müssen in Mannheim umsteigen.\nReisende: Oh, das wusste ich nicht. Danke!" },
      { label: "Gespräch 2 — Am Telefon", text: "Petra: Hallo?\nMarkus: Hallo Petra, hier ist Markus. Haben wir heute um 3 Uhr ein Treffen?\nPetra: Nein, das Treffen ist erst um 4 Uhr. Du hast eine Stunde mehr Zeit.\nMarkus: Super, danke für die Information!" },
      { label: "Gespräch 3 — Im Sportverein", text: "Trainerin: Möchten Sie sich heute anmelden?\nInteressent: Ja, gern. Was kostet die Mitgliedschaft?\nTrainerin: 30 Euro pro Monat, oder 300 Euro für ein ganzes Jahr.\nInteressent: Dann nehme ich das Jahresabo." },
      { label: "Gespräch 4 — Im Deutschkurs", text: "Lehrerin: Die nächste Prüfung ist am 15. März.\nSchülerin: Welche Themen kommen dran?\nLehrerin: Grammatik, Lesen und Hören. Kein Schreiben.\nSchülerin: Oh gut, Schreiben ist mein schwächstes Fach." },
      { label: "Gespräch 5 — Im Kaufhaus", text: "Kundin: Entschuldigung, wo finde ich die Sportkleidung?\nVerkäufer: Im dritten Stock, gleich neben der Rolltreppe.\nKundin: Und wo ist die Rolltreppe?\nVerkäufer: Geradeaus und dann links." },
      { label: "Gespräch 6 — Im Kindergarten", text: "Erzieherin: Guten Morgen! Tim ist heute sehr müde.\nMutter: Ja, er hat gestern nicht gut geschlafen.\nErzieherin: Kein Problem. Wir passen gut auf ihn auf.\nMutter: Danke. Ich hole ihn um 15 Uhr ab." },
    ],
    questions: [
      { id: "s4-h1-1", statement: "Die Reisende muss ...", options: ["a) direkt nach Frankfurt fahren.", "b) in Mannheim umsteigen.", "c) in München aussteigen."], answer: "b", explanation: "Der Schaffner sagt: Sie müssen in Mannheim umsteigen. (You need to change trains in Mannheim.)" },
      { id: "s4-h1-2", statement: "Das Treffen ist ...", options: ["a) um 15 Uhr.", "b) um 16 Uhr.", "c) um 17 Uhr."], answer: "b", explanation: "Petra sagt: das Treffen ist erst um 4 Uhr (= 16 Uhr). (The meeting is at 4 o'clock, not 3.)" },
      { id: "s4-h1-3", statement: "Der Interessent wählt ...", options: ["a) die Monatsmitgliedschaft für 30 Euro.", "b) das Jahresabo.", "c) eine Probestunde."], answer: "b", explanation: "Er sagt: Dann nehme ich das Jahresabo. (He chooses the annual subscription.)" },
      { id: "s4-h1-4", statement: "Die Prüfung enthält kein ...", options: ["a) Hören.", "b) Schreiben.", "c) Lesen."], answer: "b", explanation: "Die Lehrerin sagt: Grammatik, Lesen und Hören. Kein Schreiben. (No writing section.)" },
      { id: "s4-h1-5", statement: "Die Sportkleidung ist ...", options: ["a) im zweiten Stock.", "b) im dritten Stock neben der Rolltreppe.", "c) im Erdgeschoss."], answer: "b", explanation: "Der Verkäufer sagt: Im dritten Stock, gleich neben der Rolltreppe. (Third floor, next to the escalator.)" },
      { id: "s4-h1-6", statement: "Die Mutter holt Tim ab ...", options: ["a) um 14 Uhr.", "b) um 15 Uhr.", "c) um 16 Uhr."], answer: "b", explanation: "Die Mutter sagt: Ich hole ihn um 15 Uhr ab. (She will pick him up at 15:00.)" },
    ],
  },
  {
    part: 2, taskLabel: "Aufgabe 2", partLabel: "Hören · Teil 2",
    type: "richtig-falsch", points: 4,
    playsLabel: "Sie hören jeden Text einmal.",
    youtubeId: "HaXIutuRCdU", startSeconds: 60,
    instruction: "Sie hören vier Ansagen. Zu jeder Ansage gibt es eine Aufgabe. Sind die Aussagen richtig oder falsch? Kreuzen Sie an.",
    scripts: [
      { label: "Ansage 1 — Krankenhaus", text: "Sehr geehrte Besucher, die Besuchszeiten im Krankenhaus sind täglich von 14 bis 19 Uhr. Kinder unter 12 Jahren dürfen nur in Begleitung eines Erwachsenen auf die Station." },
      { label: "Ansage 2 — Flughafen", text: "Achtung, Passagiere des Fluges LH 204 nach Lissabon! Ihr Flug wurde auf Gate B7 verlegt. Boarding beginnt in 20 Minuten. Bitte begeben Sie sich sofort zum neuen Gate." },
      { label: "Ansage 3 — Volkshochschule", text: "Liebe Kursteilnehmer, der Kochkurs am Dienstag muss leider ausfallen, da die Kursleitung krank ist. Der nächste Termin ist wie geplant in zwei Wochen." },
      { label: "Ansage 4 — Parkhaus", text: "Achtung! Das Parkhaus am Marktplatz ist ab morgen für zwei Wochen wegen Renovierungsarbeiten geschlossen. Bitte nutzen Sie das Parkhaus am Bahnhof als Alternative." },
    ],
    questions: [
      { id: "s4-h2-7", statement: "Kinder dürfen alleine auf die Station.", answer: "falsch", explanation: "Falsch. Kinder unter 12 Jahren dürfen nur mit einem Erwachsenen auf die Station. (False: children under 12 must be accompanied by an adult.)" },
      { id: "s4-h2-8", statement: "Der Flug nach Lissabon fährt von Gate B7 ab.", answer: "richtig", explanation: "Richtig. Die Ansage sagt: Der Flug wurde auf Gate B7 verlegt. (Correct: the flight has been moved to gate B7.)" },
      { id: "s4-h2-9", statement: "Der Kochkurs am Dienstag findet nicht statt.", answer: "richtig", explanation: "Richtig. Der Kurs muss wegen Krankheit der Kursleitung ausfallen. (Correct: the course is cancelled due to the instructor being ill.)" },
      { id: "s4-h2-10", statement: "Das Parkhaus am Marktplatz ist ab morgen für einen Monat geschlossen.", answer: "falsch", explanation: "Falsch. Es ist nur für zwei Wochen geschlossen, nicht einen Monat. (False: only two weeks, not a month.)" },
    ],
  },
  {
    part: 3, taskLabel: "Aufgabe 3", partLabel: "Hören · Teil 3",
    type: "multiple-choice", points: 5,
    playsLabel: "Sie hören jeden Text zweimal.",
    youtubeId: "HaXIutuRCdU", startSeconds: 130,
    instruction: "Sie hören fünf Ansagen auf dem Anrufbeantworter. Zu jeder Ansage gibt es eine Aufgabe. Kreuzen Sie die richtige Antwort an (a, b oder c).",
    scripts: [
      { label: "Nachricht 1", text: "Hallo Felix, hier ist deine Schwester Anna. Ich brauche deine Hilfe. Kannst du am Samstag mit mir umziehen? Ich habe schon einen Transporter gemietet." },
      { label: "Nachricht 2", text: "Guten Tag, hier spricht Frau König von der Schule. Ihr Sohn Paul hat heute die Englischarbeit sehr gut geschrieben. Er hat eine Eins bekommen. Herzlichen Glückwunsch!" },
      { label: "Nachricht 3", text: "Hallo, hier ist Carlos aus dem Sprachkurs. Ich habe dein Wörterbuch aus Versehen mitgenommen. Du kannst es morgen in der Pause abholen." },
      { label: "Nachricht 4", text: "Guten Tag, hier ist der Kundendienst von Möbel Schmidt. Ihre Bestellung ist leider noch nicht lieferbar. Wir melden uns wieder, sobald die Ware da ist." },
      { label: "Nachricht 5", text: "Hi Sophie, ich bin's, Mia. Unser Yoga-Kurs findet heute nicht in der Turnhalle statt, sondern im Park. Bring bitte eine Decke mit. Bis gleich!" },
    ],
    questions: [
      { id: "s4-h3-11", statement: "Anna braucht Hilfe beim ...", options: ["a) Einkaufen am Samstag.", "b) Umziehen am Samstag.", "c) Reparieren eines Transporters."], answer: "b", explanation: "Anna sagt: Kannst du am Samstag mit mir umziehen? (Can you help me move on Saturday?)" },
      { id: "s4-h3-12", statement: "Paul hat in der Englischarbeit ...", options: ["a) eine Zwei bekommen.", "b) eine Eins bekommen.", "c) die Arbeit nicht geschrieben."], answer: "b", explanation: "Frau König sagt: Er hat eine Eins bekommen. (He got a grade 1 — the best mark.)" },
      { id: "s4-h3-13", statement: "Das Wörterbuch kann ...", options: ["a) heute nach dem Kurs abgeholt werden.", "b) morgen in der Pause abgeholt werden.", "c) per Post geschickt werden."], answer: "b", explanation: "Carlos sagt: Du kannst es morgen in der Pause abholen. (You can pick it up tomorrow during the break.)" },
      { id: "s4-h3-14", statement: "Die Möbelbestellung ...", options: ["a) wird morgen geliefert.", "b) ist noch nicht verfügbar.", "c) wurde storniert."], answer: "b", explanation: "Der Kundendienst sagt: Ihre Bestellung ist leider noch nicht lieferbar. (Your order is not yet available for delivery.)" },
      { id: "s4-h3-15", statement: "Der Yoga-Kurs findet heute ...", options: ["a) in der Turnhalle statt.", "b) im Park statt.", "c) nicht statt."], answer: "b", explanation: "Mia sagt: Unser Yoga-Kurs findet heute nicht in der Turnhalle statt, sondern im Park. (The class is in the park today, not the gym.)" },
    ],
  },
];

export const listeningExamSets: ListeningPart[][] = [set1, set2, set3, set4];
export const listeningParts = set1; // backward compat
