import Link from "next/link";

/** The table twin of a chart: every plotted value, reachable without hovering. */
export function TableView({ summary, caption, head, rows }: { summary: string; caption: string; head: string[]; rows: (string | number)[][] }) {
  return (
    <details className="tview">
      <summary>{summary}</summary>
      <div className="tbl-wrap">
        <table className="tbl">
          <caption className="sr">{caption}</caption>
          <thead>
            <tr>
              {head.map((h) => (
                <th scope="col" key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={String(r[0])}>
                {r.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

/** Horizontal bars in plain HTML: every value is labelled at the bar tip, so no tooltip is needed,
 * and the bars grow from the reading edge in either direction. */
export function HBars({ rows, format, label }: { rows: { key: string; label: string; href: string; value: number }[]; format: (n: number) => string; label: string }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <ol className="hbars" aria-label={label}>
      {rows.map((r) => (
        <li key={r.key}>
          <Link href={r.href}>{r.label}</Link>
          <span className="hbar-track">
            <span className="hbar" style={{ width: `${(r.value / max) * 100}%` }} />
          </span>
          <span className="hbar-val">{format(r.value)}</span>
        </li>
      ))}
    </ol>
  );
}
