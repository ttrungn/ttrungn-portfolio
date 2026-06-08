import { useEffect, useRef } from 'react'

const GLYPHS = '01░▒▓█アイウエオカ#$%&@<>/\\|'.split('')

/**
 * Full-screen matrix rain on a fixed canvas behind the app.
 */
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let cols = 0
    let drops: number[] = []
    let raf = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      cols = Math.floor(canvas.width / 14)
      drops = Array.from({ length: cols }, () => Math.random() * -50)
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10,12,10,0.10)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#9bf7c0'
      ctx.font = '13px monospace'
      for (let i = 0; i < cols; i++) {
        const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0]
        ctx.fillText(ch, i * 14, drops[i] * 14)
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-0 opacity-15"
    />
  )
}
