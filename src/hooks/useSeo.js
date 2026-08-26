import { useEffect } from 'react';
import { useI18n } from '../i18n';

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const match = selector.match(/\[(?:name|property)="([^"]+)"\]/);
    const key = match ? match[1] : '';
    if (selector.includes('property=')) el.setAttribute('property', key);
    else el.setAttribute('name', key);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const SEO_KEY_BY_PATH = {
  '/': 'meta.home',
  '/downloads': 'meta.downloads',
  '/docs': 'meta.docs',
  '/validation': 'meta.validation',
  '/faq': 'meta.faq',
  '/privacy': 'meta.privacy',
  '/legal': 'meta.legal',
  '*': 'meta.notFound',
};

export function useSeo(path, override = {}) {
  const { lang, t } = useI18n();
  const key = SEO_KEY_BY_PATH[path] || 'meta.docs';

  useEffect(() => {
    const baseTitle = t(`${key}.title`);
    const title = override.title || baseTitle;
    const description = override.description || t(`${key}.desc`);
    const url = `https://rogexlaboratories.com${path === '*' ? '/404' : path}`;

    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:image"]', 'content', 'https://rogexlaboratories.com/og-banner.jpg');
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [key, lang, t, path, override.title, override.description]);
}
