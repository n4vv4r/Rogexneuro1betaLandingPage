#!/usr/bin/env node
/**
 * Local admin for the static package channel (public/rx-os/packages).
 *
 *   node tools/sync-rxos-packages.mjs index
 *   node tools/sync-rxos-packages.mjs add path/to/app.rxc [--name x] [--version 1.0.0] [--desc "..."]
 *   node tools/sync-rxos-packages.mjs del hellopkg
 *   node tools/sync-rxos-packages.mjs list
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync, unlinkSync, existsSync, mkdirSync } from 'node:fs';
import { basename, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'public', 'rx-os', 'packages');
const CHANNEL = 'https://www.rogexlaboratories.com/rx-os/packages';

function sha3(text) {
  return createHash('sha3-256').update(text, 'utf8').digest('hex');
}

function loadMeta() {
  const metaPath = join(dir, 'META.json');
  if (!existsSync(metaPath)) return {};
  try {
    return JSON.parse(readFileSync(metaPath, 'utf8'));
  } catch {
    return {};
  }
}

function saveMeta(meta) {
  writeFileSync(join(dir, 'META.json'), JSON.stringify(meta, null, 2) + '\n');
}

function listRxc() {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.rxc'))
    .sort();
}

function rebuildIndex() {
  mkdirSync(dir, { recursive: true });
  const meta = loadMeta();
  const packages = listRxc().map((file) => {
    const body = readFileSync(join(dir, file), 'utf8');
    const name = file.replace(/\.rxc$/i, '');
    const m = meta[name] || {};
    const h = sha3(body);
    return {
      name,
      version: m.version || '1.0.0',
      desc: m.desc || `${name} package`,
      cmd: m.cmd || name,
      file,
      size: Buffer.byteLength(body, 'utf8'),
      sha3: h,
      sha3_8: h.slice(0, 16),
    };
  });

  const index = {
    channel: CHANNEL,
    format: 'rxc-v1',
    updated: new Date().toISOString().slice(0, 10),
    note: 'Official RXos package channel. OS installs via `rx app add <name>` (HTTPS client staged; local verified mirror matches this tree).',
    packages,
  };
  writeFileSync(join(dir, 'INDEX.json'), JSON.stringify(index, null, 2) + '\n');
  console.log(`INDEX.json: ${packages.length} package(s)`);
  for (const p of packages) {
    console.log(`  ${p.name}-${p.version}  ${p.size}B  sha3:${p.sha3_8}…`);
  }
  return index;
}

function add(filePath, opts) {
  if (!existsSync(filePath)) {
    console.error('file not found:', filePath);
    process.exit(1);
  }
  mkdirSync(dir, { recursive: true });
  let body = readFileSync(filePath, 'utf8');
  if (!body.endsWith('\n')) body += '\n';
  const name = opts.name || basename(filePath).replace(/\.rxc$/i, '');
  const dest = join(dir, `${name}.rxc`);
  writeFileSync(dest, body);
  const meta = loadMeta();
  meta[name] = {
    version: opts.version || meta[name]?.version || '1.0.0',
    desc: opts.desc || meta[name]?.desc || `${name} package`,
    cmd: opts.cmd || meta[name]?.cmd || name,
  };
  saveMeta(meta);
  console.log('wrote', dest);
  rebuildIndex();
}

function del(name) {
  const clean = name.replace(/\.rxc$/i, '');
  const dest = join(dir, `${clean}.rxc`);
  if (!existsSync(dest)) {
    console.error('not found:', dest);
    process.exit(1);
  }
  unlinkSync(dest);
  const meta = loadMeta();
  delete meta[clean];
  saveMeta(meta);
  console.log('deleted', dest);
  rebuildIndex();
}

const [cmd, ...rest] = process.argv.slice(2);
if (!cmd || cmd === 'help' || cmd === '-h') {
  console.log(`Usage:
  node tools/sync-rxos-packages.mjs index
  node tools/sync-rxos-packages.mjs list
  node tools/sync-rxos-packages.mjs add <file.rxc> [--name n] [--version v] [--desc "..."]
  node tools/sync-rxos-packages.mjs del <name>`);
  process.exit(0);
}

if (cmd === 'index' || cmd === 'list') {
  rebuildIndex();
} else if (cmd === 'add') {
  const file = rest[0];
  if (!file) {
    console.error('missing file');
    process.exit(1);
  }
  const opts = {};
  for (let i = 1; i < rest.length; i++) {
    if (rest[i] === '--name') opts.name = rest[++i];
    else if (rest[i] === '--version') opts.version = rest[++i];
    else if (rest[i] === '--desc') opts.desc = rest[++i];
    else if (rest[i] === '--cmd') opts.cmd = rest[++i];
  }
  add(file, opts);
} else if (cmd === 'del' || cmd === 'rm' || cmd === 'delete') {
  if (!rest[0]) {
    console.error('missing name');
    process.exit(1);
  }
  del(rest[0]);
} else {
  console.error('unknown command', cmd);
  process.exit(1);
}
