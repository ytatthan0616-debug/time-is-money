export function MouthOfTruthFace({
  dropping,
  className = "h-40 w-40 sm:h-48 sm:w-48",
}: {
  dropping: boolean;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-label="真実の口" role="img">
      <defs>
        <radialGradient id="stone" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#e8ddc7" />
          <stop offset="55%" stopColor="#cdbd9b" />
          <stop offset="100%" stopColor="#a5936c" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="96" fill="url(#stone)" stroke="#8a7752" strokeWidth="3" />
      <circle
        cx="100"
        cy="100"
        r="96"
        fill="none"
        stroke="#8a7752"
        strokeWidth="1"
        strokeDasharray="2 6"
        opacity="0.5"
      />

      {/* hair / brow */}
      <path
        d="M40 70 Q100 30 160 70"
        fill="none"
        stroke="#7c6a46"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* eyes */}
      <ellipse cx="68" cy="82" rx="12" ry="8" fill="#5b4d34" opacity="0.85" />
      <ellipse cx="132" cy="82" rx="12" ry="8" fill="#5b4d34" opacity="0.85" />
      <circle cx="68" cy="82" r="3" fill="#2b2418" />
      <circle cx="132" cy="82" r="3" fill="#2b2418" />

      {/* nose */}
      <path
        d="M100 88 L92 118 Q100 126 108 118 Z"
        fill="#b7a67e"
        stroke="#7c6a46"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* mouth (opens when a coin drops) */}
      <ellipse
        cx="100"
        cy="146"
        rx={dropping ? 30 : 22}
        ry={dropping ? 20 : 10}
        fill="#2b2013"
        className="transition-all duration-200 ease-out"
      />
      <ellipse cx="100" cy="146" rx="22" ry="4" fill="#4a3a24" opacity="0.6" />

      {/* cheeks texture */}
      <path d="M45 120 Q60 150 90 165" fill="none" stroke="#8a7752" strokeWidth="2" opacity="0.3" />
      <path
        d="M155 120 Q140 150 110 165"
        fill="none"
        stroke="#8a7752"
        strokeWidth="2"
        opacity="0.3"
      />
    </svg>
  );
}
