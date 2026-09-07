export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="6" fill="#b4451a" />
      <path
        d="M21.6 10.4a7.4 7.4 0 1 0 0 11.2"
        fill="none"
        stroke="#fffaf2"
        strokeWidth="3.1"
        strokeLinecap="round"
      />
      <path
        d="M15.2 16h8.4v5.4"
        fill="none"
        stroke="#fffaf2"
        strokeWidth="3.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
