import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Inline imports — tsx resolves TypeScript path aliases
import { listeningExamSets } from "../data/listening";
import { readingExamSets } from "../data/reading";
import { writingExamSets } from "../data/writing";

// ─── Listening ────────────────────────────────────────────────────────────────
describe("listening data", () => {
  for (const [setIdx, set] of listeningExamSets.entries()) {
    for (const part of set) {
      const label = `set${setIdx + 1} part${part.part}`;

      it(`${label}: every question has a non-empty id`, () => {
        for (const q of part.questions) {
          assert.ok(q.id.trim().length > 0, `Empty id in ${label}`);
        }
      });

      it(`${label}: question ids are unique within the part`, () => {
        const ids = part.questions.map((q) => q.id);
        const unique = new Set(ids);
        assert.equal(unique.size, ids.length, `Duplicate ids in ${label}: ${ids}`);
      });

      it(`${label}: multiple-choice answers are a/b/c`, () => {
        if (part.type !== "multiple-choice") return;
        for (const q of part.questions) {
          assert.ok(
            ["a", "b", "c"].includes(q.answer as string),
            `Invalid MC answer "${q.answer}" for ${q.id}`
          );
        }
      });

      it(`${label}: richtig-falsch answers are boolean`, () => {
        if (part.type !== "richtig-falsch") return;
        for (const q of part.questions) {
          assert.equal(
            typeof q.answer, "boolean",
            `Expected boolean answer for ${q.id}, got ${typeof q.answer}`
          );
        }
      });

      it(`${label}: multiple-choice questions have exactly 3 options`, () => {
        if (part.type !== "multiple-choice") return;
        for (const q of part.questions) {
          assert.equal(
            q.options?.length, 3,
            `Question ${q.id} should have 3 options, has ${q.options?.length}`
          );
        }
      });
    }
  }
});

// ─── Reading ──────────────────────────────────────────────────────────────────
describe("reading data", () => {
  for (const [setIdx, set] of readingExamSets.entries()) {
    for (const part of set.parts) {
      const label = `set${setIdx + 1} part${part.part}`;

      it(`${label}: every question has a non-empty id`, () => {
        for (const q of part.questions) {
          assert.ok(q.id.trim().length > 0, `Empty id in ${label}`);
        }
      });

      it(`${label}: question ids are unique within the part`, () => {
        const ids = part.questions.map((q) => q.id);
        const unique = new Set(ids);
        assert.equal(unique.size, ids.length, `Duplicate ids in ${label}`);
      });

      it(`${label}: richtig-falsch answers are boolean`, () => {
        if (part.type !== "richtig-falsch") return;
        for (const q of part.questions) {
          assert.equal(
            typeof q.answer, "boolean",
            `Expected boolean for ${q.id}, got ${typeof q.answer} ("${q.answer}")`
          );
        }
      });

      it(`${label}: matching answers are non-empty strings`, () => {
        if (part.type !== "matching") return;
        for (const q of part.questions) {
          assert.equal(typeof q.answer, "string", `Expected string for ${q.id}`);
          assert.ok((q.answer as string).trim().length > 0, `Empty answer for ${q.id}`);
        }
      });
    }
  }
});

// ─── Writing ──────────────────────────────────────────────────────────────────
describe("writing data", () => {
  for (const [setIdx, set] of writingExamSets.entries()) {
    const label = `set${setIdx + 1}`;

    it(`${label} part1: all form fields have non-empty correctAnswer`, () => {
      for (const f of set.part1.formFields) {
        assert.ok(
          f.correctAnswer.trim().length > 0,
          `Empty correctAnswer for field "${f.label}" in ${label}`
        );
      }
    });

    it(`${label} part1: field labels are unique`, () => {
      const labels = set.part1.formFields.map((f) => f.label);
      const unique = new Set(labels);
      assert.equal(unique.size, labels.length, `Duplicate field labels in ${label}`);
    });

    it(`${label} part1: date fields follow TT.MM.JJJJ format`, () => {
      const dateFields = set.part1.formFields.filter((f) =>
        f.hint?.includes("TT.MM.JJJJ") || f.label.toLowerCase().includes("datum")
      );
      for (const f of dateFields) {
        assert.match(
          f.correctAnswer,
          /^\d{2}\.\d{2}\.\d{4}$/,
          `Date field "${f.label}" in ${label} has wrong format: "${f.correctAnswer}"`
        );
      }
    });

    it(`${label} part2: modelAnswer is at least 20 words`, () => {
      const wordCount = set.part2.modelAnswer.trim().split(/\s+/).length;
      assert.ok(
        wordCount >= 20,
        `Model answer in ${label} part2 is too short: ${wordCount} words`
      );
    });

    it(`${label} part2: promptPoints has exactly 3 items`, () => {
      assert.equal(
        set.part2.promptPoints.length, 3,
        `${label} part2 should have 3 prompt points, has ${set.part2.promptPoints.length}`
      );
    });
  }
});
