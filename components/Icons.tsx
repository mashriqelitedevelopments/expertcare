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

export const Pin = () => (
  <svg {...base}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const Phone = () => (
  <svg {...base}>
    <path
      d="M6.6 3.5h2.6l1.4 4-2 1.4a11.5 11.5 0 0 0 6.5 6.5l1.4-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const WhatsAppIcon = () => (
  <svg {...base}>
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8zm-3.3 4.4c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.3s1 2.7 1.1 2.9c.2.2 2 3.1 4.9 4.2 2.4.9 2.9.8 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5.3-.5v-.5l-1-2.2c-.2-.5-.4-.5-.6-.5h-.4z"
    />
  </svg>
);

export const Mail = () => (
  <svg {...base}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 6.5l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const Star = () => (
  <svg {...base}>
    <path fill="currentColor" d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" />
  </svg>
);

export const Close = () => (
  <svg {...base}>
    <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const Grid = () => (
  <svg {...base}>
    <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
