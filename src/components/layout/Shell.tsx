import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { MatrixRain } from './MatrixRain'
import { TopBar } from './TopBar'
import { useTerminalCommands } from '@/hooks/useTerminalCommands'

export function Shell() {
  const [response, setResponse] = useState('')
  useTerminalCommands(setResponse)

  return (
    <div className="crt-scanlines crt-vignette">
      <MatrixRain />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col p-4 sm:p-8">
        <TopBar />

        <main className="flex-1 rounded-b-lg border border-t-0 border-phosphor-dim bg-[rgb(10_14_10/0.72)] p-4 shadow-[0_0_30px_rgb(0_0_0/0.6),inset_0_0_40px_rgb(155_247_192/0.04)] backdrop-blur-[2px] sm:p-8">
          <Outlet />

          {response && (
            <div className="mt-3 whitespace-pre-wrap text-phosphor-dim">› {response}</div>
          )}

          <p className="mt-6 text-xs text-phosphor-dim">
            tip: use the nav above, or type{' '}
            <kbd className="rounded border border-phosphor-dim px-1.5 text-phosphor">ls</kbd>{' '}
            ·{' '}
            <kbd className="rounded border border-phosphor-dim px-1.5 text-phosphor">cd about</kbd>{' '}
            ·{' '}
            <kbd className="rounded border border-phosphor-dim px-1.5 text-phosphor">help</kbd>{' '}
            anywhere
          </p>
        </main>
      </div>
    </div>
  )
}
