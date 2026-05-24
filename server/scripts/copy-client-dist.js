import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', '..');
const src = join(root, 'client', 'dist');
const dest = join(__dirname, '..', 'client-dist');

if (!existsSync(src)) {
  console.error('client/dist topilmadi. Avval: npm run build --prefix client');
  process.exit(1);
}

if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log('client/dist -> server/client-dist nusxalandi');
