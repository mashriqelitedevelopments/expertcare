/**
 * The ExpertCare mark: a solid square with a door cut out of it, the door's lintel one unit
 * lower than the square's top. The wordmark is condensed Archivo in capitals; the dot after it
 * is the same square at text size.
 */
export function Mark({ size = 26 }: { size?: number }) {
  return (
    <svg className="mark" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fillRule="evenodd" d="M0 0h24v24H0V0zm9 7v17h6V7H9z" fill="currentColor" />
    </svg>
  );
}

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <span className={`logo${small ? " logo-sm" : ""}`}>
      <Mark size={small ? 20 : 26} />
      <span className="logo-word">
        ExpertCare<i aria-hidden="true" />
      </span>
    </span>
  );
}
