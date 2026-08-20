import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DICT } from './i18n.js';

export const LANGS = [
  { id: 'es', label: 'ES', name: 'Español' },
  { id: 'en', label: 'EN', name: 'English' },
];

const LangContext = createContext({
  lang: 'es',
  setLang: () => {},
  t: (key) => key,
  dict: DICT.es,
});

function readInitialLang() {
  if (typeof window === 'undefined') return 'es';
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'en' || q === 'es') return q;
    const stored = window.localStorage.getItem('rx_lang');
    if (stored === 'en' || stored === 'es') return stored;
  } catch {
    /* ignore */
  }
  return 'es';
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang);

  const setLang = useCallback((next) => {
    const id = next === 'en' ? 'en' : 'es';
    setLangState(id);
    try {
      window.localStorage.setItem('rx_lang', id);
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href);
    if (id === 'es') url.searchParams.delete('lang');
    else url.searchParams.set('lang', 'en');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
  }, [lang]);

  const value = useMemo(() => {
    const dict = DICT[lang] || DICT.es;
    const t = (key) => {
      const hit = dict[key];
      if (hit != null) return hit;
      const fallback = DICT.es[key];
      return fallback != null ? fallback : key;
    };
    return { lang, setLang, t, dict };
  }, [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function pick(lang, es, en) {
  return lang === 'en' ? en : es;
}
