'use client'
import { useT } from '@/hooks/useT'

export function AnnouncementBar() {
  const t = useT()
  const messages = [t('announce.1'), t('announce.2'), t('announce.3'), t('announce.4')]
  const text = messages.join('   •   ')

  return (
    <div className="bg-violet text-white text-xs font-medium py-2 overflow-hidden">
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
