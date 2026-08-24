/* Markdown viewer — hand-rolled parser (no dependencies), EchOS style.
   Supports: # headings, ``` fences, - lists, 1. lists, > quotes, tables,
   **bold**, *italic*, `code`, [links](url), --- rules, blank-line paragraphs. */
import { Link } from 'react-router-dom';

function inline(text, keyBase) {
  const out = [];
  let rest = text;
  let k = 0;
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*\n]+\*)|(\[[^\]]+\]\([^)\s]+\))/;
  while (rest.length) {
    const m = rest.match(re);
    if (!m || m.index === undefined) {
      out.push(rest);
      break;
    }
    if (m.index > 0) out.push(rest.slice(0, m.index));
    const tok = m[0];
    const key = `${keyBase}-${k++}`;
    if (tok.startsWith("`")) {
      out.push(<code key={key}>{tok.slice(1, -1)}</code>);
    } else if (tok.startsWith("**")) {
      out.push(<strong key={key}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("*")) {
      out.push(<em key={key}>{tok.slice(1, -1)}</em>);
    } else {
      const lm = tok.match(/\[([^\]]+)\]\(([^)\s]+)\)/);
      if (lm) {
        const href = lm[2];
        out.push(
          href.startsWith("http") ? (
            <a key={key} href={href} target="_blank" rel="noopener noreferrer">
              {lm[1]}
            </a>
          ) : (
            <Link key={key} to={href}>
              {lm[1]}
            </Link>
          )
        );
      } else out.push(tok);
    }
    rest = rest.slice((m.index ?? 0) + tok.length);
  }
  return out;
}

function renderMd(src) {
  const lines = src.split("\n");
  const blocks = [];
  let i = 0;
  let key = 0;
  const nk = () => `b${key++}`;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++;
      blocks.push(
        <pre key={nk()} className="md-code">
          <code>{code.join("\n")}</code>
        </pre>
      );
      continue;
    }

    const h = line.match(/^(#{1,4})\s+(.*)/);
    if (h) {
      const lvl = h[1].length;
      const Tag = ["h1", "h2", "h3", "h4"][lvl - 1];
      blocks.push(<Tag key={nk()}>{inline(h[2], nk())}</Tag>);
      i++;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(<li key={nk()}>{inline(lines[i].replace(/^\s*[-*]\s+/, ""), nk())}</li>);
        i++;
      }
      blocks.push(<ul key={nk()}>{items}</ul>);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(<li key={nk()}>{inline(lines[i].replace(/^\s*\d+\.\s+/, ""), nk())}</li>);
        i++;
      }
      blocks.push(<ol key={nk()}>{items}</ol>);
      continue;
    }

    if (line.startsWith(">")) {
      const q = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        q.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(<blockquote key={nk()}>{inline(q.join(" "), nk())}</blockquote>);
      continue;
    }

    if (line.includes("|") && i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
      const cells = (r) =>
        r.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
      const head = cells(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].includes("|")) rows.push(cells(lines[i++]));
      blocks.push(
        <div key={nk()} className="table-wrap">
          <table>
            <thead>
              <tr>{head.map((c, ci) => <th key={ci}>{inline(c, `h${ci}`)}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>{r.map((c, ci) => <td key={ci}>{inline(c, `c${ri}-${ci}`)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (/^---+\s*$/.test(line)) {
      blocks.push(<hr key={nk()} />);
      i++;
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("```") &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !lines[i].startsWith(">") &&
      !/^---+\s*$/.test(lines[i])
    ) {
      para.push(lines[i++]);
    }
    blocks.push(<p key={nk()}>{inline(para.join(" "), nk())}</p>);
  }
  return blocks;
}

export function Markdown({ source }) {
  return <article className="prose md-view">{renderMd(source)}</article>;
}
