import * as archEn from './docs/architecture-en';
import * as archEs from './docs/architecture-es';
import * as edEn from './docs/editions-en';
import * as edEs from './docs/editions-es';
import * as echoEn from './docs/echo-en';
import * as echoEs from './docs/echo-es';
import * as pkgEn from './docs/packages-en';
import * as pkgEs from './docs/packages-es';
import * as instEn from './docs/install-en';
import * as instEs from './docs/install-es';
import { faqEn } from './faq-en';
import { faqEs } from './faq-es';
import { privacyEn } from './privacy-en';
import { privacyEs } from './privacy-es';
import { legalEn } from './legal-en';
import { legalEs } from './legal-es';

export const DOC_ORDER = ['architecture', 'editions', 'echo', 'packages', 'install'];

export const DOCS_CONTENT = {
  architecture: { en: archEn.blocks, es: archEs.blocks },
  editions: { en: edEn.blocks, es: edEs.blocks },
  echo: { en: echoEn.blocks, es: echoEs.blocks },
  packages: { en: pkgEn.blocks, es: pkgEs.blocks },
  install: { en: instEn.blocks, es: instEs.blocks },
};

export const FAQ_CONTENT = { en: faqEn, es: faqEs };
export const PRIVACY_CONTENT = { en: privacyEn, es: privacyEs };
export const LEGAL_CONTENT = { en: legalEn, es: legalEs };
