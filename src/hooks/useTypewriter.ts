import { useEffect, useState } from 'react'

export interface TypeLine {
  text: string
  /** cli style adds a "$ " prefix */
  kind?: 'cmd' | 'out'
  className?: string
  /** ms per character */
  speed?: number
  /** ms pause after the line completes */
  pause?: number
}

interface RenderedLine {
  text: string
  kind: 'cmd' | 'out'
  className: string
  done: boolean
}

/**
 * Types an array of lines character-by-character.
 * Returns the currently rendered lines plus a `done` flag.
 *
 * Uses a per-run `cancelled` flag (captured in the effect closure) so it is
 * resilient to React StrictMode's double-invoked effects and route switches.
 */
export function useTypewriter(lines: TypeLine[], startDelay = 200) {
  const [rendered, setRendered] = useState<RenderedLine[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    let lineIdx = 0

    const typeLine = () => {
      if (cancelled) return
      if (lineIdx >= lines.length) {
        setDone(true)
        return
      }
      const line = lines[lineIdx]
      const prefix = line.kind === 'cmd' ? '$ ' : ''
      const full = prefix + line.text
      const speed = line.speed ?? 14

      setRendered((prev) => [
        ...prev,
        { text: '', kind: line.kind ?? 'out', className: line.className ?? '', done: false },
      ])

      let charIdx = 0
      const tick = () => {
        if (cancelled) return
        charIdx++
        setRendered((prev) => {
          const copy = [...prev]
          const last = copy.length - 1
          copy[last] = { ...copy[last], text: full.slice(0, charIdx) }
          return copy
        })
        if (charIdx < full.length) {
          timers.push(setTimeout(tick, speed))
        } else {
          setRendered((prev) => {
            const copy = [...prev]
            copy[copy.length - 1] = { ...copy[copy.length - 1], done: true }
            return copy
          })
          lineIdx++
          timers.push(setTimeout(typeLine, line.pause ?? 90))
        }
      }
      timers.push(setTimeout(tick, speed))
    }

    timers.push(setTimeout(typeLine, startDelay))

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines])

  return { rendered, done }
}
