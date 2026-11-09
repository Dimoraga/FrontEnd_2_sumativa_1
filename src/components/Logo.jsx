export default function Logo({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Logo Don Honesto">
      <circle cx="32" cy="32" r="30" fill="#b91c1c" />
      <circle cx="32" cy="32" r="26" fill="none" stroke="#fff" strokeWidth="2" />
      <path d="M14 20h6l5 18h20l5-14H24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="46" r="3" fill="#fff" />
      <circle cx="43" cy="46" r="3" fill="#fff" />
      <path d="M30 29l4 4 8-9" fill="none" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
