import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, Cpu, Download, Hexagon, Sparkles } from 'lucide-react';
import { useLang } from './lang.jsx';
import { Spec10Table, Sku10Table } from './Launch10.jsx';
import { renderMarkdown } from './markdown.jsx';

const ISO = 'https://github.com/knightslabs/RXos-Packages/releases/tag/v9.0.0';
const CODE = 'https://github.com/navywakura/RXos';

function Hero({ kicker, title, text, children, accent }) {
  return (
    <section className={`now-hero${accent ? ` is-${accent}` : ''}`}>
      <div className="wrap now-hero-inner">
        <span className="kicker">{kicker}</span>
        <h1>{title}</h1>
        <p className="now-lede">{text}</p>
        {children}
      </div>
    </section>
  );
}

function Actions({ children }) {
  return <div className="hero-actions now-actions">{children}</div>;
}

function DiaryHome({ navigate }) {
  const { lang, t } = useLang();
  const [raw, setRaw] = useState('');
  const src = lang === 'en' ? '/docs/rxos/DIARIO.en.md' : '/docs/rxos/DIARIO.md';
  useEffect(() => {
    let live = true;
    fetch(src)
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((text) => {
        if (live) setRaw(text);
      })
      .catch(() => {
        if (live) setRaw('');
      });
    return () => {
      live = false;
    };
  }, [src]);
  const body = useMemo(() => (raw ? renderMarkdown(raw, { baseDir: '/docs/rxos/' }) : null), [raw]);
  return (
    <section className="section wrap" id="cuaderno">
      <div className="diary-sheet">
        <header className="diary-meta">
          <span>{t('diaryStamp')}</span>
          <em>20 · 08 · 2026</em>
        </header>
        <div className="diary-body md-body">{body}</div>
        <button type="button" className="brutal-button" onClick={() => navigate('/docs/diario')}>
          {t('diaryOpen')}
        </button>
      </div>
    </section>
  );
}

export function HomeNow({ navigate }) {
  const { t } = useLang();
  return (
    <>
      <Hero kicker={t('homeKicker')} title={t('homeTitle')} text={t('homeLede')} accent="acid">
        <Actions>
          <button type="button" className="brutal-button primary" onClick={() => navigate('/navi')}>
            {t('launchCtaNavi')} <ArrowUpRight size={14} />
          </button>
          <button type="button" className="brutal-button" onClick={() => navigate('/rx-os')}>
            {t('launchCtaRxos')}
          </button>
          <button type="button" className="brutal-button" onClick={() => navigate('/docs')}>
            {t('docs')}
          </button>
          <a className="brutal-button" href={ISO}>{t('launchCtaIso')} <ArrowUpRight size={14} /></a>
        </Actions>
      </Hero>
      <main>
        <DiaryHome navigate={navigate} />
        <section className="section wrap">
          <div className="now-pair">
            <article className="now-card is-live">
              <Hexagon size={22} strokeWidth={1.5} />
              <span className="now-pill">{t('hostLive')}</span>
              <h2>NAVI 10 Echo</h2>
              <p>{t('launchNaviBlurb')}</p>
              <button type="button" className="brutal-button primary" onClick={() => navigate('/navi')}>
                {t('readMore')}
              </button>
            </article>
            <article className="now-card is-soon">
              <Cpu size={22} strokeWidth={1.5} />
              <span className="now-pill soon">{t('comingSoon')}</span>
              <h2>rxOS 10</h2>
              <p>{t('launchRxosBlurb')}</p>
              <button type="button" className="brutal-button" onClick={() => navigate('/rx-os')}>
                {t('readMore')}
              </button>
            </article>
          </div>
        </section>
        <section className="section wrap">
          <h2 className="now-h">{t('homeHowTitle')}</h2>
          <p className="now-sub">{t('homeHowText')}</p>
          <div className="now-steps">
            {[1, 2, 3].map((n) => (
              <article key={n}>
                <span>0{n}</span>
                <h3>{t(`homeStep${n}t`)}</h3>
                <p>{t(`homeStep${n}d`)}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="section wrap">
          <h2 className="now-h">{t('homeDocsTitle')}</h2>
          <p className="now-sub">{t('homeDocsText')}</p>
          <div className="now-docs">
            {[
              ['/docs/navi10', t('navNavi10'), t('homeDocNavi')],
              ['/docs/rxos10', t('navRxos10'), t('homeDocRxos')],
              ['/docs/navi10-spec', t('navSpec'), t('homeDocSpec')],
              ['/docs', t('navIndex'), t('homeDocAll')],
            ].map(([href, title, blurb]) => (
              <button type="button" key={href} className="now-doc" onClick={() => navigate(href)}>
                <strong>{title}</strong>
                <span>{blurb}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export function NaviNow({ navigate }) {
  const { t } = useLang();
  return (
    <>
      <Hero kicker={t('naviEyebrow')} title={t('naviHeroTitle')} text={t('naviHeroText')} accent="violet">
        <Actions>
          <button type="button" className="brutal-button primary" onClick={() => navigate('/docs/navi10')}>
            {t('read')} NAVI 10
          </button>
          <button type="button" className="brutal-button" onClick={() => navigate('/docs/navi10-spec')}>
            {t('naviSpecCta')}
          </button>
          <a className="brutal-button" href={CODE}>{t('code')} <ArrowUpRight size={14} /></a>
        </Actions>
      </Hero>
      <main>
        <section className="section wrap" id="puede">
          <div className="now-triple">
            <article>
              <h3>{t('naviCanH')}</h3>
              <ul>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <li key={n}>{t(`naviCan${n}`)}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>{t('naviSoonH')}</h3>
              <ul>
                {[1, 2, 3].map((n) => (
                  <li key={n}>{t(`naviSoon${n}`)}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>{t('naviTryH')}</h3>
              <pre className="now-pre">{`cd RXos
./navi10 --tui
./navi10 --ask "hola"`}</pre>
            </article>
          </div>
        </section>
        <section className="section wrap">
          <Spec10Table />
          <Sku10Table />
        </section>
        <section className="section wrap">
          <h2 className="now-h">{t('naviDocsH')}</h2>
          <div className="now-docs">
            {[
              ['/docs/navi10', 'NAVI 10 Echo'],
              ['/docs/navi10-lpu', 'LPU'],
              ['/docs/navi10-ship', t('naviShip')],
              ['/docs/navi10-train', t('naviTrain')],
              ['/docs', t('navIndex')],
            ].map(([href, title]) => (
              <button type="button" key={href} className="now-doc" onClick={() => navigate(href)}>
                <strong>{title}</strong>
                <span>{t('read')}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export function RxosNow({ navigate }) {
  const { t } = useLang();
  return (
    <>
      <Hero kicker={t('rxosEyebrow')} title={t('rxosHeroTitle')} text={t('rxosHeroText')} accent="teal">
        <Actions>
          <a className="brutal-button primary" href={ISO}>
            {t('launchCtaIso')} <ArrowUpRight size={14} />
          </a>
          <button type="button" className="brutal-button" onClick={() => navigate('/docs/rxos10')}>
            {t('read')} rxOS 10
          </button>
          <button type="button" className="brutal-button" onClick={() => navigate('/docs/setup')}>
            {t('navSetup')}
          </button>
        </Actions>
      </Hero>
      <main>
        <section className="section wrap">
          <div className="now-pair">
            <article className="now-card is-soon">
              <Sparkles size={22} strokeWidth={1.5} />
              <span className="now-pill soon">{t('comingSoon')}</span>
              <h2>rxOS 10</h2>
              <p>{t('rxos10Body')}</p>
              <button type="button" className="brutal-button" onClick={() => navigate('/docs/rxos10')}>
                {t('read')}
              </button>
            </article>
            <article className="now-card">
              <Download size={22} strokeWidth={1.5} />
              <span className="now-pill">{t('shipping')}</span>
              <h2>rxOS 9 SMOKE</h2>
              <p>{t('rxos9Body')}</p>
              <a className="brutal-button primary" href={ISO}>{t('downloadRxos9')} <ArrowUpRight size={14} /></a>
            </article>
          </div>
        </section>
        <section className="section wrap">
          <h2 className="now-h">{t('rxosDocsH')}</h2>
          <div className="now-docs">
            {[
              ['/docs/rxos10', 'rxOS 10'],
              ['/docs/setup', 'Setup'],
              ['/docs/isos', 'ISOs'],
              ['/docs/rxos9', 'rxOS 9'],
            ].map(([href, title]) => (
              <button type="button" key={href} className="now-doc" onClick={() => navigate(href)}>
                <strong>{title}</strong>
                <span>{t('read')}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export function RoadmapNow({ navigate }) {
  const { t } = useLang();
  const steps = [
    ['01', t('roadS1t'), t('roadS1d'), 'ok'],
    ['02', t('roadS2t'), t('roadS2d'), 'ok'],
    ['03', t('roadS3t'), t('roadS3d'), 'soon'],
    ['04', t('roadS4t'), t('roadS4d'), 'plan'],
  ];
  return (
    <>
      <Hero kicker={t('roadEyebrow')} title={t('roadTitle')} text={t('roadText')} accent="gold">
        <Actions>
          <button type="button" className="brutal-button primary" onClick={() => navigate('/docs/navi10')}>
            NAVI 10
          </button>
          <button type="button" className="brutal-button" onClick={() => navigate('/docs/rxos10')}>
            rxOS 10
          </button>
          <button type="button" className="brutal-button" onClick={() => navigate('/docs/eternal-eclipse')}>
            {t('navEclipse')}
          </button>
        </Actions>
      </Hero>
      <main>
        <section className="section wrap">
          <ol className="now-timeline">
            {steps.map(([n, title, text, tone]) => (
              <li key={n} className={`is-${tone}`}>
                <span>{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </>
  );
}

export function DownloadsNow({ navigate }) {
  const { t } = useLang();
  return (
    <>
      <Hero kicker={t('dlEyebrow')} title={t('dlTitle')} text={t('dlText')} accent="green">
        <Actions>
          <a className="brutal-button primary" href={ISO}>{t('launchCtaIso')} <ArrowUpRight size={14} /></a>
          <button type="button" className="brutal-button" onClick={() => navigate('/docs/setup')}>
            Setup
          </button>
          <a className="brutal-button" href={CODE}>{t('code')} <ArrowUpRight size={14} /></a>
        </Actions>
      </Hero>
      <main>
        <section className="section wrap">
          <div className="now-docs">
            <a className="now-doc" href={ISO}>
              <strong>rxOS 9.0.0</strong>
              <span>{t('dlIsoHint')}</span>
            </a>
            <a className="now-doc" href={CODE}>
              <strong>NAVI 10 · {t('code')}</strong>
              <span>./navi10 --tui</span>
            </a>
            <button type="button" className="now-doc" onClick={() => navigate('/prisma')}>
              <strong>PRISMA Engine 0.1</strong>
              <span>{t('dlPrismaHint')}</span>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export function SuiteNow({ navigate }) {
  const { t } = useLang();
  return (
    <>
      <Hero kicker={t('suiteEyebrow')} title={t('suiteHeroTitle')} text={t('suiteHeroText')} accent="orange">
        <Actions>
          <button type="button" className="brutal-button primary" onClick={() => navigate('/navi')}>NAVI 10</button>
          <button type="button" className="brutal-button" onClick={() => navigate('/rx-os')}>rxOS 10</button>
        </Actions>
      </Hero>
      <main>
        <section className="section wrap">
          <div className="now-pair">
            <article className="now-card is-live">
              <span className="now-pill">{t('hostLive')}</span>
              <h2>NAVI 10 Echo</h2>
              <p>{t('launchNaviBlurb')}</p>
              <button type="button" className="brutal-button primary" onClick={() => navigate('/navi')}>
                {t('readMore')}
              </button>
            </article>
            <article className="now-card is-soon">
              <span className="now-pill soon">{t('comingSoon')}</span>
              <h2>rxOS 10</h2>
              <p>{t('launchRxosBlurb')}</p>
              <button type="button" className="brutal-button" onClick={() => navigate('/rx-os')}>
                {t('readMore')}
              </button>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

export function ArchitectureNow({ navigate }) {
  const { t } = useLang();
  const layers = [
    ['01', t('archL1t'), t('archL1d')],
    ['02', t('archL2t'), t('archL2d')],
    ['03', t('archL3t'), t('archL3d')],
    ['04', t('archL4t'), t('archL4d')],
  ];
  return (
    <>
      <Hero kicker={t('archEyebrow')} title={t('archTitle')} text={t('archText')} accent="blue">
        <Actions>
          <button type="button" className="brutal-button primary" onClick={() => navigate('/docs/navi10')}>
            NAVI 10
          </button>
          <button type="button" className="brutal-button" onClick={() => navigate('/docs/navi10-spec')}>
            {t('navSpec')}
          </button>
        </Actions>
      </Hero>
      <main>
        <section className="section wrap">
          <div className="now-steps">
            {layers.map(([n, title, text]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export function PrismaNow({ navigate }) {
  const { t } = useLang();
  return (
    <>
      <Hero kicker={t('prismaEyebrow')} title={t('prismaTitle')} text={t('prismaText')} accent="orange">
        <Actions>
          <button type="button" className="brutal-button primary" onClick={() => navigate('/downloads')}>
            {t('navDownloads')}
          </button>
          <a className="brutal-button" href="/downloads/PRISMA-Engine-0.1.0-SHA256SUMS.txt">
            SHA-256
          </a>
          <button type="button" className="brutal-button" onClick={() => navigate('/docs')}>
            {t('docs')}
          </button>
        </Actions>
      </Hero>
      <main>
        <section className="section wrap">
          <div className="now-docs">
            <a className="now-doc" href="/downloads/prisma-engine-0.1.0-x86_64-linux.tar.gz">
              <strong>Linux</strong>
              <span>tar.gz · tech preview</span>
            </a>
            <a className="now-doc" href="/downloads/PRISMA-Engine-0.1.0-Setup.exe">
              <strong>Windows</strong>
              <span>Setup.exe · tech preview</span>
            </a>
            <a className="now-doc" href="/downloads/PRISMA-Engine-0.1.0.dmg">
              <strong>macOS</strong>
              <span>DMG · tech preview</span>
            </a>
          </div>
          <p className="now-sub" style={{ marginTop: 22 }}>{t('prismaNote')}</p>
        </section>
      </main>
    </>
  );
}

export function AboutNow({ navigate }) {
  const { t } = useLang();
  return (
    <>
      <Hero kicker={t('aboutEyebrow')} title={t('aboutTitle')} text={t('aboutText')} accent="gold">
        <Actions>
          <button type="button" className="brutal-button primary" onClick={() => navigate('/docs/diario')}>
            {t('navDiario')}
          </button>
          <button type="button" className="brutal-button" onClick={() => navigate('/navi')}>
            NAVI 10
          </button>
          <a className="brutal-button" href="mailto:knightsys@proton.me">{t('aboutWrite')}</a>
        </Actions>
      </Hero>
      <main>
        <section className="section wrap">
          <div className="now-pair">
            <article className="now-card is-live">
              <span className="now-pill">{t('hostLive')}</span>
              <h2>NAVI 10 Echo</h2>
              <p>{t('launchNaviBlurb')}</p>
              <button type="button" className="brutal-button primary" onClick={() => navigate('/navi')}>
                {t('readMore')}
              </button>
            </article>
            <article className="now-card is-soon">
              <span className="now-pill soon">{t('comingSoon')}</span>
              <h2>rxOS 10</h2>
              <p>{t('launchRxosBlurb')}</p>
              <button type="button" className="brutal-button" onClick={() => navigate('/rx-os')}>
                {t('readMore')}
              </button>
            </article>
          </div>
        </section>
        <section className="section wrap">
          <h2 className="now-h">{t('aboutContactH')}</h2>
          <p className="now-sub">{t('aboutContactT')}</p>
          <div className="now-docs">
            <a className="now-doc" href="mailto:knightsys@proton.me">
              <strong>knightsys@proton.me</strong>
              <span>Lab / OEM</span>
            </a>
            <a className="now-doc" href="https://www.knightscomputer.club" target="_blank" rel="noreferrer">
              <strong>Knights Computer Club</strong>
              <span>{t('aboutKcc')}</span>
            </a>
            <a className="now-doc" href="https://newspaper.rogexlaboratories.com" target="_blank" rel="noreferrer">
              <strong>Newspaper</strong>
              <span>{t('aboutNews')}</span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

export function LabNow({ navigate }) {
  const { t } = useLang();
  return (
    <>
      <Hero kicker={t('labEyebrow')} title={t('labTitle')} text={t('labText')} accent="gold">
        <Actions>
          <button type="button" className="brutal-button primary" onClick={() => navigate('/docs/diario')}>
            {t('navDiario')}
          </button>
          <a className="brutal-button" href="mailto:knightsys@proton.me">{t('aboutWrite')}</a>
          <button type="button" className="brutal-button" onClick={() => navigate('/navi')}>
            NAVI 10
          </button>
        </Actions>
      </Hero>
      <main>
        <section className="section wrap">
          <div className="now-steps">
            {[1, 2, 3].map((n) => (
              <article key={n}>
                <span>0{n}</span>
                <h3>{t(`labS${n}t`)}</h3>
                <p>{t(`labS${n}d`)}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export { BookOpen, Hero };
