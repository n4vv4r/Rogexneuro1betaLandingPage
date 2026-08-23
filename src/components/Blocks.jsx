export function Blocks({ blocks }) {
  return blocks.map((block, i) => {
    if (block.h2) return <h2 key={i}>{block.h2}</h2>;
    if (block.p) return <p key={i}>{block.p}</p>;
    if (block.ul) {
      return (
        <ul key={i}>
          {block.ul.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    }
    if (block.code) {
      return (
        <pre key={i}>
          <code>{block.code}</code>
        </pre>
      );
    }
    return null;
  });
}
