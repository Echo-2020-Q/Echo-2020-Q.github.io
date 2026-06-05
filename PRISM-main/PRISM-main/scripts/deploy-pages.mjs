import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = resolve(projectRoot, 'out');
const repositoryRoot = resolve(projectRoot, '..', '..');
const outputEntries = await readdir(outputRoot, { withFileTypes: true });

const publicationsHtml = await readFile(resolve(outputRoot, 'publications', 'index.html'), 'utf8');
const picturesHtml = await readFile(resolve(outputRoot, 'pictures', 'index.html'), 'utf8');

const requiredChecks = [
  {
    passed: /Applied Mathematical Modelling(?:<!-- -->\s*)+2026/.test(publicationsHtml),
    message: 'The rendered publication card is missing "Applied Mathematical Modelling".',
  },
  {
    passed: publicationsHtml.includes('data-nav-href="/index.html"'),
    message: 'Publications export does not link About to /index.html.',
  },
  {
    passed: picturesHtml.includes('data-nav-href="/index.html"'),
    message: 'Pictures export does not link About to /index.html.',
  },
  {
    passed: !publicationsHtml.includes('href="/index.txt"') && !picturesHtml.includes('href="/index.txt"'),
    message: 'Static export contains a direct link to /index.txt.',
  },
];

const failedChecks = requiredChecks.filter((check) => !check.passed);
if (failedChecks.length > 0) {
  for (const check of failedChecks) {
    console.error(`Deploy check failed: ${check.message}`);
  }
  console.error('Nothing was copied. Fix or rebuild the static export before deploying.');
  process.exit(1);
}

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
console.log('Verified publication journal and static About navigation.');
