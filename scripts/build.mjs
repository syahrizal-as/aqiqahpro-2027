import { mkdir, cp, rm } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'css/styles.css', 'js', 'assets']) {
  await cp(file, `dist/${file}`, { recursive: true });
}
console.log('Build selesai. Upload isi folder dist/ ke hosting statis.');
