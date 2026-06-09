const messages = [
  'Free shipping on orders over €50',
  'Buy 2 Get 1 FREE — applied automatically at checkout',
  'Printed & shipped in 3–5 business days',
  'Custom designs available — upload your own art',
]

export function AnnouncementBar() {
  const text = messages.join('   •   ')

  return (
    <div className="bg-[#7c3aed] text-white text-xs font-medium py-2 overflow-hidden">
      <div
        className="whitespace-nowrap"
        style={{ animation: 'marquee 30s linear infinite' }}
      >
        {text}
        {'   •   '}
        {text}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
