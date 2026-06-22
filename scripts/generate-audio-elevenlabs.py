#!/usr/bin/env python3
"""
Generate per-question audio files using ElevenLabs TTS.
Outputs MP3 files to public/audio/ — one per listening question.

Usage:
  python3 scripts/generate-audio-elevenlabs.py

Delete the old .m4a files first if regenerating:
  rm public/audio/*.m4a
"""

import os
import re
import time
import urllib.request
import urllib.error
import json

# ── Config ─────────────────────────────────────────────────────────────────────
API_KEY      = "c3f1dccc8c199c1941d9943d65f0e4bf531f916710aee144b620aa1a2fa104a1"
VOICE_FEMALE = "21m00Tcm4TlvDq8ikWAM"  # Rachel — ElevenLabs premade, works on free tier
VOICE_MALE   = "pNInz6obpgDQGcFmaJgB"  # Adam   — ElevenLabs premade, works on free tier
MODEL        = "eleven_multilingual_v2"

# ── Speaker → voice mapping ───────────────────────────────────────────────────
FEMALE_RE = re.compile(
    r"\b(frau|kundin|mitarbeiterin|kollegin|bauer|mama|mutter|"
    r"anna|sabine|jana|lena|lisa|tanja|sarah|mia|maria|flo|sandy)\b",
    re.IGNORECASE,
)
MALE_RE = re.compile(
    r"\b(herr|arzt|kellner|reisender|patient|verkäufer|verkaufer|"
    r"stefan|tom|marco|peter|paul|thomas|pedro|klein|müller|muller|"
    r"brandt|gast|marco)\b",
    re.IGNORECASE,
)
SPEAKER_RE = re.compile(r"^([\w\s./äöüÄÖÜß]{1,35}):\s+(.+)$")

def pick_voice(speaker: str) -> str:
    if FEMALE_RE.search(speaker):
        return VOICE_FEMALE
    if MALE_RE.search(speaker):
        return VOICE_MALE
    return VOICE_FEMALE  # narrator default

# Maps Teil 3 single-speaker messages to the right voice
TEIL3_VOICE: dict[str, str] = {
    "h3-11": VOICE_FEMALE,  # Tanja
    "h3-12": VOICE_FEMALE,  # Reisebüro (formal female)
    "h3-13": VOICE_FEMALE,  # Mama
    "h3-14": VOICE_FEMALE,  # Arztpraxis
    "h3-15": VOICE_MALE,    # Stefan
}

def parse_script(text: str) -> list[tuple[str, str]]:
    """Return (voice_id, line_text) pairs."""
    lines = []
    for raw in text.strip().split("\n"):
        raw = raw.strip()
        if not raw:
            continue
        m = SPEAKER_RE.match(raw)
        if m:
            speaker = m.group(1).strip()
            if re.search(r"[.!?]", speaker):
                lines.append((VOICE_FEMALE, raw))
            else:
                lines.append((pick_voice(speaker), m.group(2).strip()))
        else:
            lines.append((VOICE_FEMALE, raw))
    return lines

# ── ElevenLabs API call ───────────────────────────────────────────────────────
def tts(text: str, voice_id: str) -> bytes:
    url  = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    body = json.dumps({
        "text": text,
        "model_id": MODEL,
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75},
    }).encode()
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "xi-api-key": API_KEY,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg",
        },
    )
    with urllib.request.urlopen(req) as resp:
        return resp.read()

# ── Scripts ───────────────────────────────────────────────────────────────────
SCRIPTS = {
    "h1-1": "Verkäufer: Guten Tag! Kann ich Ihnen helfen?\nKundin: Ja, bitte. Wo finde ich den Käse?\nVerkäufer: Der Käse ist in Gang 3, links neben der Milch.\nKundin: Vielen Dank!",
    "h1-2": "Frau Bauer: Bauer.\nHerr Klein: Guten Tag, Klein hier. Kann ich bitte Frau Hoffmann sprechen?\nFrau Bauer: Tut mir leid, sie ist nicht da. Kann ich etwas ausrichten?\nHerr Klein: Ja, bitte sagen Sie ihr, ich rufe morgen Vormittag wieder an.",
    "h1-3": "Reisender: Entschuldigung, wann fährt der nächste Zug nach Hamburg?\nMitarbeiterin: Der nächste Zug fährt um 14 Uhr 32 von Gleis 5.\nReisender: Und wie lange dauert die Fahrt?\nMitarbeiterin: Ungefähr zwei Stunden.",
    "h1-4": "Kellner: Was darf ich Ihnen bringen?\nGast: Ich hätte gern ein Schnitzel mit Pommes und einen Orangensaft, bitte.\nKellner: Möchten Sie auch eine Vorspeise?\nGast: Nein danke, nur die Hauptspeise.",
    "h1-5": "Kollegin A: Wann beginnt die Besprechung heute?\nKollegin B: Um 10 Uhr. Aber Herr Müller kommt erst um halb elf.\nKollegin A: Dann fangen wir ohne ihn an.\nKollegin B: Ja, gut.",
    "h1-6": "Arzt: Was fehlt Ihnen denn?\nPatient: Ich habe seit drei Tagen Kopfschmerzen und fühle mich sehr müde.\nArzt: Haben Sie auch Fieber?\nPatient: Ja, gestern Abend hatte ich 38 Komma 5 Grad.",
    "h2-7":  "Achtung! Der Intercity-Zug nach München, Abfahrt 14 Uhr 32, fährt heute von Gleis 7 ab. Bitte beachten Sie: Der Zug hat 10 Minuten Verspätung. Vielen Dank für Ihre Geduld.",
    "h2-8":  "Sehr geehrte Damen und Herren, unser Kaufhaus schließt heute Abend ausnahmsweise bereits um 19 Uhr, eine Stunde früher als gewöhnlich. Wir bedanken uns für Ihr Verständnis.",
    "h2-9":  "Achtung, werte Badegäste! Das Hallenbad ist am kommenden Samstag wegen einer Schulveranstaltung für die Öffentlichkeit geschlossen. Ab Sonntag sind wir wieder geöffnet.",
    "h2-10": "Aufruf für Herrn Thomas Fischer: Bitte kommen Sie umgehend zu Schalter 12 in der Abflughalle. Ihr Flug nach Wien startet in 20 Minuten.",
    "h3-11": "Hallo Lisa, hier ist Tanja. Ich wollte fragen, ob wir uns morgen zum Kaffee treffen können. Ich bin ab 15 Uhr frei. Ruf mich bitte zurück!",
    "h3-12": "Guten Tag, hier spricht das Reisebüro Sonnenschein. Ihre Reise nach Spanien ist gebucht. Bitte kommen Sie bis Freitag vorbei, um Ihre Reiseunterlagen abzuholen.",
    "h3-13": "Hallo, ich bin's, Mama. Ich rufe an, weil du deinen Schal hier vergessen hast. Ich kann ihn dir am Wochenende vorbeibringen. Bis dann!",
    "h3-14": "Guten Tag, hier ist die Arztpraxis Dr. Meyer. Wir müssen Ihren Termin am Dienstag leider verschieben. Bitte rufen Sie uns an, damit wir einen neuen Termin vereinbaren können.",
    "h3-15": "Hallo Marco, hier ist Stefan. Das Fußballspiel am Samstag beginnt nicht um 15 Uhr, sondern um 16 Uhr 30. Komm bitte nicht zu früh! Wir treffen uns vor dem Stadion.",
}

# Minimal silent MP3 frame (used to pad between speakers)
SILENCE_MP3 = bytes([
    0xFF,0xE3,0x18,0xC4, 0x00,0x00,0x00,0x03, 0x48,0x00,0x00,0x00,
    0x00,0x4C,0x41,0x4D, 0x45,0x33,0x2E,0x31, 0x30,0x30,0x55,0x55,
    0x55,0x55,0x55,0x55, 0x55,0x55,0x55,0x55, 0x55,0x55,0x55,0x55,
]) * 20  # ~0.3 s of silence

def generate(script_id: str, text: str, out_dir: str) -> None:
    out_path = os.path.join(out_dir, f"{script_id}.mp3")
    if os.path.exists(out_path):
        print(f"  skip {script_id} (already exists — delete to regenerate)")
        return

    if script_id in TEIL3_VOICE:
        segments = [(TEIL3_VOICE[script_id], text.strip())]
    else:
        segments = parse_script(text)

    audio_chunks: list[bytes] = []
    prev_voice = None
    for voice_id, line_text in segments:
        if prev_voice is not None and voice_id != prev_voice:
            audio_chunks.append(SILENCE_MP3)
        audio_chunks.append(tts(line_text, voice_id))
        prev_voice = voice_id
        time.sleep(0.3)  # stay under rate limit

    with open(out_path, "wb") as f:
        for chunk in audio_chunks:
            f.write(chunk)

    print(f"  ✓ {script_id}.mp3")

def main():
    out_dir = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "public", "audio",
    )
    os.makedirs(out_dir, exist_ok=True)
    print(f"Generating audio via ElevenLabs → {out_dir}\n")

    for script_id, text in SCRIPTS.items():
        try:
            generate(script_id, text, out_dir)
        except urllib.error.HTTPError as e:
            body = e.read().decode()
            print(f"  ✗ {script_id} — HTTP {e.code}: {body}")
            break

    print("\nDone.")

if __name__ == "__main__":
    main()
