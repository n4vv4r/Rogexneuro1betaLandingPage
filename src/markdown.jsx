import React from 'react';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inline(text, keyBase = 'i') {
  const out = [];
  const re =
    /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\([^)]+\))|(!\[[^\]]*\]\([^)]+\))/g;
  let last = 0;
  let m;
  let n = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(esc(text.slice(last, m.index)));
    const tok = m[0];
    if (tok.startsWith('![')) {
      const alt = tok.slice(2, tok.indexOf(']'));
      const src = tok.slice(tok.indexOf('(') + 1, -1);
      out.push(
        <img key={`${keyBase}-img-${n++}`} src={src} alt={alt} className="md-img" />,
      );
    } else if (tok.startsWith('[')) {
      const label = tok.slice(1, tok.indexOf(']'));
      const href = tok.slice(tok.indexOf('(') + 1, -1);
      const internal = href.startsWith('/') || href.endsWith('.md');
      out.push(
        <a
          key={`${keyBase}-a-${n++}`}
          href={href}
          {...(internal ? {} : { target: '_blank', rel: 'noreferrer' })}
        >
          {label}
        </a>,
      );
    } else if (tok.startsWith('`')) {
      out.push(<code key={`${keyBase}-c-${n++}`}>{tok.slice(1, -1)}</code>);
    } else if (tok.startsWith('**')) {
      out.push(<strong key={`${keyBase}-b-${n++}`}>{tok.slice(2, -2)}</strong>);
    } else {
      out.push(<em key={`${keyBase}-e-${n++}`}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(esc(text.slice(last)));
  return out;
}

function rewriteImgs(md, baseDir) {
  return md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    if (/^https?:\/\//.test(src) || src.startsWith('/')) {
      return `![${alt}](${src})`;
    }
    const clean = src.replace(/^\.\//, '');
    return `![${alt}](${baseDir}${clean})`;
  });
}

function isFence(line) {
  return line.startsWith('```');
}

function isHeading(line) {
  return /^#{1,4}\s+/.test(line);
}

function isHr(line) {
  return /^---+$/.test(line.trim());
}

function isBullet(line) {
  return /^\s*[-*]\s+/.test(line);
}

function isOrdered(line) {
  // Require space after the dot so "6.5 ya razona" is a paragraph, not item 6.
  return /^\s*\d+\.\s+/.test(line);
}

function isTableRow(line) {
  return /^\|/.test(line);
}

function isTableSep(line) {
  return /^\|?\s*:?-{3,}/.test(line);
}

function isBlockStart(line) {
  return isFence(line) || isHeading(line) || isHr(line) || isBullet(line)
    || isOrdered(line) || isTableRow(line);
}

export function renderMarkdown(raw, { baseDir = '/' } = {}) {
  const src = rewriteImgs(String(raw || '').replace(/\r\n/g, '\n'), baseDir);
  const lines = src.split('\n');
  const blocks = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (isFence(line)) {
      const lang = line.slice(3).trim();
      const buf = [];
      i++;
      while (i < lines.length && !isFence(lines[i])) buf.push(lines[i++]);
      if (i < lines.length) i++;
      blocks.push(
        <pre key={`pre-${k++}`} className="md-pre">
          <code className={lang ? `lang-${lang}` : undefined}>{buf.join('\n')}</code>
        </pre>,
      );
      continue;
    }

    if (isTableRow(line) && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const rows = [];
      while (i < lines.length && isTableRow(lines[i])) {
        if (isTableSep(lines[i])) {
          i++;
          continue;
        }
        const cells = lineCells(lines[i]);
        rows.push(cells);
        i++;
      }
      const [head, ...body] = rows;
      if (!head) {
        continue;
      }
      blocks.push(
        <div key={`tbl-${k++}`} className="md-table-wrap">
          <table className="md-table">
            <thead>
              <tr>
                {head.map((c, j) => (
                  <th key={j}>{inline(c, `th${k}${j}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, r) => (
                <tr key={r}>
                  {row.map((c, j) => (
                    <td key={j}>{inline(c, `td${k}${r}${j}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (isHr(line)) {
      blocks.push(<hr key={`hr-${k++}`} />);
      i++;
      continue;
    }

    const hm = /^(#{1,4})\s+(.*)$/.exec(line);
    if (hm) {
      const lvl = hm[1].length;
      const Tag = `h${lvl}`;
      blocks.push(
        <Tag key={`h-${k++}`} className={`md-h md-h${lvl}`}>
          {inline(hm[2], `h${k}`)}
        </Tag>,
      );
      i++;
      continue;
    }

    if (isBullet(line)) {
      const items = [];
      while (i < lines.length && isBullet(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={`ul-${k++}`} className="md-ul">
          {items.map((t, j) => (
            <li key={j}>{inline(t, `li${k}${j}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (isOrdered(line)) {
      const items = [];
      while (i < lines.length && isOrdered(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={`ol-${k++}`} className="md-ol">
          {items.map((t, j) => (
            <li key={j}>{inline(t, `oli${k}${j}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    if (!line.trim()) {
      i++;
      continue;
    }

    const para = [];
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) {
      para.push(lines[i]);
      i++;
    }
    if (!para.length) {
      // Orphan block marker (e.g. a lone "|"); never spin.
      i++;
      continue;
    }
    blocks.push(
      <p key={`p-${k++}`} className="md-p">
        {inline(para.join(' '), `p${k}`)}
      </p>,
    );
  }

  return blocks;
}

function lineCells(line) {
  let s = line.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|')) s = s.slice(0, -1);
  return s.split('|').map((c) => c.trim());
}
