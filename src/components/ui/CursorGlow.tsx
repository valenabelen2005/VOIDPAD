'use client'
import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100, my = -100
    let rx = -100, ry = -100
    let raf: number

    function onMove(e: MouseEvent) {
      mx = e.clientX
      my = e.clientY
    }

    const dotEl = dot
    const ringEl = ring

    function loop() {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      dotEl.style.transform = `translate(${mx - 3}px, ${my - 3}px)`
      ringEl.style.transform = `translate(${rx - 14}px, ${ry - 14}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <style>{`@media (pointer: fine) { * { cursor: none !important; } }`}</style>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#00e5ff] pointer-events-none hidden md:block"
        style={{ zIndex: 9999 }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-[#00e5ff]/40 pointer-events-none hidden md:block"
        style={{ zIndex: 9999, filter: 'blur(0.5px)' }}
      />
    </>
  )
}
