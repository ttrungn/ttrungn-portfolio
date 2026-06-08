import { useEffect } from 'react'
import { useTypewriter, type TypeLine } from '@/hooks/useTypewriter'
import { Cursor } from './Cursor'

interface BootSequenceProps {
  lines: TypeLine[]
  onDone?: () => void
}

/**
 * Renders a typed-out sequence of terminal lines with a trailing cursor.
 * Calls `onDone` once every line has finished typing.
 */
export function BootSequence({ lines, onDone }: BootSequenceProps) {
  const { rendered, done } = useTypewriter(lines)

  useEffect(() => {
    if (done) onDone?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done])

  return (
    <div>
      {rendered.map((line, i) => {
        const isLast = i === rendered.length - 1
        const color =
          line.className ||
          (line.kind === 'cmd' ? 'text-accent' : 'text-phosphor')
        return (
          <div key={i} className={`whitespace-pre-wrap ${color}`}>
            {line.text}
            {isLast && !line.done && <Cursor />}
          </div>
        )
      })}
    </div>
  )
}
