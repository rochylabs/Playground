#!/usr/bin/env python3
"""Generate audio for listening sets 2, 3, and 4 using Edge TTS."""

import asyncio, os, re
import edge_tts

VOICE_FEMALE   = "de-DE-KatjaNeural"
VOICE_MALE     = "de-DE-ConradNeural"
VOICE_NARRATOR = "de-DE-KatjaNeural"

FEMALE_RE = re.compile(r"\b(frau|kundin|mitarbeiterin|kollegin|bauer|mama|mutter|kellnerin|rezeptionistin|händlerin|kassierer|apothekerin|friseurin|beraterin|bäckerin|lehrerin|kassiererin)\b", re.IGNORECASE)
MALE_RE   = re.compile(r"\b(herr|arzt|kellner|reisender|patient|verkäufer|stefan|tom|marco|peter|paul|thomas|klein|müller|gast|schaffner|markus|trainerin|postbeamter|neuling|kunde|käufer|besucher|interessent|schüler)\b", re.IGNORECASE)
SPEAKER_RE = re.compile(r"^([\w\s./äöüÄÖÜß]{1,35}):\s+(.+)$")

def pick_voice(speaker: str) -> str:
    if FEMALE_RE.search(speaker): return VOICE_FEMALE
    if MALE_RE.search(speaker):   return VOICE_MALE
    return VOICE_NARRATOR

def parse_script(text: str) -> list[tuple[str, str]]:
    lines = []
    for raw in text.strip().split("\n"):
        raw = raw.strip()
        if not raw: continue
        m = SPEAKER_RE.match(raw)
        if m:
            sp = m.group(1).strip()
            if not re.search(r"[.!?]", sp):
                lines.append((pick_voice(sp), m.group(2).strip())); continue
        lines.append((VOICE_NARRATOR, raw))
    return lines

# Scripts for sets 2, 3, 4 — single-speaker Teil 3 messages get explicit voice
SINGLE_VOICE: dict[str, str] = {
    "s2-h3-11": VOICE_FEMALE, "s2-h3-12": VOICE_FEMALE, "s2-h3-13": VOICE_FEMALE,
    "s2-h3-14": VOICE_FEMALE, "s2-h3-15": VOICE_MALE,
    "s3-h3-11": VOICE_MALE,   "s3-h3-12": VOICE_FEMALE, "s3-h3-13": VOICE_FEMALE,
    "s3-h3-14": VOICE_FEMALE, "s3-h3-15": VOICE_MALE,
    "s4-h3-11": VOICE_FEMALE, "s4-h3-12": VOICE_FEMALE, "s4-h3-13": VOICE_MALE,
    "s4-h3-14": VOICE_FEMALE, "s4-h3-15": VOICE_MALE,
}

SCRIPTS: dict[str, str] = {
    # ── SET 2 ──────────────────────────────────────────────────────────────────
    "s2-h1-1": "Kellnerin: Guten Morgen! Was darf es sein?\nKunde: Einen Kaffee und ein Croissant, bitte.\nKellnerin: Mit Milch und Zucker?\nKunde: Nur mit Milch, bitte. Keinen Zucker.",
    "s2-h1-2": "Rezeptionistin: Guten Abend, willkommen im Hotel Stern!\nGast: Guten Abend. Ich habe eine Reservierung. Mein Name ist Weber.\nRezeptionistin: Ja, Herr Weber. Zimmer 205, zweiter Stock. Das Frühstück ist von 7 bis 10 Uhr.\nGast: Danke schön.",
    "s2-h1-3": "Friseurin: Was möchten Sie heute machen lassen?\nKundin: Nur schneiden, bitte. Nicht zu kurz.\nFriseurin: Wie viel soll ich abschneiden?\nKundin: Ungefähr fünf Zentimeter.",
    "s2-h1-4": "Apothekerin: Kann ich Ihnen helfen?\nPatient: Ja, ich brauche etwas gegen Kopfschmerzen.\nApothekerin: Haben Sie eine Allergie gegen Aspirin?\nPatient: Nein, keine Allergie.",
    "s2-h1-5": "Händlerin: Guten Tag! Was hätten Sie gern?\nKäufer: Ein Kilo Äpfel und 500 Gramm Tomaten, bitte.\nHändlerin: Die Äpfel kosten 2 Euro das Kilo. Die Tomaten 1 Euro 50.\nKäufer: Gut, ich nehme beides.",
    "s2-h1-6": "Kassierer: Das macht 18 Euro 50, bitte.\nKundin: Hier sind 20 Euro.\nKassierer: Und 1 Euro 50 zurück. Haben Sie eine Kundenkarte?\nKundin: Nein, leider nicht.",
    "s2-h2-7":  "Sehr geehrte Besucher, die Stadtbibliothek schließt heute wegen einer Veranstaltung bereits um 17 Uhr. Morgen sind wir wieder zu den normalen Zeiten geöffnet: 9 bis 20 Uhr. Wir bitten um Verständnis.",
    "s2-h2-8":  "Achtung, liebe Kunden! Heute haben wir ein besonderes Angebot: Alle Milchprodukte sind 20 Prozent günstiger. Das Angebot gilt nur heute bis Ladenschluss um 21 Uhr.",
    "s2-h2-9":  "Das Stadtmuseum ist dienstags geschlossen. Von Mittwoch bis Sonntag sind wir von 10 bis 18 Uhr für Sie da. Der Eintritt für Kinder unter 14 Jahren ist kostenlos.",
    "s2-h2-10": "Achtung, Fahrgäste! Die Linie 42 fährt heute wegen Straßenarbeiten nicht über die Hauptstraße. Bitte nutzen Sie die Haltestelle Parkstraße als Ersatz. Wir bitten um Entschuldigung.",
    "s2-h3-11": "Hallo Jana, hier ist Sabine. Ich mache am Freitag eine kleine Party. Kannst du kommen? Bitte bring etwas zu essen mit. Ruf mich an!",
    "s2-h3-12": "Guten Tag, hier ist die Zahnarztpraxis Dr. Vogel. Ihr Termin am Montag um 10 Uhr ist bestätigt. Bitte kommen Sie fünf Minuten früher. Auf Wiederhören.",
    "s2-h3-13": "Hallo, ich bin's, dein Bruder Tom. Ich bin nächste Woche in Berlin und möchte dich besuchen. Bist du am Mittwoch zu Hause? Schreib mir eine Nachricht.",
    "s2-h3-14": "Guten Tag, hier spricht Herr Schneider von der Firma Elektro Plus. Ihr Kühlschrank ist repariert und kann abgeholt werden. Wir haben montags bis freitags von 9 bis 17 Uhr geöffnet.",
    "s2-h3-15": "Hi Lena, hier ist Maria. Der Deutschkurs beginnt diese Woche nicht am Montag, sondern am Dienstag um 18 Uhr. Bitte vergiss das Lehrbuch nicht!",
    # ── SET 3 ──────────────────────────────────────────────────────────────────
    "s3-h1-1": "Kassiererin: Guten Abend! Für welchen Film?\nBesucher: Einmal für den neuen Film um 20 Uhr, bitte.\nKassiererin: Mit Studierendenrabatt?\nBesucher: Nein, normal bitte. Hier ist meine Karte.",
    "s3-h1-2": "Postbeamter: Guten Tag, was kann ich für Sie tun?\nKundin: Ich möchte dieses Paket nach Polen schicken.\nPostbeamter: Wie schwer ist es?\nKundin: Ungefähr drei Kilogramm.",
    "s3-h1-3": "Mitarbeiterin: Willkommen! Sind Sie schon Mitglied?\nNeuling: Nein, ich möchte mich gerne anmelden.\nMitarbeiterin: Für wie lange? Einen Monat oder ein Jahr?\nNeuling: Erstmal nur einen Monat, bitte.",
    "s3-h1-4": "Beraterin: Guten Tag! Wohin möchten Sie reisen?\nKunde: Nach Italien, am liebsten im Juli.\nBeraterin: Zwei Wochen oder länger?\nKunde: Genau zwei Wochen wären ideal.",
    "s3-h1-5": "Bäckerin: Guten Morgen! Was hätten Sie gern?\nKunde: Vier Brötchen und ein Roggenbrot, bitte.\nBäckerin: Möchten Sie die Brötchen aufgewärmt?\nKunde: Nein danke, so ist es gut.",
    "s3-h1-6": "Lehrerin: Hat jemand die Hausaufgabe nicht gemacht?\nSchüler: Entschuldigung, ich hatte leider keine Zeit.\nLehrerin: Das ist das zweite Mal diese Woche.\nSchüler: Es tut mir sehr leid. Das passiert nicht mehr.",
    "s3-h2-7":  "Willkommen im Berliner Zoo! Heute findet um 14 Uhr eine Fütterung der Löwen statt. Bitte kommen Sie rechtzeitig zu dem Bereich C. Für Kinder unter 6 Jahren ist der Eintritt gratis.",
    "s3-h2-8":  "Sehr geehrte Konzertbesucher, das heutige Konzert beginnt aus technischen Gründen 30 Minuten später als geplant — also um 20 Uhr 30 statt um 20 Uhr. Bitte bewahren Sie Ihre Plätze.",
    "s3-h2-9":  "Liebe Kunden, unser Einkaufszentrum ist montags bis samstags von 9 bis 21 Uhr geöffnet. Sonntags bleiben wir geschlossen. Unser Kundenparkplatz steht Ihnen kostenlos zur Verfügung.",
    "s3-h2-10": "Achtung! Der Bus der Linie 7 hat heute circa 15 Minuten Verspätung. Grund ist ein Unfall auf der Berliner Allee. Wir bitten alle Fahrgäste um Geduld. Vielen Dank.",
    "s3-h3-11": "Hallo Peter, hier ist Kai. Wir gehen heute Abend ins Kino. Der Film beginnt um 19 Uhr 30. Treffen wir uns um 19 Uhr vor dem Kino?",
    "s3-h3-12": "Guten Tag, hier ist der Sportverein Germania. Ihre Anmeldung zum Schwimmkurs wurde bestätigt. Der Kurs beginnt am nächsten Montag um 18 Uhr in der Schwimmhalle Nord.",
    "s3-h3-13": "Hallo, ich bin's, deine Tante Helga. Ich besuche dich am Wochenende. Ich komme am Samstag mit dem Zug an — um 11 Uhr 15 am Hauptbahnhof. Kannst du mich abholen?",
    "s3-h3-14": "Guten Tag, hier ist das Hotel am See. Wir bestätigen Ihre Reservierung für zwei Nächte vom 15. bis 17. Juli. Bitte melden Sie sich bis 18 Uhr an der Rezeption an.",
    "s3-h3-15": "Hi Laura, ich bin's, Ben. Wir müssen unser Schulprojekt bis Freitag fertig haben. Können wir uns morgen Nachmittag treffen und zusammenarbeiten?",
    # ── SET 4 ──────────────────────────────────────────────────────────────────
    "s4-h1-1": "Schaffner: Guten Tag, Ihre Fahrkarte bitte.\nReisende: Hier bitte. Ich fahre nach Frankfurt.\nSchaffner: Das ist der falsche Zug. Sie müssen in Mannheim umsteigen.\nReisende: Oh, das wusste ich nicht. Danke!",
    "s4-h1-2": "Petra: Hallo?\nMarkus: Hallo Petra, hier ist Markus. Haben wir heute um 3 Uhr ein Treffen?\nPetra: Nein, das Treffen ist erst um 4 Uhr. Du hast eine Stunde mehr Zeit.\nMarkus: Super, danke für die Information!",
    "s4-h1-3": "Trainerin: Möchten Sie sich heute anmelden?\nInteressent: Ja, gern. Was kostet die Mitgliedschaft?\nTrainerin: 30 Euro pro Monat, oder 300 Euro für ein ganzes Jahr.\nInteressent: Dann nehme ich das Jahresabo.",
    "s4-h1-4": "Lehrerin: Die nächste Prüfung ist am 15. März.\nSchülerin: Welche Themen kommen dran?\nLehrerin: Grammatik, Lesen und Hören. Kein Schreiben.\nSchülerin: Oh gut, Schreiben ist mein schwächstes Fach.",
    "s4-h1-5": "Kundin: Entschuldigung, wo finde ich die Sportkleidung?\nVerkäufer: Im dritten Stock, gleich neben der Rolltreppe.\nKundin: Und wo ist die Rolltreppe?\nVerkäufer: Geradeaus und dann links.",
    "s4-h1-6": "Erzieherin: Guten Morgen! Tim ist heute sehr müde.\nMutter: Ja, er hat gestern nicht gut geschlafen.\nErzieherin: Kein Problem. Wir passen gut auf ihn auf.\nMutter: Danke. Ich hole ihn um 15 Uhr ab.",
    "s4-h2-7":  "Sehr geehrte Besucher, die Besuchszeiten im Krankenhaus sind täglich von 14 bis 19 Uhr. Kinder unter 12 Jahren dürfen nur in Begleitung eines Erwachsenen auf die Station.",
    "s4-h2-8":  "Achtung, Passagiere des Fluges LH 204 nach Lissabon! Ihr Flug wurde auf Gate B7 verlegt. Boarding beginnt in 20 Minuten. Bitte begeben Sie sich sofort zum neuen Gate.",
    "s4-h2-9":  "Liebe Kursteilnehmer, der Kochkurs am Dienstag muss leider ausfallen, da die Kursleitung krank ist. Der nächste Termin ist wie geplant in zwei Wochen.",
    "s4-h2-10": "Achtung! Das Parkhaus am Marktplatz ist ab morgen für zwei Wochen wegen Renovierungsarbeiten geschlossen. Bitte nutzen Sie das Parkhaus am Bahnhof als Alternative.",
    "s4-h3-11": "Hallo Felix, hier ist deine Schwester Anna. Ich brauche deine Hilfe. Kannst du am Samstag mit mir umziehen? Ich habe schon einen Transporter gemietet.",
    "s4-h3-12": "Guten Tag, hier spricht Frau König von der Schule. Ihr Sohn Paul hat heute die Englischarbeit sehr gut geschrieben. Er hat eine Eins bekommen. Herzlichen Glückwunsch!",
    "s4-h3-13": "Hallo, hier ist Carlos aus dem Sprachkurs. Ich habe dein Wörterbuch aus Versehen mitgenommen. Du kannst es morgen in der Pause abholen.",
    "s4-h3-14": "Guten Tag, hier ist der Kundendienst von Möbel Schmidt. Ihre Bestellung ist leider noch nicht lieferbar. Wir melden uns wieder, sobald die Ware da ist.",
    "s4-h3-15": "Hi Sophie, ich bin's, Mia. Unser Yoga-Kurs findet heute nicht in der Turnhalle statt, sondern im Park. Bring bitte eine Decke mit. Bis gleich!",
}

async def synthesise(voice: str, text: str, path: str) -> None:
    comm = edge_tts.Communicate(text, voice, rate="-10%")
    await comm.save(path)

async def generate(script_id: str, text: str, out_dir: str) -> None:
    out_path = os.path.join(out_dir, f"{script_id}.mp3")
    if os.path.exists(out_path):
        print(f"  skip {script_id}")
        return

    if script_id in SINGLE_VOICE:
        segments = [(SINGLE_VOICE[script_id], text.strip())]
    else:
        segments = parse_script(text)

    parts: list[bytes] = []
    for voice, line_text in segments:
        tmp = out_path + f".part{len(parts)}.mp3"
        await synthesise(voice, line_text, tmp)
        with open(tmp, "rb") as f: parts.append(f.read())
        os.remove(tmp)

    with open(out_path, "wb") as f:
        for chunk in parts: f.write(chunk)
    print(f"  ✓ {script_id}.mp3")

async def main() -> None:
    out_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "audio")
    os.makedirs(out_dir, exist_ok=True)
    print(f"Generating sets 2–4 → {out_dir}\n")
    for sid, text in SCRIPTS.items():
        await generate(sid, text, out_dir)
    print(f"\nDone! {len(SCRIPTS)} files.")

if __name__ == "__main__":
    asyncio.run(main())
