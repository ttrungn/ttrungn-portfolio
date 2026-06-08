import { useEffect, useMemo, useRef, useState } from 'react'

interface AsciiImageProps {
  /** image url, served from /public */
  src: string
  /** number of character columns (detail). 70–90 looks good for a face. */
  columns?: number
  /** fallback art if the image can't be loaded */
  fallback?: string
}

// dark -> dense ramp. The photo has a WHITE background, so we invert:
// dark subject (hair, glasses, shirt) -> dense glyphs, white bg -> blank.
const RAMP = ' .` ^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$'
const SCRAMBLE = '01░▒▓█#@$%&▄▀<>/\\|='

export function AsciiImage({ src, columns = 80, fallback = '' }: AsciiImageProps) {
  const [ascii, setAscii] = useState<string>('')
  const [failed, setFailed] = useState(false)
  const [revealed, setRevealed] = useState(0)
  const [scrambled, setScrambled] = useState('')
  const [scanRow, setScanRow] = useState(-4)
  const [glitch, setGlitch] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src

    img.onload = () => {
      if (cancelled) return
      // monospace cells are ~2x taller than wide -> 0.5 aspect correction
      const charAspect = 0.5
      const rows = Math.max(1, Math.round((img.height / img.width) * columns * charAspect))

      const canvas = canvasRef.current ?? document.createElement('canvas')
      canvas.width = columns
      canvas.height = rows
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return
      ctx.drawImage(img, 0, 0, columns, rows)
      const { data } = ctx.getImageData(0, 0, columns, rows)

      let out = ''
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const i = (y * columns + x) * 4
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
          // invert: bright bg -> blank, dark subject -> dense glyph
          let v = 1 - lum
          // contrast curve + white-bg cutoff so background stays empty
          v = v < 0.18 ? 0 : Math.min(1, (v - 0.18) / 0.82)
          v = Math.pow(v, 0.85)
          const idx = Math.round(v * (RAMP.length - 1))
          out += RAMP[idx]
        }
        out += '\n'
      }
      setAscii(out)
    }

    img.onerror = () => {
      if (!cancelled) setFailed(true)
    }

    return () => {
      cancelled = true
    }
  }, [src, columns])

  const source = failed ? fallback : ascii
  const rows = useMemo(() => source.split('\n'), [source])
  const decrypted = source !== '' && revealed >= source.length

  // 1) decrypt reveal: scramble characters in, top-to-bottom.
  // The scrambled snapshot is built inside the interval (never during render)
  // so we don't call Math.random() while rendering.
  useEffect(() => {
    if (!source) return
    let r = 0
    const stepSize = Math.max(6, Math.round(source.length / 70))
    const id = setInterval(() => {
      r += stepSize
      let out = ''
      for (let i = 0; i < source.length; i++) {
        const c = source[i]
        if (c === '\n' || c === ' ' || i < r) {
          out += c
        } else {
          out += SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0]
        }
      }
      setScrambled(out)
      setRevealed(r)
      if (r >= source.length) clearInterval(id)
    }, 16)
    return () => clearInterval(id)
  }, [source])

  // 2) scanline sweep: a glowing line travels down the portrait, forever
  useEffect(() => {
    if (!decrypted) return
    const id = setInterval(() => {
      setScanRow((prev) => (prev >= rows.length + 4 ? -4 : prev + 1))
    }, 70)
    return () => clearInterval(id)
  }, [decrypted, rows.length])

  // 3) occasional glitch
  useEffect(() => {
    if (!decrypted) return
    const id = setInterval(() => {
      if (Math.random() < 0.5) {
        setGlitch(true)
        setTimeout(() => setGlitch(false), 360)
      }
    }, 2800)
    return () => clearInterval(id)
  }, [decrypted])

  const preClass = `select-none whitespace-pre text-phosphor text-glow ${glitch ? 'glitch' : ''}`
  const preStyle = { fontSize: '6px', lineHeight: '6px', letterSpacing: 0 } as const

  // while decrypting: render the scrambled snapshot in one block
  if (!decrypted) {
    return (
      <pre aria-label="ASCII avatar" className={preClass} style={preStyle}>
        {scrambled || source}
      </pre>
    )
  }

  // once decrypted: render row-by-row so a scanline can glow across it
  return (
    <pre aria-label="ASCII avatar" className={preClass} style={preStyle}>
      {rows.map((row, i) => {
        const dist = Math.abs(i - scanRow)
        const onScan = dist <= 1
        return (
          <div
            key={i}
            style={{
              color: onScan ? 'var(--color-accent)' : undefined,
              textShadow: onScan ? '0 0 8px var(--glow)' : undefined,
              opacity: dist === 1 ? 0.85 : 1,
            }}
          >
            {row || ' '}
          </div>
        )
      })}
    </pre>
  )
}

