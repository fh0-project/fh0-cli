import { addAliases } from 'module-alias';
import * as path from 'path';

const ROOT = path.join(__dirname, '..');

addAliases({
  '@lib': path.join(ROOT, 'lib'),
  '@fh0': path.join(ROOT, 'fh0'),
  '@fh0-plumber': path.join(ROOT, 'fh0-plumber'),
});
