import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ROUTES: Record<string, string> = {
  home: '/',
  about: '/about',
  work: '/work',
  stack: '/stack',
  contact: '/contact',
}

/**
 * Global keyboard "terminal": lets visitors type `ls`, `cd <page>`,
 * a bare page name, `help`, or `whoami` from anywhere.
 * Returns the current command buffer + last response for optional display.
 */
export function useTerminalCommands(
  onResponse?: (text: string) => void,
) {
  const navigate = useNavigate()

  useEffect(() => {
    let buffer = ''

    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('input, textarea')) return

      if (e.key === 'Enter') {
        const cmd = buffer.trim().toLowerCase()
        buffer = ''
        if (!cmd) return

        if (ROUTES[cmd]) {
          navigate(ROUTES[cmd])
          return
        }
        if (cmd.startsWith('cd ')) {
          const dest = cmd.slice(3).replace(/[~/]/g, '').trim()
          navigate(ROUTES[dest] ?? '/404')
          return
        }
        if (cmd === 'ls') {
          onResponse?.('home  about  work  stack  contact')
          return
        }
        if (cmd === 'whoami') {
          onResponse?.('visitor@ttrungn (guest session)')
          return
        }
        if (cmd === 'help') {
          onResponse?.('available: ls, cd <page>, whoami, home/about/work/stack/contact')
          return
        }
        onResponse?.(`bash: ${cmd}: command not found`)
      } else if (e.key === 'Backspace') {
        buffer = buffer.slice(0, -1)
      } else if (e.key.length === 1) {
        buffer += e.key
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [navigate, onResponse])
}
