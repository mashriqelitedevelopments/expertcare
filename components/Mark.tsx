/**
 * The ExpertCare mark: a house gable whose right slope continues into a check, drawn as one
 * stroke, inside nothing. The wordmark sets "Expert" at text weight and "Care" in the serif
 * italic, so the two halves of the name read as what they are: knowledge and attention.
 */
export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg className="mark" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M3 17.5 16 5l13 12.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 16.5V27h8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.5 22.5 21 26l8-9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <span className={`logo${small ? " logo-sm" : ""}`}>
      <Mark size={small ? 22 : 28} />
      <span className="logo-word">
        Expert<em>Care</em>
      </span>
    </span>
  );
}
