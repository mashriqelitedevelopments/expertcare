/**
 * Client reviews, copied word for word from the brokerage's Google Business Profile. Nothing here
 * may be written, edited or paraphrased: a review that is not real breaks UAE consumer protection
 * rules and Google's terms. The section stays hidden until there are at least MIN_REVIEWS.
 *
 * No review markup is emitted. Google does not show star ratings for reviews a business publishes
 * about itself on its own site, so the markup would add nothing and risk a manual action.
 */
export type Review = {
  name: string;
  /** 1 to 5, as given on Google. */
  rating: number;
  text: string;
  /** "YYYY-MM", the month the review was posted. */
  date: string;
};

export const REVIEWS: Review[] = [];

/** The public Google Business Profile, with the overall rating and count it shows. */
export const REVIEW_PROFILE: { url: string; rating: number | null; count: number | null } = {
  url: "",
  rating: null,
  count: null,
};

export const MIN_REVIEWS = 3;
export const showReviews = () => REVIEWS.length >= MIN_REVIEWS;
