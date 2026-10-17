const base = { "aria-hidden": true, focusable: false, viewBox: "0 0 24 24" } as const;

export const Heart = () => (
  <svg {...base}>
    <path
      d="M12 20.3s-7.4-4.5-9.2-9.1C1.5 7.9 3.5 4.6 6.9 4.6c2.1 0 3.6 1.1 5.1 2.9 1.5-1.8 3-2.9 5.1-2.9 3.4 0 5.4 3.3 4.1 6.6-1.8 4.6-9.2 9.1-9.2 9.1z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const Chat = () => (
  <svg {...base}>
    <path
      d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.4 18.6z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const Arrow = () => (
  <svg {...base}>
    <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
