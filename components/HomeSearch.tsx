import { places } from "@/lib/content";
import { aedShort } from "@/lib/format";
import { lp } from "@/lib/i18n";
import { PRICE_STEPS, PROPERTY_TYPES } from "@/lib/listings";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

/** A plain GET form, drawn as a ticket: it works before JavaScript loads and lands on the search
 * page with the filters set. */
export function HomeSearch({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const s = t.search;
  return (
    <form className="ticket" action={lp(locale, "/properties/")} method="get" role="search" aria-label={s.label}>
      <div className="ticket-head">
        <span>{s.label}</span>
        <div className="seg" role="radiogroup" aria-label={s.mode}>
          {[
            ["", s.all],
            ["ready", s.ready],
            ["off-plan", s.offPlan],
          ].map(([value, label]) => (
            <label key={value}>
              <input type="radio" name="status" value={value} defaultChecked={value === ""} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="ticket-rows">
        <div className="field">
          <label htmlFor="s-area">{s.area}</label>
          <select id="s-area" name="area" defaultValue="">
            <option value="">{s.allAreas}</option>
            {places(locale).map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="s-type">{s.type}</label>
          <select id="s-type" name="type" defaultValue="">
            <option value="">{s.anyType}</option>
            {PROPERTY_TYPES.map((p) => (
              <option key={p} value={p}>
                {t.results.typePlural[p]}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="s-beds">{s.beds}</label>
          <select id="s-beds" name="beds" defaultValue="">
            <option value="">{s.anyBeds}</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="s-max">{s.budget}</label>
          <select id="s-max" name="max" defaultValue="">
            <option value="">{s.anyBudget}</option>
            {PRICE_STEPS.map((p) => (
              <option key={p} value={p}>
                {aedShort(p, locale)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn btn-clay" type="submit">
        {s.submit}
      </button>
    </form>
  );
}
