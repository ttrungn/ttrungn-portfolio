import { useState, type ReactNode } from 'react'
import { BootSequence } from '@/components/terminal/BootSequence'
import { Cursor } from '@/components/terminal/Cursor'
import type { TypeLine } from '@/hooks/useTypewriter'

interface PageScaffoldProps {
  boot: TypeLine[]
  children: ReactNode
}

/**
 * Runs a per-page boot sequence, then reveals the page body
 * followed by a standing prompt.
 */
export function PageScaffold({ boot, children }: PageScaffoldProps) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="text-sm leading-7">
      <BootSequence lines={boot} onDone={() => setRevealed(true)} />
      {revealed && (
        <div className="animate-[fadeIn_.4s_ease]">
          {children}
          <div className="mt-2 text-accent">
            <br />$ <Cursor />
          </div>
        </div>
      )}
    </div>
  )
}
