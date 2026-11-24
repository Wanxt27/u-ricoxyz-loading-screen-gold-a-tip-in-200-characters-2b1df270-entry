import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One loading-screen tip for a stressed developer staring at a slow build:
// the coffee-break comparison everyone has made, with the twist that the
// compiler is "contemplating its life choices" like a tired coworker.
const TIP =
  "Tip: if your build takes longer than your coffee break, it's not compiling — it's contemplating its life choices.";

const MAX_CHARS = 200;
const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function guard(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`tip is ${chars} characters, must be 1-200`);
  }
  if (line.trim().length === 0) {
    throw new Error("tip must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("tip must be a single line");
  }
}

function main(): void {
  guard(TIP);
  // Create /output if needed; never delete the output directory itself.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, TIP, "utf8");
  // Verify the write landed byte-identical.
  const written = readFileSync(OUT_FILE, "utf8");
  if (written !== TIP) {
    throw new Error("entry.txt does not match the tip");
  }
}

main();
