"use client";

import { useEffect, useRef, useState } from "react";
import { aed, num } from "@/lib/format";
import type { Locale } from "@/lib/locale";

/**
 * Single-series charts for the price pages, following the site's dataviz rules: one validated
 * series colour (--chart, #9b2c3f: in the lightness band, 3:1+ on ivory), 2px lines, a 10% area
 * wash, columns capped at 24px with a 4px rounded top and a square baseline, hairline grid, one
 * y-axis starting at zero, the latest value labelled at the line end, a crosshair tooltip, arrow-key
 * navigation, and a table view next to every chart (rendered by the page, so no value is gated).
 * Time runs left to right in both editions.
 */
export type Point = { key: string; label: string; value: number | null };

const H = 260;
const PAD = { l: 64, r: 72, t: 16, b: 30 };

function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setW(el.clientWidth);
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

function ticksFor(max: number, count = 4) {
  if (max <= 0) return { top: 1, ticks: [0, 1] };
  const raw = max / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw)!;
  const top = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = 0; v <= top + step / 1000; v += step) ticks.push(v);
  return { top, ticks };
}

function Frame({
  points,
  format,
  axisFormat,
  ariaLabel,
  children,
}: {
  points: Point[];
  format: (n: number) => string;
  axisFormat: (n: number) => string;
  ariaLabel: string;
  children: (g: { x: (i: number) => number; y: (v: number) => number; band: number; base: number; active: number | null; w: number }) => React.ReactNode;
}) {
  const [ref, w] = useWidth();
  const [active, setActive] = useState<number | null>(null);
  const n = points.length;
  const max = Math.max(0, ...points.map((p) => p.value ?? 0));
  const { top, ticks } = ticksFor(max);
  const inner = Math.max(1, w - PAD.l - PAD.r);
  const band = inner / n;
  const base = H - PAD.b;
  const x = (i: number) => PAD.l + band * (i + 0.5);
  const y = (v: number) => base - (v / top) * (base - PAD.t);
  const yearEvery = band * 4 < 44 ? 2 : 1;

  const pick = (clientX: number) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const i = Math.floor((clientX - box.left - PAD.l) / band);
    setActive(i >= 0 && i < n ? i : null);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    setActive((a) => {
      const start = a ?? n - 1;
      return Math.min(n - 1, Math.max(0, start + (e.key === "ArrowRight" ? 1 : -1)));
    });
  };
  const p = active != null ? points[active] : null;

  return (
    <div
      ref={ref}
      className="chart"
      dir="ltr"
      role="img"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKey}
      onBlur={() => setActive(null)}
      onPointerMove={(e) => pick(e.clientX)}
      onPointerLeave={() => setActive(null)}
    >
      {w > 0 && (
        <svg width={w} height={H} aria-hidden="true">
          {ticks.map((t) => (
            <g key={t}>
              <line className={t === 0 ? "base" : "grid"} x1={PAD.l} x2={w - PAD.r} y1={y(t)} y2={y(t)} />
              <text className="tick" x={PAD.l - 10} y={y(t)} dy="0.32em" textAnchor="end">
                {axisFormat(t)}
              </text>
            </g>
          ))}
          {points.map((pt, i) =>
            pt.key.endsWith("-Q1") && Number(pt.key.slice(0, 4)) % yearEvery === 0 ? (
              <text key={pt.key} className="tick" x={PAD.l + band * i} y={H - 8} textAnchor="start">
                {pt.key.slice(0, 4)}
              </text>
            ) : null,
          )}
          {active != null && <line className="cross" x1={x(active)} x2={x(active)} y1={PAD.t} y2={base} />}
          {children({ x, y, band, base, active, w })}
        </svg>
      )}
      {p && (
        <div className="tip" style={{ left: x(active!), top: p.value != null ? y(p.value) - 12 : PAD.t }}>
          <strong>{p.value != null ? format(p.value) : "—"}</strong>
          <span>{p.label}</span>
        </div>
      )}
    </div>
  );
}

/** Props must stay serialisable (these render inside server pages), so values are formatted here
 * from a unit name rather than from a function passed in. */
type Unit = "aed" | "count";
type ChartProps = { points: Point[]; unit: Unit; locale: Locale; ariaLabel: string };
const formatter = (unit: Unit, locale: Locale) => (unit === "aed" ? (n: number) => aed(n, locale) : (n: number) => num(n));

export function LineChart({ points, unit, locale, ariaLabel }: ChartProps) {
  const format = formatter(unit, locale);
  const axisFormat = (n: number) => num(n);
  return (
    <Frame points={points} format={format} axisFormat={axisFormat} ariaLabel={ariaLabel}>
      {({ x, y, base, active }) => {
        const runs: { i: number; v: number }[][] = [];
        let run: { i: number; v: number }[] = [];
        points.forEach((p, i) => {
          if (p.value == null) {
            if (run.length) runs.push(run);
            run = [];
          } else run.push({ i, v: p.value });
        });
        if (run.length) runs.push(run);
        const last = [...points.keys()].reverse().find((i) => points[i].value != null);
        return (
          <>
            {runs.map((r, k) => {
              const d = r.map((pt, j) => `${j ? "L" : "M"}${x(pt.i)},${y(pt.v)}`).join(" ");
              const area = `${d} L${x(r[r.length - 1].i)},${base} L${x(r[0].i)},${base} Z`;
              return (
                <g key={k}>
                  <path className="wash" d={area} />
                  <path className="line" d={d} />
                </g>
              );
            })}
            {last != null && (
              <>
                <circle className="dot" cx={x(last)} cy={y(points[last].value!)} r={4} />
                <text className="endlabel" x={x(last) + 10} y={y(points[last].value!)} dy="0.32em">
                  {format(points[last].value!)}
                </text>
              </>
            )}
            {active != null && points[active].value != null && active !== last && <circle className="dot" cx={x(active)} cy={y(points[active].value!)} r={4} />}
          </>
        );
      }}
    </Frame>
  );
}

export function ColumnChart({ points, unit, locale, ariaLabel }: ChartProps) {
  const format = formatter(unit, locale);
  const axisFormat = (n: number) => num(n);
  return (
    <Frame points={points} format={format} axisFormat={axisFormat} ariaLabel={ariaLabel}>
      {({ x, y, band, base, active }) => {
        const bw = Math.max(2, Math.min(24, band - 2));
        return (
          <>
            {points.map((p, i) => {
              if (!p.value) return null;
              const left = x(i) - bw / 2;
              const topY = y(p.value);
              const r = Math.min(4, bw / 2, base - topY);
              const d = `M${left},${base} V${topY + r} Q${left},${topY} ${left + r},${topY} H${left + bw - r} Q${left + bw},${topY} ${left + bw},${topY + r} V${base} Z`;
              return <path key={p.key} className={i === active ? "col is-active" : "col"} d={d} />;
            })}
          </>
        );
      }}
    </Frame>
  );
}
