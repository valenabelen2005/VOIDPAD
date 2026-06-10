'use client'
import { useEffect, useRef } from 'react'

type Star = { x: number; y: number; r: number; alpha: number; speed: number; phase: number }

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let stars: Star[] = []
    let raf: number

    function init() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.5 + Math.random() * 1,
        alpha: 0.3 + Math.random() * 0.4,
        speed: 0.003 + Math.random() * 0.005,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    function draw(t: number) {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        const a = s.alpha * (0.5 + 0.5 * Math.sin(s.phase + t * s.speed))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240,240,245,${a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    init()
    raf = requestAnimationFrame(draw)

    const ro = new ResizeObserver(init)
    ro.observe(document.body)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
