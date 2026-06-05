import { cp, mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = resolve(projectRoot, 'out');
const repositoryRoot = resolve(projectRoot, '..', '..');
const outputEntries = await readdir(outputRoot, { withFileTypes: true });

for (const entry of outputEntries) {
  const source = resolve(outputRoot, entry.name);
  const destination = resolve(repositoryRoot, entry.name);

  if (entry.isDirectory()) {
    await mkdir(destination, { recursive: true });
  }

  await cp(source, destination, {
    recursive: true,
    force: true,
  });
}

await writeFile(resolve(repositoryRoot, '.nojekyll'), '');

console.log(`Copied static export from ${outputRoot}`);
console.log(`GitHub Pages files are ready in ${repositoryRoot}`);
