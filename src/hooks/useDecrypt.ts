import { useEffect, useState } from 'react'

const SCRAMBLE = '▒▓░█▄▀▔▾ABCDEF0123456789#@$%&'

/**
 * Reveals `target` text with a "decrypting" scramble effect.
 * Spaces and newlines are preserved immediately.
 */
export function useDecrypt(target: string, speed = 16, step = 1.6) {
  const [output, setOutput] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const chars = target.split('')
    let revealed = 0

    const id = setInterval(() => {
      revealed += step
      const next = chars
        .map((c, i) => {
          if (c === '\n' || c === ' ') return c
          if (i < revealed) return c
          return SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0]
        })
        .join('')
      setOutput(next)
      if (revealed >= chars.length) {
        clearInterval(id)
        setOutput(target)
        setDone(true)
      }
    }, speed)

    return () => clearInterval(id)
  }, [target, speed, step])

  return { output, done }
}
