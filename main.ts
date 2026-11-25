// The Funniest Office Joke — one short line about office life, a setup and a
// turn, punchline last. Writes /output/entry.txt (UTF-8, 1-200 chars).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 200;

// Setup: the printer only jams on deadline day. Turn: it is not broken.
const SETUP = "Our printer only jams on deadline day.";
const TURN = "I have decided it is not broken — it is the only colleague here with boundaries.";

function main(): void {
  const line = [SETUP, TURN].join(" ").replace(/\s+/g, " ").trim();
  if (line.length < 1 || line.length > LIMIT) {
    throw new Error(`joke must be 1-${LIMIT} chars, got ${line.length}`);
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("joke must be a single line");
  }
  const words = line.split(" ").filter(Boolean);
  if (words.length < 5) {
    throw new Error("a joke needs a setup and a turn");
  }
  // The brief wants the punchline last: the turn must close the line.
  if (!line.endsWith("boundaries.")) {
    throw new Error("joke must land its punchline on the last word");
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const target = join(OUTPUT_DIR, "entry.txt");
  writeFileSync(target, line + "\n", "utf8");
  console.log(`${line.length} chars (${words.length} words) -> ${target}`);
  console.log(line);
}

main();
