#!/usr/bin/env python3
"""
Generate per-question audio files for the Hören section.
Uses macOS `say` command with different German voices per speaker gender.
Outputs M4A files to public/audio/ (web-compatible, plays in all browsers).

Usage:
  python3 scripts/generate-audio.py
"""

import os
import re
import subprocess
import tempfile
import wave
import struct

# ── Voice assignments ──────────────────────────────────────────────────────────
# List with `say -v '?'` to see all available voices.
# We deliberately pick voices with very different timbres.
VOICE_FEMALE_1  = "Flo (German (Germany))"    # warm female
VOICE_FEMALE_2  = "Sandy (German (Germany))"  # softer female
VOICE_FEMALE_3  = "Shelley (German (Germany))"
VOICE_FEMALE_GM = "Grandma (German (Germany))"

VOICE_MALE_1 = "Eddy (German (Germany))"   # clear male
VOICE_MALE_2 = "Reed (German (Germany))"   # deeper male
VOICE_MALE_3 = "Rocko (German (Germany))"  # younger male

VOICE_NARRATOR = "Anna"  # official/neutral announcements

# Explicit speaker → voice overrides
SPEAKER_MAP: dict[str, str] = {
    # Teil 1 speakers
    "Verkäufer":   VOICE_MALE_1,
    "Kundin":      VOICE_FEMALE_1,
    "Frau Bauer":  VOICE_FEMALE_1,
    "Herr Klein":  VOICE_MALE_1,
    "Reisender":   VOICE_MALE_2,
    "Mitarbeiterin": VOICE_FEMALE_2,
    "Kellner":     VOICE_MALE_1,
    "Gast":        VOICE_MALE_2,
    "Kollegin A":  VOICE_FEMALE_1,
    "Kollegin B":  VOICE_FEMALE_2,
    "Arzt":        VOICE_MALE_1,
    "Patient":     VOICE_MALE_2,
    # Teil 3 speakers (single-speaker messages)
    "Tanja":  VOICE_FEMALE_1,
    "Mama":   VOICE_FEMALE_GM,
    "Stefan": VOICE_MALE_3,
    # Fallback gender detection
    "__female__": VOICE_FEMALE_3,
    "__male__":   VOICE_MALE_3,
    "__narrator__": VOICE_NARRATOR,
}

FEMALE_RE = re.compile(
    r"\b(in|frau|mama|mutter|anna|sabine|jana|lena|lisa|tanja|sarah|mia|maria|bauer|mitarbeiterin|kollegin)\b",
    re.IGNORECASE,
)
MALE_RE = re.compile(
    r"\b(herr|arzt|kellner|reisender|patient|verkäufer|verkaufer|stefan|tom|marco|peter|paul|thomas|pedro|klein|müller|muller|brandt|gast)\b",
    re.IGNORECASE,
)
SPEAKER_RE = re.compile(r"^([\w\s./äöüÄÖÜß]{1,35}):\s+(.+)$")

def pick_voice(speaker: str) -> str:
    if speaker in SPEAKER_MAP:
        return SPEAKER_MAP[speaker]
    if FEMALE_RE.search(speaker):
        return SPEAKER_MAP["__female__"]
    if MALE_RE.search(speaker):
        return SPEAKER_MAP["__male__"]
    return SPEAKER_MAP["__narrator__"]

def parse_script(text: str) -> list[tuple[str, str]]:
    """Return list of (voice, line_text) pairs."""
    lines = []
    for raw in text.strip().split("\n"):
        raw = raw.strip()
        if not raw:
            continue
        m = SPEAKER_RE.match(raw)
        if m:
            speaker = m.group(1).strip()
            # Skip if speaker contains .!? (it's a sentence, not a speaker)
            if re.search(r"[.!?]", speaker):
                lines.append((SPEAKER_MAP["__narrator__"], raw))
            else:
                lines.append((pick_voice(speaker), m.group(2).strip()))
        else:
            lines.append((SPEAKER_MAP["__narrator__"], raw))
    return lines

# ── AIFF → WAV conversion ─────────────────────────────────────────────────────
def aiff_to_wav(src: str, dst: str) -> None:
    subprocess.run(
        ["afconvert", "-f", "WAVE", "-d", "LEI16@22050", src, dst],
        check=True, capture_output=True,
    )

def wav_to_m4a(src: str, dst: str) -> None:
    subprocess.run(
        ["afconvert", "-f", "m4af", "-d", "aac", src, dst],
        check=True, capture_output=True,
    )

def silence_wav(duration_ms: int, sample_rate: int = 22050) -> bytes:
    """Return raw PCM bytes for silence (no WAV header)."""
    n_samples = int(sample_rate * duration_ms / 1000)
    return struct.pack("<" + "h" * n_samples, *([0] * n_samples))

def concatenate_wavs(wav_paths: list[str], out_path: str, gap_ms: int = 350) -> None:
    """Concatenate WAV files with a silence gap between them."""
    frames = b""
    params = None
    for i, p in enumerate(wav_paths):
        with wave.open(p, "rb") as wf:
            if params is None:
                params = wf.getparams()
            frames += wf.readframes(wf.getnframes())
        if i < len(wav_paths) - 1:
            frames += silence_wav(gap_ms, params.framerate)

    with wave.open(out_path, "wb") as wf:
        wf.setparams(params)
        wf.writeframes(frames)

# ── Scripts data ──────────────────────────────────────────────────────────────
SCRIPTS = {
    # Teil 1
    "h1-1": "Verkäufer: Guten Tag! Kann ich Ihnen helfen?\nKundin: Ja, bitte. Wo finde ich den Käse?\nVerkäufer: Der Käse ist in Gang 3, links neben der Milch.\nKundin: Vielen Dank!",
    "h1-2": "Frau Bauer: Bauer.\nHerr Klein: Guten Tag, Klein hier. Kann ich bitte Frau Hoffmann sprechen?\nFrau Bauer: Tut mir leid, sie ist nicht da. Kann ich etwas ausrichten?\nHerr Klein: Ja, bitte sagen Sie ihr, ich rufe morgen Vormittag wieder an.",
    "h1-3": "Reisender: Entschuldigung, wann fährt der nächste Zug nach Hamburg?\nMitarbeiterin: Der nächste Zug fährt um 14:32 Uhr von Gleis 5.\nReisender: Und wie lange dauert die Fahrt?\nMitarbeiterin: Ungefähr zwei Stunden.",
    "h1-4": "Kellner: Was darf ich Ihnen bringen?\nGast: Ich hätte gern ein Schnitzel mit Pommes und einen Orangensaft, bitte.\nKellner: Möchten Sie auch eine Vorspeise?\nGast: Nein danke, nur die Hauptspeise.",
    "h1-5": "Kollegin A: Wann beginnt die Besprechung heute?\nKollegin B: Um 10 Uhr. Aber Herr Müller kommt erst um halb elf.\nKollegin A: Dann fangen wir ohne ihn an.\nKollegin B: Ja, gut.",
    "h1-6": "Arzt: Was fehlt Ihnen denn?\nPatient: Ich habe seit drei Tagen Kopfschmerzen und fühle mich sehr müde.\nArzt: Haben Sie auch Fieber?\nPatient: Ja, gestern Abend hatte ich 38,5 Grad.",
    # Teil 2
    "h2-7":  "Achtung! Der Intercity-Zug nach München, Abfahrt 14:32 Uhr, fährt heute von Gleis 7 ab. Bitte beachten Sie: Der Zug hat 10 Minuten Verspätung. Vielen Dank für Ihre Geduld.",
    "h2-8":  "Sehr geehrte Damen und Herren, unser Kaufhaus schließt heute Abend ausnahmsweise bereits um 19 Uhr — eine Stunde früher als gewöhnlich. Wir bedanken uns für Ihr Verständnis.",
    "h2-9":  "Achtung, werte Badegäste! Das Hallenbad ist am kommenden Samstag wegen einer Schulveranstaltung für die Öffentlichkeit geschlossen. Ab Sonntag sind wir wieder geöffnet.",
    "h2-10": "Aufruf für Herrn Thomas Fischer: Bitte kommen Sie umgehend zu Schalter 12 in der Abflughalle. Ihr Flug nach Wien startet in 20 Minuten.",
    # Teil 3
    "h3-11": "Hallo Lisa, hier ist Tanja. Ich wollte fragen, ob wir uns morgen zum Kaffee treffen können. Ich bin ab 15 Uhr frei. Ruf mich bitte zurück!",
    "h3-12": "Guten Tag, hier spricht das Reisebüro Sonnenschein. Ihre Reise nach Spanien ist gebucht. Bitte kommen Sie bis Freitag vorbei, um Ihre Reiseunterlagen abzuholen.",
    "h3-13": "Hallo, ich bin's, Mama. Ich rufe an, weil du deinen Schal hier vergessen hast. Ich kann ihn dir am Wochenende vorbeibringen. Bis dann!",
    "h3-14": "Guten Tag, hier ist die Arztpraxis Dr. Meyer. Wir müssen Ihren Termin am Dienstag leider verschieben. Bitte rufen Sie uns an, damit wir einen neuen Termin vereinbaren können.",
    "h3-15": "Hi Marco, hier ist Stefan. Das Fußballspiel am Samstag beginnt nicht um 15 Uhr, sondern um 16:30 Uhr. Komm bitte nicht zu früh! Wir treffen uns vor dem Stadion.",
}

# ── Helpers for Teil 3 single-speaker scripts ─────────────────────────────────
TEIL3_VOICE: dict[str, str] = {
    "h3-11": VOICE_FEMALE_1,    # Tanja
    "h3-12": VOICE_NARRATOR,    # Reisebüro (formal)
    "h3-13": VOICE_FEMALE_GM,   # Mama
    "h3-14": VOICE_NARRATOR,    # Arztpraxis (formal)
    "h3-15": VOICE_MALE_3,      # Stefan
}

# ── Main ───────────────────────────────────────────────────────────────────────
def generate(script_id: str, text: str, out_dir: str) -> None:
    out_path = os.path.join(out_dir, f"{script_id}.m4a")
    if os.path.exists(out_path):
        print(f"  skip {script_id} (already exists)")
        return

    # For Teil 3, the whole script is one speaker — override parse
    if script_id in TEIL3_VOICE:
        lines = [(TEIL3_VOICE[script_id], text.strip())]
    else:
        lines = parse_script(text)

    with tempfile.TemporaryDirectory() as tmp:
        wav_parts = []
        for i, (voice, line_text) in enumerate(lines):
            aiff_path = os.path.join(tmp, f"part_{i}.aiff")
            wav_path  = os.path.join(tmp, f"part_{i}.wav")
            # say: -r rate (words/min), default ~180 — slow down slightly for learners
            subprocess.run(
                ["say", "-v", voice, "-r", "160", "-o", aiff_path, line_text],
                check=True, capture_output=True,
            )
            aiff_to_wav(aiff_path, wav_path)
            wav_parts.append(wav_path)

        combined_wav = os.path.join(tmp, "combined.wav")
        concatenate_wavs(wav_parts, combined_wav, gap_ms=400)
        wav_to_m4a(combined_wav, out_path)

    print(f"  ✓ {script_id}.m4a")

def main():
    out_dir = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "public", "audio",
    )
    os.makedirs(out_dir, exist_ok=True)
    print(f"Generating audio → {out_dir}\n")

    for script_id, text in SCRIPTS.items():
        generate(script_id, text, out_dir)

    print(f"\nDone! {len(SCRIPTS)} files generated.")

if __name__ == "__main__":
    main()
