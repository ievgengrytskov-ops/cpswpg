// Runs the Astro CLI from the real, correctly-cased project path.
// On Windows, when the project is opened as 'c:\cpswpg' (lower-case drive letter), Vite sees two
// spellings of the same files ('c:/' and 'C:/'). Builds then silently lose all CSS (Markdown pages)
// or fail with "No cached compile metadata found" (<script>/<style> in pages).
// Starting Astro with cwd = 'C:\cpswpg' avoids that. On Linux/macOS (Vercel) this changes nothing.
// Usage (package.json): node scripts/astro.mjs build | dev | preview [...args]
import { spawn } from 'node:child_process';
import { realpathSync } from 'node:fs';
import path from 'node:path';

let cwd = realpathSync.native(process.cwd());
if (process.platform === 'win32') cwd = cwd.replace(/^[a-z]:/, (d) => d.toUpperCase());

const astroBin = path.join(cwd, 'node_modules', 'astro', 'astro.js');
const child = spawn(process.execPath, [astroBin, ...process.argv.slice(2)], { cwd, stdio: 'inherit' });
child.on('exit', (code, signal) => process.exit(signal ? 1 : code ?? 0));
