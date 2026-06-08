import { Link } from 'react-router-dom'
import { PageScaffold } from '@/components/layout/PageScaffold'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { TypeLine } from '@/hooks/useTypewriter'

const boot: TypeLine[] = [
  { text: 'bash: route not found', className: 'text-err', speed: 18 },
  { text: 'try: ls  ·  cd home', className: 'text-phosphor-dim', speed: 14 },
]

export function NotFound() {
  return (
    <PageScaffold boot={boot}>
      <SectionHeading tone="err">404_NOT_FOUND</SectionHeading>
      <p className="text-phosphor">
        The page you seek has been redacted.{' '}
        <Link className="border-b border-dotted border-accent text-accent" to="/">
          cd ~/home
        </Link>
      </p>
    </PageScaffold>
  )
}
