import { createContext, useContext, useEffect, useState } from 'react';
import { en } from './content/ui-en';
import { es } from './content/ui-es';

const LANG_KEY = 'rogex-lang';

const dictionaries = { en, es };

const I18nContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: () => '',
});

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const stored = window.localStorage.getItem(LANG_KEY);
      return stored === 'es' ? 'es' : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next) => {
    const value = next === 'es' || next === 'en' ? next : 'en';
    setLangState(value);
    try {
      window.localStorage.setItem(LANG_KEY, value);
    } catch {
      /* storage unavailable */
    }
  };

  const resolve = (dict, path) =>
    path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), dict);

  const t = (path) => {
    const value = resolve(dictionaries[lang], path);
    if (value !== undefined) return value;
    const fallback = resolve(dictionaries.en, path);
    if (fallback !== undefined) return fallback;
    return path;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
