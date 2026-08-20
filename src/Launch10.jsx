import React from 'react';
import { ArrowUpRight, Cpu, Hexagon, Radio } from 'lucide-react';
import { useLang } from './lang.jsx';
import { SKU_ROWS, SPEC_ROWS } from './i18n.js';

export function Launch10Banner({ navigate, compact = false }) {
  const { t } = useLang();
  return (
    <section className={compact ? 'launch10 is-compact' : 'launch10'} id="launch-10">
      <div className="launch10-kicker">
        <span>{t('launchKicker')}</span>
        <em>20 · 08 · 2026</em>
      </div>
      <h2>{t('launchTitle')}</h2>
      <p className="launch10-lead">{t('launchLead')}</p>
      <div className="hero-tags">
        <span>{t('launchTag1')}</span>
        <span>{t('launchTag2')}</span>
        <span>{t('launchTag3')}</span>
        <span>{t('launchTag4')}</span>
        <span>{t('launchTag5')}</span>
        <span>{t('launchTag6')}</span>
      </div>
      <div className="launch10-pair">
        <article>
          <Hexagon size={22} strokeWidth={1.6} />
          <span className="launch10-status is-live">{t('launchStatusNavi')}</span>
          <h3>NAVI 10 Echo</h3>
          <p>{t('launchNaviBlurb')}</p>
          <button type="button" className="brutal-button primary" onClick={() => navigate('/navi')}>
            {t('launchCtaNavi')} <ArrowUpRight size={14} />
          </button>
        </article>
        <article>
          <Cpu size={22} strokeWidth={1.6} />
          <span className="launch10-status is-soon">{t('launchStatusRxos')}</span>
          <h3>rxOS 10</h3>
          <p>{t('launchRxosBlurb')}</p>
          <button type="button" className="brutal-button" onClick={() => navigate('/docs/rxos10')}>
            {t('launchCtaRxos')} <ArrowUpRight size={14} />
          </button>
        </article>
      </div>
      <div className="hero-actions">
        <button type="button" className="brutal-button primary" onClick={() => navigate('/docs/navi10-spec')}>
          {t('launchCtaSpec')}
        </button>
        <button type="button" className="brutal-button" onClick={() => navigate('/docs/navi10')}>
          {t('launchCtaDocs')}
        </button>
        <a
          className="brutal-button"
          href="https://github.com/knightslabs/RXos-Packages/releases/tag/v9.0.0"
        >
          {t('launchCtaIso')} <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}

export function Spec10Table() {
  const { lang, t } = useLang();
  const rows = SPEC_ROWS[lang] || SPEC_ROWS.es;
  return (
    <section className="spec10" id="spec-10">
      <div className="section-title" data-reveal>
        <span>10 / 10</span>
        <h2>{t('specTitle')}</h2>
        <p>{t('specText')}</p>
      </div>
      <div className="spec10-table" data-reveal>
        <div className="spec10-row spec10-head">
          <span>{t('specCan')}</span>
          <span>NAVI 10 · rxOS 10</span>
          <span>proof</span>
        </div>
        {rows.map(([k, v, p]) => (
          <div className="spec10-row" key={k}>
            <span>{k}</span>
            <strong>{v}</strong>
            <code>{p}</code>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Sku10Table() {
  const { lang, t } = useLang();
  const rows = SKU_ROWS[lang] || SKU_ROWS.es;
  return (
    <div className="spec10-table spec10-sku" data-reveal>
      <div className="spec10-row spec10-head">
        <span>{t('specSku')}</span>
        <span>{lang === 'en' ? 'Travels' : 'Viaja'}</span>
        <span>{lang === 'en' ? 'Drops' : 'Se cae'}</span>
      </div>
      {rows.map(([k, v, p]) => (
        <div className="spec10-row" key={k}>
          <span>{k}</span>
          <strong>{v}</strong>
          <code>{p}</code>
        </div>
      ))}
    </div>
  );
}

export function Layer10Arch() {
  const { lang } = useLang();
  const layers =
    lang === 'en'
      ? [
          ['07', 'Q_N = Q₈×Q₈', '65536 addresses. One 256-LIF spoke. Product Hamming = popcount. Not 65536 neurons.'],
          ['08', 'CAM Heap-0', '4096 × 32 B static. FNV exact + Hamming ball ≤ 3. No malloc on the step.'],
          ['09', 'ECHO / VERIFY', 'WSP 16 B names the act. No extract → UNKNOWN. KCC destroyed=0.'],
          ['10', 'rxOS 10 · COMING', 'Same unikernel. Echo in-OS. ISO 10 is the announcement, not a SHA-256 yet.'],
        ]
      : [
          ['07', 'Q_N = Q₈×Q₈', '65536 direcciones. Un spoke de 256 LIF. Hamming del producto = popcount. No son 65536 neuronas.'],
          ['08', 'CAM Heap-0', '4096 × 32 B estático. FNV exacto + bola Hamming ≤ 3. El paso no hace malloc.'],
          ['09', 'ECHO / VERIFY', 'WSP 16 B nombra el acto. Sin extracto → DESCONOCIDO. KCC destroyed=0.'],
          ['10', 'rxOS 10 · PRÓXIMO', 'El mismo unikernel. Echo in-OS. La ISO 10 es el anuncio, no un SHA-256 todavía.'],
        ];
  return (
    <div className="mini-arch mini-arch-10" data-reveal>
      {layers.map(([layer, title, text]) => (
        <div className="mini-arch-layer" key={layer}>
          <span>{layer}</span>
          <strong>{title}</strong>
          <p>{text}</p>
          <code>NAVI 10 · rxOS 10</code>
        </div>
      ))}
    </div>
  );
}

export function RadioMark() {
  return <Radio size={16} strokeWidth={1.8} aria-hidden />;
}
