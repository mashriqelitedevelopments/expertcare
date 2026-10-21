import { Arrow, Star } from "./Icons";
import { Rail } from "./Rail";
import type { Locale } from "@/lib/locale";
import { REVIEWS, REVIEW_PROFILE, showReviews } from "@/lib/reviews";
import { ui } from "@/lib/ui";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const month = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return m ? `${MONTHS[m - 1]} ${y}` : String(y);
};

function Stars({ n, label }: { n: number; label: string }) {
  return (
    <span className="stars" role="img" aria-label={`${n} ${label}`}>
      {Array.from({ length: 5 }).map((_, k) => (
        <span key={k} className={k < Math.round(n) ? "on" : undefined}>
          <Star />
        </span>
      ))}
    </span>
  );
}

/** Real Google reviews, word for word. Renders nothing until there are enough of them. */
export function Reviews({ locale }: { locale: Locale }) {
  if (!showReviews()) return null;
  const t = ui(locale);
  const r = t.reviews;
  const p = REVIEW_PROFILE;
  return (
    <section className="sec" aria-labelledby="reviews-h">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <h2 id="reviews-h">{r.h}</h2>
            {p.rating !== null && p.count !== null && (
              <p className="reviews-sum">
                <Stars n={p.rating} label={r.stars} />
                <span>
                  {p.rating.toFixed(1)} {r.outOf}, {r.from} {p.count} {r.reviewsWord} {r.onGoogle}
                </span>
              </p>
            )}
          </div>
          {p.url && (
            <a href={p.url} className="more" target="_blank" rel="noopener noreferrer">
              {r.allReviews} <Arrow />
            </a>
          )}
        </div>
        <Rail prevLabel={r.prev} nextLabel={r.next}>
          {REVIEWS.map((x) => (
            <figure key={`${x.name}-${x.date}`} className="review rv">
              <Stars n={x.rating} label={r.stars} />
              <blockquote>
                <p>{x.text}</p>
              </blockquote>
              <figcaption>
                <strong>{x.name}</strong>
                <span>
                  {month(x.date)} · {r.onGoogle}
                </span>
              </figcaption>
            </figure>
          ))}
        </Rail>
      </div>
    </section>
  );
}
