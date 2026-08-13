const KEY = 'kl-theme';

export const THEMES = [
  { id: 'light', label: 'Claro', swatch: '#f0eee6' },
  { id: 'dark', label: 'Oscuro', swatch: '#1a1916' },
  { id: 'solarized', label: 'Solarized', swatch: '#002b36' },
  { id: 'matrix', label: 'Matrix', swatch: '#00ff41' },
];

const IDS = THEMES.map((t) => t.id);

export function getTheme() {
  try {
    const saved = localStorage.getItem(KEY);
    if (IDS.includes(saved)) return saved;
  } catch {
    /* ignore */
  }
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function applyTheme(theme) {
  const t = IDS.includes(theme) ? theme : 'light';
  document.documentElement.setAttribute('data-theme', t);
  const meta = document.querySelector('meta[name="theme-color"]');
  const bar = {
    light: '#0b0b0a',
    dark: '#1a1916',
    solarized: '#002b36',
    matrix: '#020804',
  };
  if (meta) meta.setAttribute('content', bar[t] || bar.light);
  try {
    localStorage.setItem(KEY, t);
  } catch {
    /* ignore */
  }
}

export function cycleTheme() {
  const i = IDS.indexOf(getTheme());
  const next = IDS[(i + 1) % IDS.length];
  applyTheme(next);
  return next;
}
