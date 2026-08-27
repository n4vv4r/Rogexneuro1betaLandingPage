/* Markdown viewer — hand-rolled parser (no dependencies), EchOS style.
   Supports: # headings, ``` fences, - lists, 1. lists, > quotes, tables,
   **bold**, *italic*, `code`, [links](url), --- rules, blank-line paragraphs.

   A line that merely *starts* with `#` (hex colours, #GP, preprocessor) is
   not a heading. Treating it as one and then skipping it in the paragraph
   scanner used to spin forever and freeze every browser on /docs. */
import { Component } from "react";
import { Link } from "react-router-dom";

const RE_HEADING = /^(#{1,6})\s+(.*)$/;
const RE_UL = /^\s*[-*]\s+/;
const RE_OL = /^\s*\d+\.\s+/;
const RE_HR = /^---+\s*$/;
const RE_TABLE_SEP = /^\s*\|[\s:|-]+\|\s*$/;

function asText(src) {
  if (typeof src === "string") return src;
  if (src && typeof src === "object" && typeof src.default === "string") return src.default;
  return src == null ? "" : String(src);
}

function isFence(s) {
  return s.trimStart().startsWith("```");
}

function inline(text, keyBase) {
  const out = [];
  let rest = text;
  let k = 0;
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*\n]+\*)|(\[[^\]]+\]\([^)\s]+\))/;
  let guard = 0;
  while (rest.length) {
    if (++guard > rest.length + 8) {
      out.push(rest);
      break;
    }
    const m = rest.match(re);
    if (!m || m.index === undefined) {
      out.push(rest);
      break;
    }
    if (m.index > 0) out.push(rest.slice(0, m.index));
    const tok = m[0];
    if (!tok.length) {
      out.push(rest);
      break;
    }
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

function isBlockStart(s) {
  return (
    isFence(s) ||
    RE_HEADING.test(s) ||
    RE_UL.test(s) ||
    RE_OL.test(s) ||
    s.startsWith(">") ||
    RE_HR.test(s)
  );
}

export function renderMd(src) {
  const lines = asText(src).split("\n");
  const blocks = [];
  let i = 0;
  let key = 0;
  const nk = () => `b${key++}`;
  const limit = lines.length * 8 + 32;
  let steps = 0;

  while (i < lines.length) {
    if (++steps > limit) break;
    const start = i;
    const line = lines[i];

    if (isFence(line)) {
      const code = [];
      i++;
      while (i < lines.length && !isFence(lines[i])) code.push(lines[i++]);
      if (i < lines.length) i++;
      blocks.push(
        <pre key={nk()} className="md-code">
          <code>{code.join("\n")}</code>
        </pre>
      );
      continue;
    }

    const h = line.match(RE_HEADING);
    if (h) {
      const lvl = Math.min(h[1].length, 6);
      const Tag = ["h1", "h2", "h3", "h4", "h5", "h6"][lvl - 1];
      const slug = h[2]
        .toLowerCase()
        .replace(/[`*_]/g, "")
        .replace(/[^a-z0-9áéíóúñü]+/gi, "-")
        .replace(/^-|-$/g, "");
      blocks.push(
        <Tag key={nk()} id={slug || undefined}>
          {inline(h[2], nk())}
        </Tag>
      );
      i++;
      continue;
    }

    if (RE_UL.test(line)) {
      const items = [];
      while (i < lines.length && RE_UL.test(lines[i])) {
        items.push(<li key={nk()}>{inline(lines[i].replace(RE_UL, ""), nk())}</li>);
        i++;
      }
      blocks.push(<ul key={nk()}>{items}</ul>);
      continue;
    }

    if (RE_OL.test(line)) {
      const items = [];
      while (i < lines.length && RE_OL.test(lines[i])) {
        items.push(<li key={nk()}>{inline(lines[i].replace(RE_OL, ""), nk())}</li>);
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

    if (line.includes("|") && i + 1 < lines.length && RE_TABLE_SEP.test(lines[i + 1])) {
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

    if (RE_HR.test(line)) {
      blocks.push(<hr key={nk()} />);
      i++;
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    const para = [];
    while (i < lines.length && lines[i].trim() !== "" && !isBlockStart(lines[i])) {
      para.push(lines[i++]);
    }
    if (para.length) {
      blocks.push(<p key={nk()}>{inline(para.join(" "), nk())}</p>);
    }

    if (i === start) {
      blocks.push(<p key={nk()}>{inline(line, nk())}</p>);
      i++;
    }
  }
  return blocks;
}

class MdBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <article className="prose md-view">
          <p>This document failed to render. Pick another page from the sidebar.</p>
        </article>
      );
    }
    return this.props.children;
  }
}

export function Markdown({ source }) {
  let body;
  try {
    body = renderMd(source);
  } catch {
    body = <p>This document failed to render. Pick another page from the sidebar.</p>;
  }
  return (
    <MdBoundary>
      <article className="prose md-view">{body}</article>
    </MdBoundary>
  );
}
